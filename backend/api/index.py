'''
Business: Unified API for GTA5 Activity Tracker - handles auth, player stats, and admin functions
Args: event - dict with httpMethod, path, body, queryStringParameters
      context - object with request_id attribute
Returns: HTTP response with requested data
'''
import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    path: str = event.get('path', '/')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if '/auth' in path and method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        username = body_data.get('username', '')
        password = body_data.get('password', '')
        
        if not username or not password:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Username and password required'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute(
            "SELECT id, username, display_name, role FROM t_p76261291_gta5_activity_journa.users WHERE username = %s",
            (username,)
        )
        user = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if not user or password != 'admin123':
            return {
                'statusCode': 401,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid credentials'})
            }
        
        user_data = {
            'id': user[0],
            'username': user[1],
            'display_name': user[2],
            'role': user[3]
        }
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'user': user_data})
        }
    
    if '/stats' in path and method == 'GET':
        params = event.get('queryStringParameters', {}) or {}
        user_id = params.get('user_id')
        
        if not user_id:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id required'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                COALESCE(SUM(CASE WHEN status = 'online' THEN duration_minutes ELSE 0 END), 0) as total_online,
                COALESCE(SUM(CASE WHEN status = 'afk' THEN duration_minutes ELSE 0 END), 0) as total_afk,
                COALESCE(SUM(CASE WHEN status = 'offline' THEN duration_minutes ELSE 0 END), 0) as total_offline,
                COALESCE(SUM(duration_minutes), 0) as total_time
            FROM t_p76261291_gta5_activity_journa.player_activity
            WHERE user_id = %s
        """, (user_id,))
        
        stats_row = cur.fetchone()
        
        cur.execute("""
            SELECT id, status, started_at, ended_at, duration_minutes
            FROM t_p76261291_gta5_activity_journa.player_activity
            WHERE user_id = %s
            ORDER BY started_at DESC
            LIMIT 50
        """, (user_id,))
        
        history_rows = cur.fetchall()
        
        cur.close()
        conn.close()
        
        stats = {
            'total_online': int(stats_row[0] or 0) // 60,
            'total_afk': int(stats_row[1] or 0) // 60,
            'total_offline': int(stats_row[2] or 0) // 60,
            'total_time': int(stats_row[3] or 0) // 60
        }
        
        history = []
        for row in history_rows:
            history.append({
                'id': row[0],
                'status': row[1],
                'started_at': row[2].strftime('%Y-%m-%d %H:%M') if row[2] else None,
                'ended_at': row[3].strftime('%Y-%m-%d %H:%M') if row[3] else None,
                'duration_minutes': row[4]
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'stats': stats, 'history': history})
        }
    
    if '/players' in path and method == 'GET':
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                u.id,
                u.display_name,
                COALESCE(latest.status, 'offline') as status,
                COALESCE(SUM(pa.duration_minutes), 0) as total_minutes,
                COALESCE(MAX(pa.started_at), u.created_at) as last_activity
            FROM t_p76261291_gta5_activity_journa.users u
            LEFT JOIN t_p76261291_gta5_activity_journa.player_activity pa ON u.id = pa.user_id
            LEFT JOIN LATERAL (
                SELECT status 
                FROM t_p76261291_gta5_activity_journa.player_activity 
                WHERE user_id = u.id 
                ORDER BY started_at DESC 
                LIMIT 1
            ) latest ON true
            WHERE u.role = 'player'
            GROUP BY u.id, u.display_name, latest.status, u.created_at
            ORDER BY u.id
        """)
        
        rows = cur.fetchall()
        cur.close()
        conn.close()
        
        players = []
        for row in rows:
            total_hours = int(row[3]) // 60
            total_mins = int(row[3]) % 60
            time_str = f"{total_hours}ч {total_mins}м" if total_hours > 0 else f"{total_mins}м"
            
            last_activity = row[4]
            if isinstance(last_activity, datetime):
                now = datetime.now()
                diff = now - last_activity
                
                if diff.total_seconds() < 300:
                    last_seen = 'Сейчас онлайн'
                elif diff.total_seconds() < 3600:
                    mins = int(diff.total_seconds() // 60)
                    last_seen = f'{mins} минут назад'
                elif diff.total_seconds() < 86400:
                    hours = int(diff.total_seconds() // 3600)
                    last_seen = f'{hours} часа назад' if hours < 5 else f'{hours} часов назад'
                else:
                    days = int(diff.total_seconds() // 86400)
                    last_seen = f'{days} дня назад' if days < 5 else f'{days} дней назад'
            else:
                last_seen = 'Никогда'
            
            players.append({
                'id': row[0],
                'name': row[1],
                'status': row[2],
                'time': time_str,
                'last_seen': last_seen
            })
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'isBase64Encoded': False,
            'body': json.dumps({'players': players})
        }
    
    return {
        'statusCode': 404,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Not found'})
    }
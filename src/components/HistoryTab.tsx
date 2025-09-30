import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ActivitySession {
  id: number;
  status: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
}

interface HistoryTabProps {
  getStatusBadge: (status: string) => JSX.Element;
}

const mockHistory: ActivitySession[] = [
  { id: 1, status: 'online', started_at: '2025-09-30 14:30', ended_at: '2025-09-30 18:45', duration_minutes: 255 },
  { id: 2, status: 'afk', started_at: '2025-09-29 20:15', ended_at: '2025-09-29 21:00', duration_minutes: 45 },
  { id: 3, status: 'online', started_at: '2025-09-28 16:00', ended_at: '2025-09-28 19:30', duration_minutes: 210 },
  { id: 4, status: 'online', started_at: '2025-09-27 12:00', ended_at: '2025-09-27 15:45', duration_minutes: 225 },
];

const HistoryTab = ({ getStatusBadge }: HistoryTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="History" size={20} className="text-primary" />
            История активности
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Статус</TableHead>
                <TableHead>Начало</TableHead>
                <TableHead>Конец</TableHead>
                <TableHead>Длительность</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHistory.map((session) => (
                <TableRow key={session.id}>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>{session.started_at}</TableCell>
                  <TableCell>{session.ended_at || 'В процессе'}</TableCell>
                  <TableCell>
                    {session.duration_minutes 
                      ? `${Math.floor(session.duration_minutes / 60)}ч ${session.duration_minutes % 60}м`
                      : '—'
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HistoryTab;
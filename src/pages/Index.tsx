import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

interface User {
  id: number;
  username: string;
  display_name: string;
  role: string;
}

interface ActivitySession {
  id: number;
  status: string;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
}

interface PlayerStats {
  total_online: number;
  total_afk: number;
  total_offline: number;
  total_time: number;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentStatus, setCurrentStatus] = useState<string>('offline');
  const [stats, setStats] = useState<PlayerStats>({
    total_online: 0,
    total_afk: 0,
    total_offline: 0,
    total_time: 0
  });

  const mockChartData = [
    { date: '1', hours: 4.2 },
    { date: '5', hours: 3.8 },
    { date: '10', hours: 5.1 },
    { date: '15', hours: 2.9 },
    { date: '20', hours: 6.3 },
    { date: '25', hours: 4.7 },
    { date: '30', hours: 5.9 },
  ];

  const statusDistribution = [
    { name: 'Онлайн', value: 45, color: '#FF6B00' },
    { name: 'АФК', value: 25, color: '#94560' },
    { name: 'Оффлайн', value: 30, color: '#0F3460' },
  ];

  const mockHistory: ActivitySession[] = [
    { id: 1, status: 'online', started_at: '2025-09-30 14:30', ended_at: '2025-09-30 18:45', duration_minutes: 255 },
    { id: 2, status: 'afk', started_at: '2025-09-29 20:15', ended_at: '2025-09-29 21:00', duration_minutes: 45 },
    { id: 3, status: 'online', started_at: '2025-09-28 16:00', ended_at: '2025-09-28 19:30', duration_minutes: 210 },
    { id: 4, status: 'online', started_at: '2025-09-27 12:00', ended_at: '2025-09-27 15:45', duration_minutes: 225 },
  ];

  const mockPlayers = [
    { id: 1, name: 'Игрок 1', status: 'online', time: '145ч 30м', last_seen: 'Сейчас онлайн' },
    { id: 2, name: 'Игрок 2', status: 'afk', time: '89ч 15м', last_seen: '5 минут назад' },
    { id: 3, name: 'Игрок 3', status: 'offline', time: '234ч 45м', last_seen: '2 часа назад' },
    { id: 4, name: 'Игрок 4', status: 'online', time: '67ч 20м', last_seen: 'Сейчас онлайн' },
  ];

  useEffect(() => {
    const mockStats: PlayerStats = {
      total_online: 145,
      total_afk: 23,
      total_offline: 89,
      total_time: 257
    };
    setStats(mockStats);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'superadmin' && password === 'admin123') {
      setCurrentUser({
        id: 1,
        username: 'superadmin',
        display_name: 'Супер Админ',
        role: 'superadmin'
      });
      setIsLoggedIn(true);
    } else if (username === 'player1' && password === 'admin123') {
      setCurrentUser({
        id: 2,
        username: 'player1',
        display_name: 'Игрок 1',
        role: 'player'
      });
      setIsLoggedIn(true);
      setCurrentStatus('online');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setCurrentStatus('offline');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      online: { label: 'Онлайн', className: 'bg-primary text-white' },
      afk: { label: 'АФК', className: 'bg-yellow-500 text-white' },
      offline: { label: 'Вышел', className: 'bg-muted text-muted-foreground' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
        <Card className="w-full max-w-md border-primary/20 shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Icon name="Gamepad2" size={40} className="text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">
              GTA 5 Activity Tracker
            </CardTitle>
            <p className="text-muted-foreground">Журнал активности игроков</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Введите логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-secondary border-primary/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary border-primary/30"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
              <div className="text-sm text-muted-foreground text-center mt-4 space-y-1">
                <p>Тестовые аккаунты:</p>
                <p className="text-xs">superadmin / admin123</p>
                <p className="text-xs">player1 / admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-primary/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Gamepad2" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">GTA 5 Tracker</h1>
              <p className="text-xs text-muted-foreground">Журнал активности</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary">
                <AvatarFallback className="bg-primary text-white">
                  {currentUser?.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{currentUser?.display_name}</p>
                <p className="text-xs text-muted-foreground">
                  {currentUser?.role === 'superadmin' ? 'Супер Админ' : 'Игрок'}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-primary/30">
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-card border border-primary/20">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="LayoutDashboard" size={16} className="mr-2" />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="BarChart3" size={16} className="mr-2" />
              Статистика
            </TabsTrigger>
            {currentUser?.role === 'superadmin' && (
              <TabsTrigger value="players" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <Icon name="Users" size={16} className="mr-2" />
                Игроки
              </TabsTrigger>
            )}
            <TabsTrigger value="history" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="History" size={16} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-primary" />
                    Общее время
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.total_time}ч</div>
                  <p className="text-xs text-muted-foreground mt-1">За все время</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Wifi" size={16} className="text-primary" />
                    Онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{stats.total_online}ч</div>
                  <p className="text-xs text-muted-foreground mt-1">Активное время</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Pause" size={16} className="text-yellow-500" />
                    АФК
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-500">{stats.total_afk}ч</div>
                  <p className="text-xs text-muted-foreground mt-1">Время AFK</p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon name="Power" size={16} className="text-muted-foreground" />
                    Оффлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-muted-foreground">{stats.total_offline}ч</div>
                  <p className="text-xs text-muted-foreground mt-1">Время вне игры</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={20} className="text-primary" />
                    Активность по дням
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={mockChartData}>
                      <defs>
                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF6B00" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FF6B00" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#16213E" opacity={0.3} />
                      <XAxis dataKey="date" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#16213E', 
                          border: '1px solid #FF6B00',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="hours" stroke="#FF6B00" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Activity" size={20} className="text-primary" />
                    Текущий статус
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center p-6">
                    {getStatusBadge(currentStatus)}
                  </div>
                  <Select value={currentStatus} onValueChange={setCurrentStatus}>
                    <SelectTrigger className="bg-secondary border-primary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">
                        <div className="flex items-center gap-2">
                          <Icon name="Wifi" size={16} />
                          Онлайн
                        </div>
                      </SelectItem>
                      <SelectItem value="afk">
                        <div className="flex items-center gap-2">
                          <Icon name="Pause" size={16} />
                          АФК
                        </div>
                      </SelectItem>
                      <SelectItem value="offline">
                        <div className="flex items-center gap-2">
                          <Icon name="Power" size={16} />
                          Вышел
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Сегодня:</span>
                      <span className="font-medium">4ч 23м</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Неделя:</span>
                      <span className="font-medium">28ч 15м</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="PieChart" size={20} className="text-primary" />
                    Распределение времени
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart" size={20} className="text-primary" />
                    Сравнение активности
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#16213E" opacity={0.3} />
                      <XAxis dataKey="date" stroke="#999" />
                      <YAxis stroke="#999" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#16213E', 
                          border: '1px solid #FF6B00',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="hours" fill="#FF6B00" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} className="text-primary" />
                  Статистика за месяц
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">156ч</div>
                    <div className="text-sm text-muted-foreground">Всего</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">5.2ч</div>
                    <div className="text-sm text-muted-foreground">Среднее/день</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">23</div>
                    <div className="text-sm text-muted-foreground">Сессий</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-2xl font-bold text-primary">6.8ч</div>
                    <div className="text-sm text-muted-foreground">Макс. сессия</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {currentUser?.role === 'superadmin' && (
            <TabsContent value="players" className="space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Users" size={20} className="text-primary" />
                    Список игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Игрок</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Время в игре</TableHead>
                        <TableHead>Последняя активность</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPlayers.map((player) => (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{getStatusBadge(player.status)}</TableCell>
                          <TableCell>{player.time}</TableCell>
                          <TableCell className="text-muted-foreground">{player.last_seen}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="history" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={20} className="text-primary" />
                  Профиль игрока
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-24 h-24 border-4 border-primary">
                    <AvatarFallback className="bg-primary text-white text-3xl">
                      {currentUser?.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{currentUser?.display_name}</h3>
                    <p className="text-muted-foreground">@{currentUser?.username}</p>
                    <Badge className="bg-primary text-white">
                      {currentUser?.role === 'superadmin' ? 'Супер Админ' : 'Игрок'}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Общее время</div>
                    <div className="text-2xl font-bold text-primary">257ч 30м</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Сессий</div>
                    <div className="text-2xl font-bold text-primary">156</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Средняя сессия</div>
                    <div className="text-2xl font-bold text-primary">1ч 39м</div>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Регистрация</div>
                    <div className="text-2xl font-bold text-primary">30 дн.</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
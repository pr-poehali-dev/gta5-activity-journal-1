import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import DashboardTab from '@/components/DashboardTab';
import StatisticsTab from '@/components/StatisticsTab';
import PlayersTab from '@/components/PlayersTab';
import HistoryTab from '@/components/HistoryTab';
import ProfileTab from '@/components/ProfileTab';

interface User {
  id: number;
  username: string;
  display_name: string;
  role: string;
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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentStatus, setCurrentStatus] = useState<string>('offline');
  const [stats, setStats] = useState<PlayerStats>({
    total_online: 0,
    total_afk: 0,
    total_offline: 0,
    total_time: 0
  });

  useEffect(() => {
    const mockStats: PlayerStats = {
      total_online: 145,
      total_afk: 23,
      total_offline: 89,
      total_time: 257
    };
    setStats(mockStats);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    if (user.role === 'player') {
      setCurrentStatus('online');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
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
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentUser={currentUser} onLogout={handleLogout} />

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

          <TabsContent value="dashboard">
            <DashboardTab 
              stats={stats} 
              currentStatus={currentStatus} 
              onStatusChange={setCurrentStatus}
              getStatusBadge={getStatusBadge}
            />
          </TabsContent>

          <TabsContent value="statistics">
            <StatisticsTab />
          </TabsContent>

          {currentUser?.role === 'superadmin' && (
            <TabsContent value="players">
              <PlayersTab getStatusBadge={getStatusBadge} />
            </TabsContent>
          )}

          <TabsContent value="history">
            <HistoryTab getStatusBadge={getStatusBadge} />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileTab currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
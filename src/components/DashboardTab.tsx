import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

interface PlayerStats {
  total_online: number;
  total_afk: number;
  total_offline: number;
  total_time: number;
}

interface DashboardTabProps {
  stats: PlayerStats;
  currentStatus: string;
  onStatusChange: (status: string) => void;
  getStatusBadge: (status: string) => JSX.Element;
}

const mockChartData = [
  { date: '1', hours: 4.2 },
  { date: '5', hours: 3.8 },
  { date: '10', hours: 5.1 },
  { date: '15', hours: 2.9 },
  { date: '20', hours: 6.3 },
  { date: '25', hours: 4.7 },
  { date: '30', hours: 5.9 },
];

const DashboardTab = ({ stats, currentStatus, onStatusChange, getStatusBadge }: DashboardTabProps) => {
  return (
    <div className="space-y-6">
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
            <Select value={currentStatus} onValueChange={onStatusChange}>
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
    </div>
  );
};

export default DashboardTab;
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

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

const StatisticsTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default StatisticsTab;
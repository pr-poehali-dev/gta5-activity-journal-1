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

interface PlayersTabProps {
  getStatusBadge: (status: string) => JSX.Element;
}

const mockPlayers = [
  { id: 1, name: 'Игрок 1', status: 'online', time: '145ч 30м', last_seen: 'Сейчас онлайн' },
  { id: 2, name: 'Игрок 2', status: 'afk', time: '89ч 15м', last_seen: '5 минут назад' },
  { id: 3, name: 'Игрок 3', status: 'offline', time: '234ч 45м', last_seen: '2 часа назад' },
  { id: 4, name: 'Игрок 4', status: 'online', time: '67ч 20м', last_seen: 'Сейчас онлайн' },
];

const PlayersTab = ({ getStatusBadge }: PlayersTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default PlayersTab;
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: number;
  username: string;
  display_name: string;
  role: string;
}

interface ProfileTabProps {
  currentUser: User | null;
}

const ProfileTab = ({ currentUser }: ProfileTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default ProfileTab;
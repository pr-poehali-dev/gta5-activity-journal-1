import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface User {
  id: number;
  username: string;
  display_name: string;
  role: string;
}

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const Header = ({ currentUser, onLogout }: HeaderProps) => {
  return (
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
          <Button variant="outline" size="sm" onClick={onLogout} className="border-primary/30">
            <Icon name="LogOut" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
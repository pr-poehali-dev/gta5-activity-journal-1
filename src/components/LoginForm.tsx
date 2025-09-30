import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
  id: number;
  username: string;
  display_name: string;
  role: string;
}

interface LoginFormProps {
  onLogin: (user: User) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'superadmin' && password === 'admin123') {
      onLogin({
        id: 1,
        username: 'superadmin',
        display_name: 'Супер Админ',
        role: 'superadmin'
      });
    } else if (username === 'player1' && password === 'admin123') {
      onLogin({
        id: 2,
        username: 'player1',
        display_name: 'Игрок 1',
        role: 'player'
      });
    }
  };

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
};

export default LoginForm;
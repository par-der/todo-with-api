import { useForm } from 'react-hook-form';
import { useLoginTodoMutation } from '@/shared/services/mutations';
import { useAuthStore } from '@/stores/auth-store';
import { useNavigate } from 'react-router';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Login } from '@/entities/auth';
import { getCurrentUser } from '@/shared/services/api.ts';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>();
  const loginMutation = useLoginTodoMutation();
  const { login, setUser } = useAuthStore.getState();
  const navigate = useNavigate();

  const onSubmit = (data: Login) => {
    loginMutation.mutate(data, {
      onSuccess: async (res) => {
        const token = res.data?.auth_token;
        if (!token) return;

        login(token);

        try {
          const me = await getCurrentUser();
          setUser(me);
        } catch {
          setUser(null);
        }

        navigate('/', { replace: true });
      },

      onError: (err) => console.error('Login failed:', err),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register('username', { required: 'Username is required' })}
          placeholder="morpheus"
          autoComplete="username"
        />
        {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          autoComplete="current-password"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>
      {loginMutation.isError && <p className="text-red-500 text-xs">Error: Invalid username or password.</p>}
      <Button type="submit" disabled={loginMutation.isPending || isSubmitting} className="w-full">
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};

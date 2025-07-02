import { cn } from '../../lib/utils.ts';
import { Button } from '@components/ui/button.tsx';
import { Card, CardContent } from '@components/ui/card.tsx';
import { Input } from '@components/ui/input.tsx';
import { Label } from '@components/ui/label.tsx';
import * as React from 'react';
import { Login } from '../../entities/auth.ts';
import { useLoginTodoMutation } from '../../services/mutations.ts';
import { useAuthStore } from '../../stores/auth-store.ts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

interface LoginPayload {
  login: Login;
}

const LoginPage = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>();
  const loginMutation = useLoginTodoMutation();
  const setAuth = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        const token = res.data?.auth_token;
        if (token) setAuth(token);
        navigate('/');
      },
      onError: (err) => {
        console.log(err + ' Ошибка авторизации');
      },
    });
  };

  return (
    <div className={cn('flex min-h-screen w-full items-center justify-center px-4 py-8', className)} {...props}>
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">Login to your Todo Inc account</p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    {...register('username', { require: 'Введите имя...' })}
                    placeholder="введите имя..."
                    required
                  />
                  {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    {...register('password', { require: 'Введите пароль...' })}
                    type="password"
                    required
                  />
                  {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
                </div>
                <Button type="submit" disabled={loginMutation.isPending || isSubmitting} className="w-full">
                  {loginMutation.isPending ? 'Вход...' : 'Login'}
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
                {loginMutation.isError && (
                  <span className="text-red-500 text-xs">Ошибка: неверный логин или пароль</span>
                )}
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
              <img
                src="/login.jpg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { useForm } from 'react-hook-form';
import { Register } from '@/entities/auth.ts';
import { useAuthTodoMutation } from '@/shared/services/mutations.ts';
import { useAuthStore } from '@/stores/auth-store.ts';
import { useNavigate } from 'react-router';
import { Button, Input, Label } from '@/shared/ui';

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Register>();
  const { mutate, isPending, isError, error } = useAuthTodoMutation();
  const setAuth = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = (data: Register) =>
    mutate(data, {
      onSuccess: (res: { data?: { auth_token?: string } }) => {
        const token = res.data?.auth_token;
        if (token) {
          setAuth(token);
          navigate('/', { replace: true });
        }
      },
      onError: (err: Error) => {
        console.error('Register failed', err);
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register('username', { required: true })} />
        {errors.username && <p className="text-red-500 text-xs">Required</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password', { required: true, minLength: 8 })} />
        {errors.password && <p className="text-red-500 text-xs">Min 8 symbols</p>}
      </div>

      {isError && <p className="text-red-500 text-xs">{String(error)}</p>}

      <Button type="submit" disabled={isPending || isSubmitting} className="w-full">
        {isPending ? 'Creating…' : 'Register'}
      </Button>
    </form>
  );
};

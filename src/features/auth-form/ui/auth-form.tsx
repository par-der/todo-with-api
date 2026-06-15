import { useForm } from 'react-hook-form';
import { Register } from '@/entities/auth.ts';
import { useAuthTodoMutation } from '@/shared/services/mutations.ts';
import { useAuthStore } from '@/stores/auth-store.ts';
import { useNavigate } from 'react-router';
import { Button, Input, Label } from '@/shared/ui';
import { getCurrentUser, loginApi } from '@/shared/services/api.ts';
import { isAxiosError } from 'axios';

type RegisterErrorResponse = {
  username?: string[] | string;
  password?: string[] | string;
  non_field_errors?: string[] | string;
  detail?: string;
};

const getErrorMessage = (value: string[] | string | undefined) => {
  if (Array.isArray(value)) return value.join(' ');
  return value ?? '';
};

const getRegisterErrorMessages = (error: unknown) => {
  if (!isAxiosError<RegisterErrorResponse>(error)) {
    return { username: '', password: '', general: '' };
  }

  const data = error.response?.data;

  return {
    username: getErrorMessage(data?.username),
    password: getErrorMessage(data?.password),
    general: getErrorMessage(data?.non_field_errors) || data?.detail || '',
  };
};

export const AuthForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Register>();
  const { mutate, isPending, isError, error } = useAuthTodoMutation();
  const { login, setUser } = useAuthStore.getState();
  const navigate = useNavigate();
  const serverErrors = getRegisterErrorMessages(error);

  const onSubmit = (data: Register) =>
    mutate(data, {
      onSuccess: async () => {
        try {
          const res = await loginApi(data);
          const token = res.data?.auth_token;
          if (!token) {
            navigate('/login', { replace: true });
            return;
          }

          login(token);

          try {
            const me = await getCurrentUser();
            setUser(me);
          } catch {
            setUser(null);
          }

          navigate('/', { replace: true });
        } catch {
          navigate('/login', { replace: true });
        }
      },
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" {...register('username', { required: true })} />
        {errors.username && <p className="text-red-500 text-xs">Required</p>}
        {!errors.username && serverErrors.username && <p className="text-red-500 text-xs">{serverErrors.username}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" {...register('password', { required: true, minLength: 8 })} />
        {errors.password && <p className="text-red-500 text-xs">Min 8 symbols</p>}
        {!errors.password && serverErrors.password && <p className="text-red-500 text-xs">{serverErrors.password}</p>}
      </div>

      {isError && serverErrors.general && <p className="text-red-500 text-xs">{serverErrors.general}</p>}

      <Button type="submit" disabled={isPending || isSubmitting} className="w-full">
        {isPending ? 'Creating…' : 'Register'}
      </Button>
    </form>
  );
};

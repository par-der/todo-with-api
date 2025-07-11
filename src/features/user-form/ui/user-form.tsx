import {
  useCurrentUserQuery,
  useSetUsernameMutation,
  useUpdateUserMutation,
  useUploadAvatarMutation,
} from '@/features/user-form/api/queries.ts';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar.tsx';
import { Button, Input, Label } from '@/shared/ui';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog.tsx';
import { useNavigate } from 'react-router';

type FormValues = { username: string; email: string };
type LoginChangeVal = { new_username: string; current_password: string };

export const UserForm = () => {
  const { data: user, isLoading } = useCurrentUserQuery();
  const { mutateAsync: updateUser } = useUpdateUserMutation();
  const { mutate: uploadAvatar } = useUploadAvatarMutation();
  const { mutate: setUsername } = useSetUsernameMutation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting: savingProfile },
  } = useForm<FormValues>();

  const {
    register: regLogin,
    handleSubmit: submitLogin,
    setValue: setLoginValue,
    formState: { isSubmitting: savingLogin },
  } = useForm<LoginChangeVal>();

  useEffect(() => {
    if (user) reset({ username: user.username, email: user.email });
  }, [user, reset]);

  const onSaveProfile = async (values: FormValues) => {
    await updateUser(values);
  };

  const onChangeUsername = async (data: LoginChangeVal) => {
    await setUsername(data);
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10">
      <div className="mb-4">
        <Button variant="ghost" onClick={() => navigate('/')}>
          ← На главную
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Avatar className="h-24 w-24 shrink-0 mx-auto sm:mx-0">
            <AvatarImage src={user?.avatar || '/placeholder-avatar.svg'} />
            <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <Label htmlFor="avatar" className="mb-1 block">
              Фото <span className="text-muted-foreground">(≤ 4 МБ)</span>
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="text-sm text-muted-foreground file:rounded-md file:bg-primary file:mr-4 file:px-4 file:text-white px-1 py-1"
              onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])}
            />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <Label htmlFor="username" className="mb-1 block">
              Имя
            </Label>
            <Input id="username" {...register('username')} />
          </div>
          <Button
            type="button"
            variant="secondary"
            className="mt-2 sm:mt-0"
            onClick={() => {
              setOpen(true);
              setLoginValue('new_username', watch('username'));
            }}
          >
            Сменить логин
          </Button>
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 block">
            Email
          </Label>
          <Input id="email" type="email" {...register('email')} />
        </div>

        <Button type="submit" disabled={savingProfile} className="w-full sm:w-auto">
          Сохранить профиль
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Смена логина</DialogTitle>
          </DialogHeader>

          <form onSubmit={submitLogin(onChangeUsername)} className="space-y-4 pt-4">
            <div>
              <Label htmlFor="new_username" className="pb-2">
                Новый логин
              </Label>
              <Input id="new_username" {...regLogin('new_username')} />
            </div>
            <div>
              <Label htmlFor="current_password" className="pb-2">
                Пароль
              </Label>
              <Input
                id="current_password"
                type="password"
                autoComplete="current-password"
                {...regLogin('current_password')}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Отмена
              </Button>
              <Button type="submit" disabled={savingLogin}>
                Сменить
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

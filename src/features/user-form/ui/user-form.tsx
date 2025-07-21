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
import { User } from '@/shared/types/user.ts';

type FormValues = Pick<User, 'first_name' | 'last_name' | 'email'>;
type LoginChangeVal = { new_username: string; current_password: string };

export const UserForm = () => {
  const { data: user, isLoading } = useCurrentUserQuery();
  const { mutateAsync: updateUser, isPending: updatingProfile } = useUpdateUserMutation();
  const { mutateAsync: uploadAvatar, isPending: uploadingAvatar } = useUploadAvatarMutation();
  const { mutateAsync: setUsername, isPending: updatingLogin } = useSetUsernameMutation();

  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: rhfSubmittingProfile, isDirty: profileDirty },
  } = useForm<FormValues>({
    defaultValues: { first_name: '', last_name: '', email: '' },
  });

  const {
    register: regLogin,
    handleSubmit: submitLogin,
    formState: { isSubmitting: rhfSubmittingLogin },
  } = useForm<LoginChangeVal>({
    defaultValues: { new_username: '', current_password: '' },
  });

  useEffect(() => {
    if (user) reset({ first_name: user.first_name ?? '', last_name: user.last_name ?? '', email: user.email ?? '' });
  }, [user, reset]);

  const onSaveProfile = async (values: FormValues) => {
    await updateUser(values);
  };

  const onChangeUsername = async (data: LoginChangeVal) => {
    await setUsername(data);
    setOpen(false);
  };

  const handleAvatarFile = async (file: File) => {
    await uploadAvatar(file);
  };

  if (isLoading) return <div className="text-center py-10 text-sm text-muted-foreground">Loading...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-8">
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
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleAvatarFile(f);
              }}
              disabled={uploadingAvatar}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <div>
              <Label htmlFor="first_name" className="mb-1 block">
                Имя
              </Label>
              <Input id="first_name" {...register('first_name')} />
            </div>

            <div>
              <Label htmlFor="last_name" className="mb-1 block">
                Фамилия
              </Label>
              <Input id="last_name" {...register('last_name')} />
            </div>
          </div>

          {/*                                              тут находится кнопка смены логина                                           */}
          {/*<Button*/}
          {/*  type="button"*/}
          {/*  variant="secondary"*/}
          {/*  className="mt-2 sm:mt-0"*/}
          {/*  onClick={() => {*/}
          {/*    setOpen(true);*/}
          {/*    setLoginValue('new_username', user?.username ?? '');*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Сменить логин*/}
          {/*</Button>*/}
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 block">
            Email
          </Label>
          <Input id="email" type="email" {...register('email')} />
        </div>

        <Button
          type="submit"
          disabled={rhfSubmittingProfile || updatingProfile || uploadingAvatar || !profileDirty}
          className="w-full sm:w-auto"
        >
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
              <Label htmlFor="new_username" className="pb-2 block">
                Новый логин
              </Label>
              <Input id="new_username" {...regLogin('new_username')} />
            </div>
            <div>
              <Label htmlFor="current_password" className="pb-2 block">
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
              <Button type="submit" disabled={rhfSubmittingLogin || updatingLogin}>
                Сменить
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

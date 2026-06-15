import { useLogoutTodoMutation } from '@/shared/services/mutations.ts';
import { Button } from '@/shared/ui/button.tsx';
import { LogOut } from 'lucide-react';

type Props = {
  className?: string;
};

export const LogoutButton = ({ className }: Props) => {
  const { mutate, isPending } = useLogoutTodoMutation();

  return (
    <Button type="button" variant="destructive" onClick={() => mutate()} disabled={isPending} className={className}>
      <LogOut />
      {isPending ? 'Выходим...' : 'Выйти'}
    </Button>
  );
};

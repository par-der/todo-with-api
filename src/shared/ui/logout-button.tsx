import { useLogoutTodoMutation } from '@/shared/services/mutations.ts';

export const LogoutButton = () => {
  const { mutate, isPending } = useLogoutTodoMutation();
  return (
    <button onClick={() => mutate()} disabled={isPending}>
      Logout
    </button>
  );
};

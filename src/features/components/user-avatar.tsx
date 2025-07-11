import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar.tsx';
import { useNavigate } from 'react-router';
import { NAVIGATION_ROUTES } from '@/shared/constants/routes.ts';

const UserAvatar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 right-4 z-50 cursor-pointer" onClick={() => navigate(NAVIGATION_ROUTES.USER)}>
      <Avatar className="h-8 w-8 ring-2 ring-muted-foreground/20">
        <AvatarImage src="../../public/logo.svg" alt="Your avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;

import { Button } from '@/shared/ui';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 bg-gray-900 hover:bg-gray-700 focus:ring-4 focus:ring-gray-700"
      size="icon"
    >
      <Plus className="w-6 h-6 text-white" />
    </Button>
  );
};

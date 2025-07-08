import { Button } from './button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      {pages.map((page) => (
        <Button key={page} variant={page === currentPage ? 'outline' : 'ghost'} onClick={() => onPageChange(page)}>
          {page}
        </Button>
      ))}
    </div>
  );
};

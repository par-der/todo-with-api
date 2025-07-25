import { useAddTodoMutation } from '@/shared/services/mutations.ts';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Category, CATEGORY_LABELS, TodoFormData } from '@/entities/todo.ts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Button, Input, Label } from '@/shared/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Textarea } from '@/shared/ui/textarea.tsx';
import { toast } from 'react-toastify';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTodoModal = ({ isOpen, onClose }: AddTodoModalProps) => {
  const { mutate: addTodo, isPending } = useAddTodoMutation();
  const { register, handleSubmit, watch, setValue, reset } = useForm<TodoFormData>({
    defaultValues: {
      title: '',
      description: '',
      due_date: format(new Date(), 'yyyy-MM-dd'),
      remind_at: null as unknown as string,
      category: 'HEALTH',
      completed: false,
    },
  });

  const watchedCategory = watch('category');

  const onSubmit = (formData: TodoFormData) => {
    const submitData = {
      ...formData,
      remind_at: formData.remind_at || null,
    };
    addTodo(submitData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">Добавить новую задачу</DialogTitle>
          <DialogDescription>Заполните форму и нажмите «Добавить».</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="add-title" className="text-sm font-medium">
              Название задачи
            </Label>
            <Input
              id="add-title"
              {...register('title', { required: 'Название обязательно' })}
              placeholder="Введите название задачи"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-description" className="text-sm font-medium">
              Описание
            </Label>
            <Textarea
              id="add-description"
              {...register('description')}
              placeholder="Опишите задачу подробнее"
              className="min-h-[80px] text-wrap whitespace-pre-wrap"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-due-date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Дата выполнения
              </Label>
              <Input id="add-due-date" type="date" {...register('due_date', { required: 'Дата обязательна' })} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-remind-at" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Время напоминания
              </Label>
              <Input id="add-remind-at" type="time" {...register('remind_at')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Категория
            </Label>
            <Select value={watchedCategory} onValueChange={(value: Category) => setValue('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              Отмена
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Добавление...' : 'Добавить задачу'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

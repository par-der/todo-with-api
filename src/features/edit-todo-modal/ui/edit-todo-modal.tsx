import { Category, CATEGORY_LABELS, Todo, TodoFormData } from '@/entities/todo.ts';
import { useUpdateAdminTodoMutation, useUpdateTodoMutation } from '@/shared/services/mutations.ts';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import * as React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog.tsx';
import { Button, Input, Label } from '@/shared/ui';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Textarea } from '@/shared/ui/textarea.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select.tsx';
import axios from 'axios';

interface EditTodoModalProps {
  todo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  asAdmin?: boolean;
}

export const EditTodoModal = ({ todo, isOpen, onClose, asAdmin = false }: EditTodoModalProps) => {
  const { mutate: updateTodo, isPending } = asAdmin ? useUpdateAdminTodoMutation() : useUpdateTodoMutation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm<TodoFormData>({
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      due_date: todo?.due_date || format(new Date(), 'yyyy-MM-dd'),
      remind_at: todo?.remind_at || '',
      category: todo?.category || 'HEALTH',
      completed: todo?.completed || false,
    },
  });

  const watchedCategory = watch('category');
  const todayISO = format(new Date(), 'yyyy-MM-dd');

  React.useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date,
        remind_at: todo.remind_at || '',
        category: todo.category,
        completed: todo.completed,
      });
    }
  }, [todo, reset]);

  const onSubmit = (formData: TodoFormData) => {
    if (!todo) return;

    const updateData = {
      id: todo.id,
      ...formData,
      remind_at: formData.remind_at || null,
    };

    updateTodo(updateData, {
      onSuccess: () => {
        onClose();
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
          const data = error.response.data;
          Object.entries(data).forEach(([field, messages]) => {
            setError(field as keyof TodoFormData, {
              type: 'server',
              message: (messages as string[])[0],
            });
          });
        } else {
          const msg =
            axios.isAxiosError(error) && error.response?.data?.detail
              ? (error.response.data.detail as string[])[0]
              : 'Серверная ошибка';
          setError('root.serverError' as any, {
            type: 'server',
            message: msg,
          });
        }
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
          <DialogTitle className="flex items-center justify-between">Редактировать задачу</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-sm font-medium">
              Название задачи
            </Label>
            <Input
              id="edit-title"
              {...register('title', { required: 'Название обязательно' })}
              placeholder="Введите название задачи"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description" className="text-sm font-medium">
              Описание
            </Label>
            <Textarea
              id="edit-description"
              {...register('description')}
              placeholder="Опишите задачу подробнее"
              className="h-40 max-h-48 resize-none overflow-y-auto text-wrap whitespace-pre-wrap"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-due-date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Дата выполнения
              </Label>
              <Input
                id="edit-due-date"
                type="date"
                {...register('due_date', {
                  required: 'Дата обязательна',
                  validate: (v) => v >= todayISO || 'Дата должна быть сегодня или позже',
                })}
              />
              {errors.due_date && <p className="text-xs text-red-500">{errors.due_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-remind-at" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Время напоминания
              </Label>
              <Input id="edit-remind-at" type="time" {...register('remind_at')} />
              {errors.remind_at && <p className="text-red-500 text-sm">{errors.remind_at.message}</p>}
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
              {isPending ? 'Сохранение...' : 'Сохранить изменения'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

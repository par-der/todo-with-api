import { useAddAdminTodoMutation, useAddTodoMutation } from '@/shared/services/mutations.ts';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Category, CATEGORY_LABELS, TodoFormData } from '@/entities/todo.ts';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Button, Input, Label } from '@/shared/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Calendar, Clock, Tag, User } from 'lucide-react';
import { Textarea } from '@/shared/ui/textarea.tsx';
import { useUsers } from '@/shared/services/queries.ts';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  asAdmin?: boolean;
}

export const AddTodoModal = ({ isOpen, onClose, asAdmin = false }: AddTodoModalProps) => {
  const { data: usersResponse } = useUsers(asAdmin);
  const users = usersResponse?.results || [];

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { mutate: addTodo, isPending } = useAddTodoMutation();
  const { mutate: addAdminTodo, isPending: isAdminPending } = useAddAdminTodoMutation();
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
      title: '',
      description: '',
      due_date: format(new Date(), 'yyyy-MM-dd'),
      remind_at: '',
      category: 'HEALTH',
      completed: false,
    },
  });
  const watchedCategory = watch('category');

  useEffect(() => {
    if (selectedUserId !== null) {
      setValue('user_id', selectedUserId);
    }
  }, [selectedUserId, setValue]);

  const onSubmit = (formData: TodoFormData) => {
    if (asAdmin) {
      const submitData = {
        ...formData,
        remind_at: formData.remind_at || null,
        ...(selectedUserId !== null && { user_id: selectedUserId }),
      };
      addAdminTodo(submitData, {
        onSuccess: () => {
          reset();
          setSelectedUserId(null);
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
    } else {
      const submitData = {
        ...formData,
        remind_at: formData.remind_at || null,
        ...(selectedUserId !== null && { user_id: selectedUserId }),
      };
      addTodo(submitData, {
        onSuccess: () => {
          reset();
          setSelectedUserId(null);
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
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[500px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
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
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-description" className="text-sm font-medium">
              Описание
            </Label>
            <Textarea
              id="add-description"
              {...register('description')}
              placeholder="Опишите задачу подробнее"
              className="h-40 max-h-48 resize-none overflow-y-auto text-wrap whitespace-pre-wrap"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="add-due-date" className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Дата выполнения
              </Label>
              <Input id="add-due-date" type="date" {...register('due_date', { required: 'Дата обязательна' })} />
              {errors.due_date && <p className="text-red-500 text-sm">{errors.due_date.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-remind-at" className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Время напоминания
              </Label>
              <Input id="add-remind-at" type="time" {...register('remind_at')} />
              {errors.remind_at && <p className="text-red-500 text-sm">{errors.remind_at.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {asAdmin && users.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Пользователь
                </Label>
                <Select
                  value={selectedUserId?.toString() || ''}
                  onValueChange={(value) => setSelectedUserId(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.username}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending || isAdminPending}>
              Отмена
            </Button>
            <Button type="submit" disabled={isPending || isAdminPending}>
              {isPending || isAdminPending ? 'Добавление...' : 'Добавить задачу'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

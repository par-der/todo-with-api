import { Button } from '@/shared/ui/button.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { useAddTodoMutation } from '@/shared/services/mutations.ts';
import { Category, CATEGORY_LABELS, TodoFormData } from '@/entities/todo.ts';
import { format } from 'date-fns';
import { Label } from '@/shared/ui';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select.tsx';
import { Textarea } from '@/shared/ui/textarea.tsx';

export const AddTodoForm = () => {
  const { mutate, isPending } = useAddTodoMutation();
  const { register, handleSubmit, reset, watch, setValue } = useForm<TodoFormData>({
    defaultValues: {
      title: '',
      description: '',
      completed: false,
      due_date: format(new Date(), 'yyyy-MM-dd'),
      remind_at: '',
      category: 'HEALTH',
    },
  });
  const watchedCategory = watch('category');

  const onSubmit = (todo: TodoFormData) => {
    const submitData = {
      ...todo,
      remind_at: todo.remind_at || null,
    };
    mutate(submitData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Название задачи
        </Label>
        <Input
          id="title"
          {...register('title', { required: 'Название обязательно' })}
          placeholder="Введите название задачи"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Описание
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Опишите задачу подробнее"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="due_date" className="text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Дата выполнения
          </Label>
          <Input
            id="due_date"
            type="date"
            {...register('due_date', { required: 'Дата обязательна' })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="remind_at" className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Время напоминания
          </Label>
          <Input id="remind_at" type="time" {...register('remind_at')} className="w-full" />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Категория
        </Label>
        <Select value={watchedCategory} onValueChange={(value: Category) => setValue('category', value)}>
          <SelectTrigger className="w-full">
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

      <Button disabled={isPending} type="submit" className="w-full" size="lg">
        {isPending ? 'Добавление...' : 'Добавить задачу'}
      </Button>
    </form>
  );
};

import { Button } from '@/shared/ui/button.tsx';
import { Input } from '@/shared/ui/input.tsx';
import { useForm } from 'react-hook-form';
import { useAddTodoMutation } from '@/shared/services/mutations.ts';
import { TodoFormData } from '@/entities/todo/model/todo.ts';

export const AddTodoForm = () => {
  const { mutate, isPending } = useAddTodoMutation();
  const { register, handleSubmit, reset } = useForm<TodoFormData>({
    defaultValues: { title: '', description: '', completed: false },
  });
  const onSubmit = (todo: TodoFormData) => {
    mutate(todo, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-2 w-full">
      <Input {...register('title')} placeholder="наименование" className="flex-1" />
      <Input {...register('description')} className="flex-1" placeholder="описание" />
      <Button disabled={isPending} type="submit" variant="destructive" className="w-full md:w-auto">
        Add
      </Button>
    </form>
  );
};

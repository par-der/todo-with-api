import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { TodoResponse } from '../entities/todo.ts';
import { useAddTodoMutation } from '../services/mutations.ts';
import { useForm } from 'react-hook-form';

const AddTodoForm = () => {
  const { mutate, isPending } = useAddTodoMutation();
  const { register, handleSubmit } = useForm<TodoResponse>({
    defaultValues: { title: '', description: '', completed: false },
  });
  const onSubmit = (todo: TodoResponse) => {
    mutate(todo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center col-auto flex-wrap gap-1.5 p-2">
      <Input {...register('title')} placeholder="наименование" className="flex-1" />
      <Input {...register('description')} className="flex-1" placeholder="описание" />
      <Button disabled={isPending} type="submit" variant="destructive">
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;

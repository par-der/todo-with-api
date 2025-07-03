import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { TodoResponse } from '../entities/todo.ts';
import { useAddTodoMutation } from '../services/mutations.ts';
import { useForm } from 'react-hook-form';

const AddTodoForm = () => {
  const { mutate, isPending } = useAddTodoMutation();
  const { register, handleSubmit, reset } = useForm<TodoResponse>({
    defaultValues: { title: '', description: '', completed: false },
  });
  const onSubmit = (todo: TodoResponse) => {
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

export default AddTodoForm;

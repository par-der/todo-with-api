import { Button } from '../components/ui/button.tsx';
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
      <input
        {...register('title')}
        name="title"
        className="p-2 border-2 items-center"
        type="text"
        placeholder="наименование"
      />
      <input
        {...register('description')}
        name="description"
        className="p-2 border-2 items-center"
        type="text"
        placeholder="описание"
      />
      <Button disabled={isPending} type="submit" variant="destructive">
        Add
      </Button>
    </form>
  );
};

export default AddTodoForm;

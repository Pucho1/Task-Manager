import TaskCard from "../features/tasks/components/TaskCard";
import { useTasks } from "../features/tasks/hooks/useTask";
import type { Task } from '../features/tasks/types/task';

const TaskPage = () => {
  
  const { tasksList, isLoading } = useTasks();

  return (
    <section className=" text-white">
      { isLoading ? 
        <p>Esta cargando data</p>
      : 
        tasksList?.map((task: Task) =>

          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => console.log('Editar tarea', task.id)}
            onDelete={() => console.log('Eliminar tarea', task.id)}
          />
        )
      }
    </section>
  );
};

export default TaskPage;

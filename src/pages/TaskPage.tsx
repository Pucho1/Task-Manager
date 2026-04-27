import { useTasks } from "../features/tasks/hooks/useTask";
import type { Task } from '../features/tasks/types/task';

const TaskPage = () => {
  
  const { tasksList, isLoading } = useTasks();

  return (
    <section>
      { isLoading ? 
        <p>Esta cargando data</p>
      : 
        tasksList?.map((task: Task) =>
          <div className="" key={task.id}>
            <p>{task.title}</p>
          </div>
        )
      }
    </section>
  );
};

export default TaskPage;

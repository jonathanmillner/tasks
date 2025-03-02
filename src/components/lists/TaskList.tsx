import TaskItem from "./TaskItem";
import { TaskListProps } from "../../types/Task";

const TaskList = ({ tasks, onComplete, onDelete }: TaskListProps) => {
  return (
    <ul className="divide-y divide-gray-200">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TaskList;

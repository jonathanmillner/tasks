import { memo, useCallback } from "react";
import { TaskItemProps } from "../../types/Task";

const TaskItem = ({ task, onComplete, onDelete }: TaskItemProps) => {
  const handleComplete = useCallback(
    () => onComplete(task.id),
    [onComplete, task.id],
  );
  const handleDelete = useCallback(
    () => onDelete(task.id),
    [onDelete, task.id],
  );

  return (
    <li className="flex items-center justify-between p-2 border-b border-gray-200 mb-4">
      <span
        className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
      >
        {task.title}
      </span>
      <div className="flex items-center space-x-2">
        {!task.completed && (
          <button
            onClick={handleComplete}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Complete
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default memo(TaskItem);

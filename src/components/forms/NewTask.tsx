import { useState, useCallback, ChangeEvent } from "react";
import { NewTaskProps } from "../../types/Task";

const NewTask = ({ onAddTask }: NewTaskProps) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = useCallback(() => {
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask("");
    }
  }, [newTask, onAddTask]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  }, []);

  return (
    <div className="flex items-center space-x-2 mb-4">
      <input
        type="text"
        placeholder="Enter new task"
        value={newTask}
        onChange={handleChange}
        className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTask;

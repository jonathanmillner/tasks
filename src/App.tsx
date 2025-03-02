import NewTask from "./components/forms/NewTask";
import TaskList from "./components/lists/TaskList";
import { useTasks } from "./hooks/useTasks";

const App = () => {
  const { tasks, loading, error, handleAddTask, handleComplete, handleDelete } =
    useTasks();

  return (
    <div className="max-w-xl mx-auto p-4">
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : error ? (
        <div className="loading">
          Sorry! We're having some issues! Please try again later. | {error}
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-10">Tasks</h1>
          <NewTask onAddTask={handleAddTask} />
          <TaskList
            tasks={tasks}
            onComplete={handleComplete}
            onDelete={handleDelete}
          />{" "}
        </>
      )}
    </div>
  );
};

export default App;

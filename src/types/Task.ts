export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface NewTaskProps {
  onAddTask: (title: string) => void;
}

export interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

import { create } from 'zustand';
import { Task } from '@/models/task';

interface TaskStore {
  tasks: Task[];
  selectedTask: Task | null;
  isTaskModalOpen: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, data: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  selectTask: (task: Task | null) => void;
  setTaskModalOpen: (isOpen: boolean) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  selectedTask: null,
  isTaskModalOpen: false,

  setTasks: (tasks) => set({ tasks }),

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (taskId, data) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? new Task({ ...task, ...data, updatedAt: new Date() })
          : task
      ),
    })),

  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),

  selectTask: (task) => set({ selectedTask: task }),

  setTaskModalOpen: (isOpen) => set({ isTaskModalOpen: isOpen }),
})); 
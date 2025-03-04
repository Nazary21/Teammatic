export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class TaskService {
  static async fetchTasks(): Promise<Task[]> {
    const response = await fetch('/api/tasks');
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to fetch tasks' }));
      throw new Error(error.error || 'Failed to fetch tasks');
    }
    const tasks = await response.json();
    return tasks.map((task: any) => ({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    }));
  }

  static async createTask(taskData: Partial<Task>): Promise<Task> {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...taskData,
        dueDate: taskData.dueDate?.toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to create task' }));
      throw new Error(error.error || 'Failed to create task');
    }

    const task = await response.json();
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    };
  }

  static async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...taskData,
        dueDate: taskData.dueDate?.toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to update task' }));
      throw new Error(error.error || 'Failed to update task');
    }

    const task = await response.json();
    return {
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
    };
  }

  static async deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Failed to delete task' }));
      throw new Error(error.error || 'Failed to delete task');
    }
  }
} 
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
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch tasks');
    }
    return response.json();
  }

  static async createTask(taskData: Partial<Task>): Promise<Task> {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create task');
    }

    return response.json();
  }

  static async updateTask(id: string, taskData: Partial<Task>): Promise<Task> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update task');
    }

    return response.json();
  }

  static async deleteTask(id: string): Promise<void> {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete task');
    }
  }
} 
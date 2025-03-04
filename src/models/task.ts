export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskMetadata {
  [key: string]: string | number | boolean | null;
}

export class Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  metadata?: TaskMetadata;

  constructor(data: Partial<Task>) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description;
    this.status = data.status || 'TODO';
    this.priority = data.priority || 'MEDIUM';
    this.dueDate = data.dueDate;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
    this.metadata = data.metadata;
  }

  static fromJSON(json: any): Task {
    return new Task({
      ...json,
      dueDate: json.dueDate ? new Date(json.dueDate) : undefined,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      metadata: json.metadata ? JSON.parse(json.metadata) : undefined,
    });
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      priority: this.priority,
      dueDate: this.dueDate?.toISOString(),
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      metadata: this.metadata ? JSON.stringify(this.metadata) : undefined,
    };
  }

  update(data: Partial<Task>): void {
    Object.assign(this, {
      ...data,
      updatedAt: new Date(),
    });
  }
} 
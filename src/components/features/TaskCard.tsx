"use client";

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Task } from '@/models/task';
import { useTaskStore } from '@/stores/taskStore';
import { TaskService } from '@/services/taskService';
import { Loader2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { selectTask, setTaskModalOpen, deleteTask } = useTaskStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    selectTask(task);
    setTaskModalOpen(true);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      setError(null);

      try {
        await TaskService.deleteTask(task.id);
        deleteTask(task.id);
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-500';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'bg-green-100 text-green-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'TODO':
        return 'bg-gray-100 text-gray-800';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
          <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {task.description && (
          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        )}
        <div className="flex items-center space-x-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500">
              Due: {task.dueDate.toLocaleDateString()}
            </span>
          )}
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-end space-x-2 w-full">
          <Button variant="outline" size="sm" onClick={handleEdit} disabled={isDeleting}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
} 
import { Project, Collection } from '@prisma/client';

export interface CreateProjectInput {
  name: string;
  description?: string;
}

export interface CreateCollectionInput {
  name: string;
  description?: string;
  projectId: string;
}

export class ProjectService {
  static async createProject(input: CreateProjectInput): Promise<Project> {
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to create project');
    }

    return response.json();
  }

  static async getProjects(): Promise<Project[]> {
    const response = await fetch('/api/projects');

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return response.json();
  }

  static async createCollection(input: CreateCollectionInput): Promise<Collection> {
    const response = await fetch('/api/collections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to create collection');
    }

    return response.json();
  }

  static async getCollections(projectId: string): Promise<Collection[]> {
    const response = await fetch(`/api/projects/${projectId}/collections`);

    if (!response.ok) {
      throw new Error('Failed to fetch collections');
    }

    return response.json();
  }

  static async deleteProject(projectId: string): Promise<void> {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  }

  static async deleteCollection(collectionId: string): Promise<void> {
    const response = await fetch(`/api/collections/${collectionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete collection');
    }
  }
} 
import { create } from 'zustand';

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

export interface ProjectWithCollections extends Project {
  collections?: Collection[];
}

interface ProjectStore {
  projects: ProjectWithCollections[];
  isLoading: boolean;
  error: string | null;
  selectedProjectId: string | null;
  isCreateProjectModalOpen: boolean;
  isCreateCollectionModalOpen: boolean;

  // Projects
  fetchProjects: () => Promise<void>;
  createProject: (name: string, description?: string) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  setSelectedProject: (projectId: string | null) => void;
  setCreateProjectModalOpen: (isOpen: boolean) => void;

  // Collections
  createCollection: (projectId: string, name: string, description?: string) => Promise<void>;
  deleteCollection: (collectionId: string) => Promise<void>;
  setCreateCollectionModalOpen: (isOpen: boolean) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,
  selectedProjectId: null,
  isCreateProjectModalOpen: false,
  isCreateCollectionModalOpen: false,

  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const projects = await response.json();
      set({ projects });
    } catch (error) {
      set({ error: 'Failed to fetch projects' });
      console.error('Error fetching projects:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createProject: async (name: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const project = await response.json();
      set((state) => ({
        projects: [...state.projects, project],
      }));
    } catch (error) {
      set({ error: 'Failed to create project' });
      console.error('Error creating project:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProject: async (projectId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
        selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
      }));
    } catch (error) {
      set({ error: 'Failed to delete project' });
      console.error('Error deleting project:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createCollection: async (projectId: string, name: string, description?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create collection');
      }

      const collection = await response.json();
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId
            ? {
                ...p,
                collections: [...(p.collections || []), collection],
              }
            : p
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to create collection' });
      console.error('Error creating collection:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCollection: async (collectionId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete collection');
      }

      set((state) => ({
        projects: state.projects.map((p) => ({
          ...p,
          collections: p.collections?.filter((c) => c.id !== collectionId),
        })),
      }));
    } catch (error) {
      set({ error: 'Failed to delete collection' });
      console.error('Error deleting collection:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedProject: (projectId) => set({ selectedProjectId: projectId }),
  setCreateProjectModalOpen: (isOpen) => set({ isCreateProjectModalOpen: isOpen }),
  setCreateCollectionModalOpen: (isOpen) => set({ isCreateCollectionModalOpen: isOpen }),
})); 
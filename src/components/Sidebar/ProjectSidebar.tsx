'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Settings, Home, Inbox, FileText, Loader2, MoreVertical, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjectStore, ProjectWithCollections } from '@/stores/projectStore';
import { CreateProjectDialog } from '@/components/dialogs/CreateProjectDialog';
import { CreateCollectionDialog } from '@/components/dialogs/CreateCollectionDialog';
import { DeleteConfirmationDialog } from '@/components/dialogs/DeleteConfirmationDialog';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DeleteConfirmation {
  type: 'project' | 'collection';
  id: string;
  name: string;
}

export function ProjectSidebar() {
  const {
    projects,
    isLoading,
    error,
    fetchProjects,
    selectedProjectId,
    setSelectedProject,
    setCreateProjectModalOpen,
    setCreateCollectionModalOpen,
    deleteProject,
    deleteCollection,
  } = useProjectStore();

  const [deleteConfirmation, setDeleteConfirmation] = useState<DeleteConfirmation | null>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleAddCollection = (projectId: string) => {
    setSelectedProject(projectId);
    setCreateCollectionModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteConfirmation) return;

    if (deleteConfirmation.type === 'project') {
      await deleteProject(deleteConfirmation.id);
    } else {
      await deleteCollection(deleteConfirmation.id);
    }
  };

  return (
    <>
      <div className="w-64 h-full bg-background border-r flex flex-col">
        {/* Company/App Header */}
        <div className="p-4 border-b flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">PM</span>
          </div>
          <span className="font-semibold">Project Manager</span>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-3 py-1 text-sm bg-muted rounded-md"
          />
        </div>

        {/* Navigation Links */}
        <nav className="px-2 py-2 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Home size={16} />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Inbox size={16} />
            Inbox
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileText size={16} />
            Documents
          </Button>
        </nav>

        {/* Projects Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-2 py-2">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-sm font-medium text-muted-foreground">PROJECTS</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => setCreateProjectModalOpen(true)}
              >
                <Plus size={16} />
              </Button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="px-2 py-4 text-sm text-red-500">
                {error}
                <Button
                  variant="ghost"
                  className="w-full mt-2 text-sm"
                  onClick={() => fetchProjects()}
                >
                  Retry
                </Button>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-1">
              {projects.map((project: ProjectWithCollections) => (
                <div key={project.id}>
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex-1 justify-start gap-2 px-2",
                        selectedProjectId === project.id && "bg-accent"
                      )}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      {selectedProjectId === project.id ? (
                        <ChevronDown size={16} />
                      ) : (
                        <ChevronRight size={16} />
                      )}
                      {project.name}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() =>
                            setDeleteConfirmation({
                              type: 'project',
                              id: project.id,
                              name: project.name,
                            })
                          }
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Collections */}
                  {selectedProjectId === project.id && (
                    <div className="ml-4 space-y-1">
                      {project.collections?.map((collection) => (
                        <div key={collection.id} className="flex items-center">
                          <Button
                            variant="ghost"
                            className="flex-1 justify-start pl-6 text-sm"
                          >
                            {collection.name}
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() =>
                                  setDeleteConfirmation({
                                    type: 'collection',
                                    id: collection.id,
                                    name: collection.name,
                                  })
                                }
                              >
                                <Trash className="w-4 h-4 mr-2" />
                                Delete Collection
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        className="w-full justify-start pl-6 text-sm text-muted-foreground"
                        onClick={() => handleAddCollection(project.id)}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Collection
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="p-2 border-t">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings size={16} />
            Settings
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <CreateProjectDialog />
      <CreateCollectionDialog />
      <DeleteConfirmationDialog
        isOpen={!!deleteConfirmation}
        onClose={() => setDeleteConfirmation(null)}
        onConfirm={handleDelete}
        title={`Delete ${deleteConfirmation?.type === 'project' ? 'Project' : 'Collection'}`}
        description={`Are you sure you want to delete "${deleteConfirmation?.name}"? This action cannot be undone.`}
      />
    </>
  );
} 
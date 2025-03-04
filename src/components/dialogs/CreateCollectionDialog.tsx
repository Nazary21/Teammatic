'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useProjectStore } from '@/stores/projectStore';
import { Loader2 } from 'lucide-react';

export function CreateCollectionDialog() {
  const {
    isCreateCollectionModalOpen,
    setCreateCollectionModalOpen,
    createCollection,
    selectedProjectId,
  } = useProjectStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) {
      setError('No project selected');
      return;
    }
    if (!name.trim()) {
      setError('Collection name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createCollection(selectedProjectId, name.trim(), description.trim() || undefined);
      setCreateCollectionModalOpen(false);
      setName('');
      setDescription('');
    } catch (err) {
      setError('Failed to create collection. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isCreateCollectionModalOpen} onOpenChange={setCreateCollectionModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Collection Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description (optional)
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter collection description"
              disabled={isSubmitting}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateCollectionModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !selectedProjectId}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Collection'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
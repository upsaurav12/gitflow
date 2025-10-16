import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { FolderOpen, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (project: { name: string; path: string; pipelineFile: string }) => void;
}

const AddProjectModal = ({ open, onOpenChange, onAdd }: AddProjectModalProps) => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [pipelineFile, setPipelineFile] = useState('pipeline.yaml');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !path) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    onAdd({ name, path, pipelineFile });
    setName('');
    setPath('');
    setPipelineFile('pipeline.yaml');
    onOpenChange(false);
    
    toast({
      title: 'Project Added',
      description: `${name} has been added successfully`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-border/50 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            Add New Project
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-awesome-project"
              className="mt-1.5 glass-effect"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="path" className="text-sm font-medium">
              Project Path *
            </Label>
            <div className="relative mt-1.5">
              <Input
                id="path"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                placeholder="/home/user/projects/my-project"
                className="glass-effect pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <FolderOpen className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="pipeline" className="text-sm font-medium">
              Pipeline File
            </Label>
            <Input
              id="pipeline"
              value={pipelineFile}
              onChange={(e) => setPipelineFile(e.target.value)}
              placeholder="pipeline.yaml"
              className="mt-1.5 glass-effect"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2 pt-4"
          >
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 glow-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;

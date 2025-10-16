import { Project } from '@/types/pipeline';
import { Play, FileText, Settings, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusBadge from '@/components/common/StatusBadge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="glass-effect p-6 rounded-xl hover:border-primary/50 transition-smooth group cursor-pointer"
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-smooth">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{project.directory}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-smooth">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-effect">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Configure
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{project.filename}</span>
      </div>

      {project.lastRun && (
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <StatusBadge status={project.lastRun.status} size="sm" />
          <div className="flex items-center gap-2">
            {project.lastRun.duration && (
              <span className="text-xs text-muted-foreground">
                {project.lastRun.duration}s
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
        <Button
          size="sm"
          className="flex-1 bg-primary hover:bg-primary/90 glow-primary"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <Play className="w-4 h-4 mr-2" />
          Run
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/project/${project.id}`)}
        >
          <FileText className="w-4 h-4 mr-2" />
          Logs
        </Button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

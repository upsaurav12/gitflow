import { PipelineStatus } from '@/types/pipeline';
import { CheckCircle2, XCircle, Loader2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: PipelineStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const StatusBadge = ({ status, size = 'md', showLabel = true }: StatusBadgeProps) => {
  const config = {
    idle: {
      icon: Circle,
      label: 'Idle',
      className: 'bg-muted text-muted-foreground',
      iconClassName: '',
    },
    running: {
      icon: Loader2,
      label: 'Running',
      className: 'bg-primary/20 text-primary glow-primary',
      iconClassName: 'animate-spin',
    },
    success: {
      icon: CheckCircle2,
      label: 'Success',
      className: 'bg-success/20 text-success glow-success',
      iconClassName: '',
    },
    failed: {
      icon: XCircle,
      label: 'Failed',
      className: 'bg-destructive/20 text-destructive glow-destructive',
      iconClassName: '',
    },
  };

  const { icon: Icon, label, className, iconClassName } = config[status];

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs gap-1',
    md: 'px-3 py-1.5 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-smooth',
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], iconClassName)} />
      {showLabel && <span>{label}</span>}
    </motion.div>
  );
};

export default StatusBadge;

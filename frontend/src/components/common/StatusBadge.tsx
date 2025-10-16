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
    className:
      'bg-muted/60 text-muted-foreground border border-border/40 dark:bg-muted/40 dark:text-muted-foreground',
    iconClassName: '',
  },
  running: {
    icon: Loader2,
    label: 'Running',
    className:
      'bg-blue-100 text-blue-700 border border-blue-200 ' +
      'dark:bg-blue-900/70 dark:text-blue-300 dark:border-blue-800/70',
    iconClassName: 'animate-spin-slow',
  },
  success: {
    icon: CheckCircle2,
    label: 'Success',
    className:
      'bg-emerald-100 text-emerald-700 border border-emerald-200 ' +
      'dark:bg-emerald-900/70 dark:text-emerald-300 dark:border-emerald-800/70',
    iconClassName: '',
  },
  failed: {
    icon: XCircle,
    label: 'Failed',
    className:
      'bg-red-100 text-red-700 border border-red-200 ' +
      'dark:bg-red-900/70 dark:text-red-300 dark:border-red-800/70',
    iconClassName: '',
  },
};


  const { icon: Icon, label, className, iconClassName } = config[status] || config.idle;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
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

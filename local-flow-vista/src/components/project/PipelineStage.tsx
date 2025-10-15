import { PipelineStage as PipelineStageType } from '@/types/pipeline';
import StatusBadge from '@/components/common/StatusBadge';
import { Clock, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PipelineStageProps {
  stage: PipelineStageType;
  index: number;
}

const PipelineStage = ({ stage, index }: PipelineStageProps) => {
  const [expanded, setExpanded] = useState(stage.status === 'running');

  return (
    <motion.div
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.08, duration: 0.25, ease: "easeOut" }}
  className={cn(
    "rounded-lg border bg-card p-4 shadow-sm transition-colors duration-200",
    "hover:border-primary/40"
  )}
  style={{
    borderLeft: `3px solid ${
      stage.status === "success"
        ? "hsl(var(--success))"
        : stage.status === "failed"
        ? "hsl(var(--destructive))"
        : stage.status === "running"
        ? "hsl(var(--primary))"
        : "hsl(var(--muted-foreground))"
    }`,
  }}
>
  {/* Stage Header */}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3 flex-1">
      <Button
        variant="ghost"
        size="icon"
        className="w-6 h-6 hover:bg-transparent"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </Button>

      <div className="flex-1">
        <h4 className="font-medium text-sm text-foreground leading-none">
          {stage.name}
        </h4>
        {stage.duration && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="w-3 h-3" />
            <span>{stage.duration}s</span>
          </div>
        )}
      </div>
    </div>

    <StatusBadge status={stage.status} size="md" />
  </div>

  {/* Logs */}
  <AnimatePresence>
    {expanded && stage.logs.length > 0 && (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="mt-3 overflow-hidden"
      >
        <div className="rounded-md bg-muted/40 border text-xs font-mono p-3 max-h-48 overflow-y-auto">
          {stage.logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "py-0.5 text-muted-foreground",
                log.toLowerCase().includes("error") && "text-destructive",
                log.toLowerCase().includes("warning") && "text-yellow-600 dark:text-yellow-500",
                log.toLowerCase().includes("success") && "text-success"
              )}
            >
              {log}
            </motion.div>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
  );
};

export default PipelineStage;

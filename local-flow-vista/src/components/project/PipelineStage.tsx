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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-effect rounded-xl p-4 border-l-4"
      style={{
        borderLeftColor:
          stage.status === 'success'
            ? 'hsl(var(--success))'
            : stage.status === 'failed'
            ? 'hsl(var(--destructive))'
            : stage.status === 'running'
            ? 'hsl(var(--primary))'
            : 'hsl(var(--muted))',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
          <div className="flex-1">
            <h4 className="font-semibold text-sm">{stage.name}</h4>
            {stage.duration && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                <span>{stage.duration}s</span>
              </div>
            )}
          </div>
        </div>
        <StatusBadge status={stage.status} size="sm" />
      </div>

      <AnimatePresence>
        {expanded && stage.logs.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            <div className="bg-background/50 rounded-lg p-3 font-mono text-xs max-h-48 overflow-y-auto">
              {stage.logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'py-0.5',
                    log.includes('error') && 'text-destructive',
                    log.includes('warning') && 'text-warning',
                    log.includes('success') && 'text-success'
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

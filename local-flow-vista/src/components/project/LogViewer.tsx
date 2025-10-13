import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LogViewerProps {
  logs: string[];
  autoScroll?: boolean;
}

const LogViewer = ({ logs, autoScroll = true }: LogViewerProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  return (
    <motion.div
      layout
      className={cn(
        'glass-effect rounded-xl overflow-hidden border border-border/50',
        fullscreen && 'fixed inset-4 z-50'
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold">Console Output</span>
          <span className="text-xs text-muted-foreground">({logs.length} lines)</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={() => setFullscreen(!fullscreen)}
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: fullscreen ? 'calc(100vh - 8rem)' : 400 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div
              ref={scrollRef}
              className="p-4 bg-background/90 font-mono text-xs overflow-y-auto h-full"
            >
              {logs.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No logs available
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.01 }}
                    className={cn(
                      'py-0.5 leading-relaxed',
                      log.toLowerCase().includes('error') && 'text-destructive',
                      log.toLowerCase().includes('warn') && 'text-warning',
                      log.toLowerCase().includes('success') && 'text-success',
                      !log.toLowerCase().match(/error|warn|success/) && 'text-foreground/80'
                    )}
                  >
                    <span className="text-muted-foreground mr-2">
                      [{new Date().toLocaleTimeString()}]
                    </span>
                    {log}
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LogViewer;

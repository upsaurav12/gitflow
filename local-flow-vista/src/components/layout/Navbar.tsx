import { Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect border-b border-border/50 px-6 py-4 flex items-center justify-between sticky top-0 z-40"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Pipeline Orchestrator</h2>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
      </div>
    </motion.header>
  );
};

export default Navbar;

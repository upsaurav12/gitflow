import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="glass-effect border-r border-border/50 flex flex-col h-screen sticky top-0"
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-border/50">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
              <span className="text-lg font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold">DevOps</h1>
              <p className="text-xs text-muted-foreground">Orchestrator</p>
            </div>
          </motion.div>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <span className="text-lg font-bold">⚡</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth',
                'hover:bg-sidebar-accent',
                isActive && 'bg-sidebar-accent text-primary glow-primary',
                collapsed && 'justify-center'
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-medium"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Toggle Button */}
      <div className="p-4 border-t border-border/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn('w-full', collapsed && 'px-2')}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="ml-2 text-xs">Collapse</span>}
        </Button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

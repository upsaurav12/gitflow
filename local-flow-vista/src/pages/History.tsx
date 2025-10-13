import { motion } from 'framer-motion';

const History = () => {
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold gradient-text">Pipeline History</h1>
        <p className="text-muted-foreground mt-1">
          View past pipeline executions and their results
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-12 text-center"
      >
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
        <p className="text-muted-foreground">
          Pipeline history tracking will be available in the next update
        </p>
      </motion.div>
    </div>
  );
};

export default History;

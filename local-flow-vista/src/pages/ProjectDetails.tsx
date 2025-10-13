import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PipelineStage from '@/components/project/PipelineStage';
import LogViewer from '@/components/project/LogViewer';
import StatusBadge from '@/components/common/StatusBadge';
import { PipelineStage as PipelineStageType, PipelineStatus } from '@/types/pipeline';
import { toast } from '@/hooks/use-toast';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PipelineStatus>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  
  const [stages, setStages] = useState<PipelineStageType[]>([
    {
      id: '1',
      name: 'Environment Setup',
      status: 'success',
      duration: 12,
      logs: [
        'Installing dependencies...',
        'npm install completed',
        'Environment variables loaded',
        'Setup completed successfully',
      ],
    },
    {
      id: '2',
      name: 'Build',
      status: 'success',
      duration: 45,
      logs: [
        'Starting build process...',
        'Compiling TypeScript...',
        'Building production bundle...',
        'Build completed successfully',
      ],
    },
    {
      id: '3',
      name: 'Test',
      status: 'running',
      logs: [
        'Running test suite...',
        'Test 1/24 passed',
        'Test 2/24 passed',
        'Running integration tests...',
      ],
    },
    {
      id: '4',
      name: 'Deploy',
      status: 'idle',
      logs: [],
    },
  ]);

  const mockProject = {
    name: 'Frontend Dashboard',
    path: '/home/dev/projects/dashboard',
    pipelineFile: 'pipeline.yaml',
  };

  const handleRunPipeline = () => {
    setStatus('running');
    toast({
      title: 'Pipeline Started',
      description: 'Your pipeline is now running',
    });

    // Simulate log streaming
    const logMessages = [
      'Pipeline started...',
      'Initializing workspace...',
      'Loading configuration...',
      'Starting stage execution...',
    ];

    logMessages.forEach((msg, i) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, msg]);
      }, i * 500);
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold gradient-text">{mockProject.name}</h1>
            <p className="text-muted-foreground mt-1">{mockProject.path}</p>
          </div>
          <StatusBadge status={status} size="lg" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleRunPipeline}
            className="bg-primary hover:bg-primary/90 glow-primary"
            disabled={status === 'running'}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Pipeline
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Pipeline Stages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Pipeline Stages</h2>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <PipelineStage key={stage.id} stage={stage} index={index} />
          ))}
        </div>
      </div>

      {/* Log Viewer */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Live Logs</h2>
        <LogViewer logs={logs} />
      </div>
    </div>
  );
};

export default ProjectDetails;

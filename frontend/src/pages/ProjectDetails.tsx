import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import PipelineStage from '@/components/project/PipelineStage';
import LogViewer from '@/components/project/LogViewer';
import StatusBadge from '@/components/common/StatusBadge';
import { PipelineStage as PipelineStageType, PipelineStatus } from '@/types/pipeline';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

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

  // 🧠 Open WebSocket connection
  const ws = new WebSocket(`ws://localhost:8000/api/v1/project/${id}`);

  ws.onopen = () => {
    console.log('✅ Connected to WebSocket');
    setLogs((prev) => [...prev, 'Connected to server...']);
  };

  ws.onmessage = (event) => {
    console.log('📦 Message:', event.data);
    setLogs((prev) => [...prev, event.data]);
  };

  ws.onerror = (err) => {
    console.error('❌ WebSocket error:', err);
    setLogs((prev) => [...prev, 'Error connecting to server.']);
    setStatus('failed');
  };

  ws.onclose = () => {
    console.log('🔒 Connection closed');
    setLogs((prev) => [...prev, 'Connection closed.']);
    setStatus('success');
  };
};


  return (
   <div className="p-6 space-y-8">
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="space-y-3"
  >
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/')}
        className="hover:bg-muted"
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>

      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-foreground">
          {mockProject.name}
        </h1>
        <p className="text-sm text-muted-foreground">{mockProject.path}</p>
      </div>

      <StatusBadge status={status} size="lg" />
    </div>

    <div className="flex items-center gap-3">
      <Button
        onClick={handleRunPipeline}
        className="bg-primary hover:bg-primary/90 transition-colors"
        disabled={status === 'running'}
      >
        <Play className="w-4 h-4 mr-2" />
        Run Pipeline
      </Button>
      <Button
        variant="outline"
        className="hover:bg-muted"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
    </div>
  </motion.div>

  {/* Pipeline Stages */}
  {/* <section>
    <h2 className="text-lg font-medium mb-3 text-foreground">Pipeline Stages</h2>
    <div className="space-y-3 border rounded-lg p-4 bg-card shadow-sm">
      {stages.map((stage, index) => (
        <PipelineStage key={stage.id} stage={stage} index={index} />
      ))}
    </div>
  </section> */}

  {/* Log Viewer */}
  <section>
    <h2 className="text-lg font-medium mb-3 text-foreground">Live Logs</h2>
    <div className="border rounded-lg bg-muted/30 p-4 max-h-[400px] overflow-y-auto">
      <LogViewer logs={logs} />
    </div>
  </section>
</div>

  );
};

export default ProjectDetails;

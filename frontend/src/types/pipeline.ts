export type PipelineStatus = 'idle' | 'running' | 'success' | 'failed';

export interface Project {
  id: string;
  name: string;
  directory: string;
  filename: string;
  lastRun?: {
    status: PipelineStatus;
    timestamp: Date;
    duration?: number;
  };
}

export interface PipelineStage {
  id: string;
  name: string;
  status: PipelineStatus;
  duration?: number;
  logs: string[];
  startTime?: Date;
  endTime?: Date;
}

export interface PipelineRun {
  id: string;
  projectId: string;
  status: PipelineStatus;
  stages: PipelineStage[];
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

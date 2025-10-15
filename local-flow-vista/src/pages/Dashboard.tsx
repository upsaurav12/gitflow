import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/dashboard/ProjectCard';
import AddProjectModal from '@/components/modals/AddProjectModal';
import { Project } from '@/types/pipeline';
import { motion } from 'framer-motion';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([
    // {
    //   id: '1',
    //   name: 'Frontend Dashboard',
    //   path: '/home/dev/projects/dashboard',
    //   pipelineFile: 'pipeline.yaml',
    //   lastRun: {
    //     status: 'success',
    //     timestamp: new Date(),
    //     duration: 45,
    //   },
    // },
    // {
    //   id: '2',
    //   name: 'API Service',
    //   path: '/home/dev/projects/api',
    //   pipelineFile: 'pipeline.yaml',
    //   lastRun: {
    //     status: 'running',
    //     timestamp: new Date(),
    //   },
    // },
    // {
    //   id: '3',
    //   name: 'Data Pipeline',
    //   path: '/home/dev/projects/data-pipeline',
    //   pipelineFile: 'pipeline.yaml',
    //   lastRun: {
    //     status: 'failed',
    //     timestamp: new Date(),
    //     duration: 120,
    //   },
    // },
    // {
    //   id: '4',
    //   name: 'Mobile App Backend',
    //   path: '/home/dev/projects/mobile-backend',
    //   pipelineFile: 'pipeline.yaml',
    //   lastRun: {
    //     status: 'idle',
    //     timestamp: new Date(),
    //   },
    // },
  ]);

  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/projects");
      console.log("res data:" , res.data)
      setProjects(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  fetchProjects();

  }, [])

  const handleAddProject = async  (newProject: { name: string; directory: string; filename: string }) => {

    const randomNumber = Math.floor(Math.random() * 1000) + 1
    const project: Project = {
      id: randomNumber.toString(),
      ...newProject,
      lastRun: {
        status: 'idle',
        timestamp: new Date(),
      },
    };

    try {
      const res = await axios.post("http://localhost:8000/api/v1/project", project)
      console.log("actually from the output: ", res.data)
    } catch (error) {
      console.error("error:" , error)
    }
    setProjects([...projects, project]);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold gradient-text">Projects</h1>
          <p className="text-muted-foreground mt-1">
            Manage and monitor your DevOps pipelines
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-primary hover:bg-primary/90 glow-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Projects', value: projects.length, color: 'primary' },
          {
            label: 'Running',
            value: projects.filter((p) => p.lastRun?.status === 'running').length,
            color: 'primary',
          },
          {
            label: 'Success',
            value: projects.filter((p) => p.lastRun?.status === 'success').length,
            color: 'success',
          },
          {
            label: 'Failed',
            value: projects.filter((p) => p.lastRun?.status === 'failed').length,
            color: 'destructive',
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="glass-effect p-4 rounded-xl"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`text-3xl font-bold mt-1 text-${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* Add Project Modal */}
      <AddProjectModal open={modalOpen} onOpenChange={setModalOpen} onAdd={handleAddProject} />
    </div>
  );
};

export default Dashboard;

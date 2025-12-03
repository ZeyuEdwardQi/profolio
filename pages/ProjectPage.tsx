import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold font-serif mb-4">Selected Work</h1>
        <p className="text-stone-600 dark:text-stone-400">
            A collection of my projects in Data Science, Machine Learning, and Bioinformatics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {MOCK_PROJECTS.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
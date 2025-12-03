import React from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group flex flex-col h-full bg-white dark:bg-stone-800 rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-lg hover:border-accent dark:hover:border-accent transition-all duration-300">
      <div className="relative overflow-hidden aspect-[3/2] border-b border-stone-100 dark:border-stone-700">
        <img 
            src={project.image} 
            alt={project.title} 
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
        />
        {project.link && (
            <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="absolute top-3 right-3 bg-white dark:bg-black p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                <ExternalLink size={16} className="text-accent" />
            </a>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
            <h3 className="text-lg font-bold font-serif leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
            <span className="text-xs font-mono text-stone-400 italic shrink-0 ml-2">{project.year}</span>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-300 mb-4 flex-grow line-clamp-3 leading-relaxed">
            {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 rounded-md border border-stone-200 dark:border-stone-700">
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
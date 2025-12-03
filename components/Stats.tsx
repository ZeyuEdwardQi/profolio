import React, { useEffect, useState } from 'react';
import { fetchGithubProfile } from '../services/githubService';
import { GITHUB_USERNAME } from '../constants';
import { GithubProfile } from '../types';
import { Users, Book, GitFork } from 'lucide-react';

const Stats: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);

  useEffect(() => {
    fetchGithubProfile(GITHUB_USERNAME).then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <div className="mt-12 py-8 border-t border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 rounded-lg">
      <h3 className="text-center font-serif text-lg mb-6 text-stone-500 uppercase tracking-widest text-xs">GitHub Activity</h3>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        <div className="flex flex-col items-center gap-2 group">
            <Book className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold font-mono">{profile.public_repos}</span>
            <span className="text-xs text-stone-500 uppercase">Repositories</span>
        </div>
        <div className="flex flex-col items-center gap-2 group">
             <GitFork className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
             <span className="text-2xl font-bold font-mono">{profile.public_gists}</span>
             <span className="text-xs text-stone-500 uppercase">Gists</span>
        </div>
        <div className="flex flex-col items-center gap-2 group">
            <Users className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-bold font-mono">{profile.followers}</span>
            <span className="text-xs text-stone-500 uppercase">Followers</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
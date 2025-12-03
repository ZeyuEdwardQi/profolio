import React from 'react';
import { Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { GITHUB_USERNAME } from '../constants';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold font-serif mb-8 border-l-4 border-accent pl-4">Get in Touch</h1>
      
      <div className="grid md:grid-cols-2 gap-12">
        {/* Info Column */}
        <div className="space-y-8">
          <p className="text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
            I'm currently looking for internships and collaborative opportunities in ML engineering and Bioinformatics. 
            Feel free to reach out if you want to discuss a project or just say hi!
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-stone-700 dark:text-stone-300">
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full">
                    <Mail size={20} className="text-accent" />
                </div>
                <span>zeyu.example@ucsd.edu</span>
            </div>
            <div className="flex items-center gap-4 text-stone-700 dark:text-stone-300">
                <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-full">
                    <MapPin size={20} className="text-accent" />
                </div>
                <span>San Diego, CA</span>
            </div>
          </div>

          <div className="pt-6">
             <h3 className="font-bold mb-4 uppercase text-xs tracking-widest text-stone-500">Socials</h3>
             <div className="flex gap-4">
                <a href={`https://github.com/${GITHUB_USERNAME}`} className="p-3 border border-stone-200 dark:border-stone-700 rounded-lg hover:border-accent hover:text-accent transition-all">
                    <Github size={24} />
                </a>
                <a href="#" className="p-3 border border-stone-200 dark:border-stone-700 rounded-lg hover:border-accent hover:text-accent transition-all">
                    <Linkedin size={24} />
                </a>
             </div>
          </div>
        </div>

        {/* Form Column */}
        <form className="bg-stone-50 dark:bg-stone-800/50 p-8 rounded-2xl border border-stone-200 dark:border-stone-700 shadow-sm" onSubmit={(e) => e.preventDefault()}>
            <label className="block mb-4">
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-1 block">Name</span>
                <input type="text" className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Your Name" />
            </label>
            <label className="block mb-4">
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-1 block">Email</span>
                <input type="email" className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="john@example.com" />
            </label>
            <label className="block mb-6">
                <span className="text-sm font-bold text-stone-700 dark:text-stone-300 mb-1 block">Message</span>
                <textarea rows={4} className="w-full px-4 py-2 rounded-md border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="Tell me about your project..."></textarea>
            </label>
            <button className="w-full bg-accent text-white font-bold py-3 rounded-md hover:bg-amber-700 transition-colors shadow-lg shadow-accent/20">
                Send Message
            </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
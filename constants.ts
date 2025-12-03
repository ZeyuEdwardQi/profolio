import { NavItem, Project } from './types';

export const GITHUB_USERNAME = 'ZeyuEdwardQi';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
  { label: 'GitHub', path: `https://github.com/${GITHUB_USERNAME}`, isExternal: true },
];

// Mock data to replace the external JSON file for immediate functionality
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Transformer Inference Optimization',
    description: 'Fine-tuning transformer models to boost inference speed by 40% using quantization and pruning techniques.',
    image: 'https://picsum.photos/seed/ai1/600/400',
    year: 2024,
    link: 'https://github.com/zeyuedwardqi',
    tags: ['Python', 'PyTorch', 'NLP'],
  },
  {
    id: '2',
    title: 'End-to-End Prediction Pipeline',
    description: 'Built a robust ML pipeline for real-time housing price prediction, deploying via Docker and FastAPI.',
    image: 'https://picsum.photos/seed/ml2/600/400',
    year: 2023,
    link: 'https://github.com/zeyuedwardqi',
    tags: ['Docker', 'FastAPI', 'Scikit-Learn'],
  },
  {
    id: '3',
    title: 'Biological Data Visualization',
    description: 'Exploratory data analysis on genomic sequences to identify mutation clusters using D3.js and Python.',
    image: 'https://picsum.photos/seed/bio3/600/400',
    year: 2023,
    link: 'https://github.com/zeyuedwardqi',
    tags: ['D3.js', 'Pandas', 'Biology'],
  },
  {
    id: '4',
    title: 'Arctic Fox Habitat Analysis',
    description: 'Analyzing climate change impact on Arctic Fox populations using satellite imagery and geospatial data.',
    image: 'https://picsum.photos/seed/fox/600/400',
    year: 2022,
    link: 'https://github.com/zeyuedwardqi',
    tags: ['Geospatial', 'Python', 'Climate'],
  },
];
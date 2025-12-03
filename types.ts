export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  year: number;
  link?: string;
  tags: string[];
}

export interface GithubProfile {
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  avatar_url: string;
  login: string;
  html_url: string;
}

export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
}
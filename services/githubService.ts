import { GithubProfile } from '../types';

export const fetchGithubProfile = async (username: string): Promise<GithubProfile | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API Error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      avatar_url: data.avatar_url,
      login: data.login,
      html_url: data.html_url,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};
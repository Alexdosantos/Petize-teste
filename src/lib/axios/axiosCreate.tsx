import axios from 'axios';

const TOKEN = "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"

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'Petize-Github-App',
    Authorization: `Bearer ${TOKEN}`,
  }
});

export default api;
import { APIRequestContext, request } from '@playwright/test';
import { endpoints } from '../../fixtures/endPoints';
import * as dotenv from 'dotenv';

dotenv.config();


export class APIClient {
  private apiContext!: APIRequestContext; // non-null assertion

  constructor() {}

  // Initialize the API context before making requests
  async init() {
    const userToken = process.env.USER_TOKEN;

if (!userToken) {
  throw new Error('USER_TOKEN is missing. Set it in your .env file.');
}
    this.apiContext = await request.newContext({
      baseURL: endpoints.BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json',
        'Authorization': userToken
      },
    });
  }

  
async createNewRepo(repoName: string, repoDescription: string ) {
  return await this.apiContext.post(endpoints.CREATE_REPO, {
  data: {
    name: repoName,
    description: repoDescription,
    private: false,
  },
  });
}

async deleteRepo(ownerName: string, repoName: string ) {
   const deleteEndpoint = endpoints.DELETE_REPO
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName);
  return await this.apiContext.delete(deleteEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName
  },
  });
}

async fetchRepo(ownerName: string, repoName: string ) {
   const fetchEndpoint = endpoints.DELETE_REPO
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName);
  return await this.apiContext.get(fetchEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName
  },
  });
}

  async close() {
    await this.apiContext.dispose();
  }
}

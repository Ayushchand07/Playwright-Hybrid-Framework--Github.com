import { APIRequestContext, request } from '@playwright/test';
import { endpoints } from '../../fixtures/endPoints';
import * as dotenv from 'dotenv';
import { IssueUpdatePayload } from '../../pageObjects/APIpageObjects/updateIssuePayload';

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
   const deleteRepoEndpoint = endpoints.DELETE_REPO
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName);
  return await this.apiContext.delete(deleteRepoEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName
  },
  });
}

async fetchRepo(ownerName: string, repoName: string ) {
   const fetchRepoEndpoint = endpoints.DELETE_REPO
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName);
  return await this.apiContext.get(fetchRepoEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName
  },
  });
}

async createNewIssue(ownerName: string, repoName: string, issueName: string ) {
   const createIssueEndpoint = endpoints.CREATE_ISSUE
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName);
  return await this.apiContext.post(createIssueEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName
  },
  data: {
    title: issueName,
  }
  });
}

async fetchIssue(ownerName: string, repoName: string, issueNumber: number) {
   const fetchIssueEndpoint = endpoints.FETCH_ISSUE
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName)
    .replace('{issue_number}', issueNumber.toString());
  return await this.apiContext.get(fetchIssueEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName,
    issue_number: issueNumber
  },
  });
}

async updateIssue(ownerName: string, repoName: string, issueNumber: number, updatedPayload: IssueUpdatePayload) {
   const updateIssueEndpoint = endpoints.UPDATE_ISSUE
    .replace('{owner}', ownerName)
    .replace('{repo}', repoName)
    .replace('{issue_number}', issueNumber.toString());
  return await this.apiContext.patch(updateIssueEndpoint, {
  params: {
    owner: ownerName,
    repo: repoName,
    issue_number: issueNumber
  },
  data: updatedPayload,
});
}

  async close() {
    await this.apiContext.dispose();
  }
}

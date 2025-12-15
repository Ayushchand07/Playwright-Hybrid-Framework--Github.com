import { Page, Locator} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class RepoPage {
  readonly page: Page;
  readonly newRepositoryLink : Locator
  readonly descriptionField: Locator
  readonly repositoryNameField: Locator
  readonly createNewRepoButton: Locator


  constructor(page: Page) {
    this.page = page;
    this.descriptionField = page.getByRole('textbox',{name: 'Description'});
    this.repositoryNameField = page.getByRole('textbox',{name: 'Repository name *'});
    this.newRepositoryLink = page.getByRole('link',{name: 'New'});
    this.createNewRepoButton = page.getByRole('button',{name: 'Create repository'});
    
  }

  async createNewRepo(repoName: string, description: string) {
    await this.newRepositoryLink.click()
    await this.repositoryNameField.fill(repoName);
    await this.descriptionField.fill(description);
    await this.page.waitForTimeout(5000);
    await this.createNewRepoButton.click();
    await this.page.waitForTimeout(5000);
  }

}
import { Page, Locator} from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export class IssuePage {
  readonly page: Page;
  readonly newIssueButton : Locator
  readonly blankIssueLink: Locator
  readonly issueTitleField: Locator
  readonly issueDescriptionField: Locator
  readonly createIssueButton: Locator

  readonly searchIssuesField: Locator
  readonly searchButton: Locator


  constructor(page: Page) {
    this.page = page;
    this.newIssueButton = page.getByRole('button',{name: 'New issue'});
    this.blankIssueLink = page.getByRole('link',{name: 'Blank issue'});
    this.issueTitleField = page.getByRole('textbox',{name: 'Add a title'});
    this.issueDescriptionField = page.getByRole('textbox',{name: 'Markdown value'});
    this.createIssueButton = page.getByRole('button',{name: 'Create ( control enter )'});
    this.searchIssuesField = page.getByRole('combobox',{name: 'Search Issues'});
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true})
    
  }

  async createNewIssue(issuName: string, description: string) {
    await this.newIssueButton.click()
    await this.blankIssueLink.click();
    await this.issueTitleField.fill(issuName);
    await this.issueDescriptionField.fill(description);
    await this.createIssueButton.click();
    await this.page.waitForTimeout(5000);
  }

  async isIssuePresent(issueName:string){
    this.searchIssuesField.fill(issueName);
    this.searchButton.click()
    const issueLocator = this.page.getByRole('link', {
    name: issueName});

    return await issueLocator.isVisible();
  }

}
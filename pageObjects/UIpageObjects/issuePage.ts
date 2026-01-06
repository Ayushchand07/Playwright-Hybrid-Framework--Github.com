import { Page, Locator, expect} from '@playwright/test';
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

  readonly searchRepoBar: Locator
  readonly issueTitle: Locator


  constructor(page: Page) {
    this.page = page;
    this.newIssueButton = page.getByRole('button',{name: 'New issue'});
    this.blankIssueLink = page.getByRole('link',{name: 'Blank issue'});
    this.issueTitleField = page.getByRole('textbox',{name: 'Add a title'});
    this.issueDescriptionField = page.getByRole('textbox',{name: 'Markdown value'});
    this.createIssueButton = page.getByRole('button',{name: 'Create ( control enter )'});
    this.searchIssuesField = page.getByRole('combobox',{name: 'Search Issues'});
    this.searchButton = page.getByRole('button', { name: 'Search', exact: true})
    this.searchRepoBar = page.getByRole('combobox', {name: 'Select repository'})
    this.issueTitle = page.locator('[data-testid="issue-title"]')
    
  }

  async createNewIssue(issuName: string, description: string, repoName: string) {
    await this.newIssueButton.click()
    await this.page.waitForTimeout(3000);
    const repoSelectorDropdownArrow = this.page.locator('.prc-Button-Visual-YNt2F')
    await repoSelectorDropdownArrow.nth(1).click();
    await this.searchRepoBar.fill(repoName);
    await this.page.getByText(repoName).click();
    await this.issueTitleField.fill(issuName);
    await this.issueDescriptionField.fill(description);
    await this.createIssueButton.click();
    await this.page.waitForTimeout(5000);
  }

  async isIssuePresent(issueName:string){
    await this.searchIssuesField.fill(issueName);
    await this.searchButton.click()
    const issueLocator = this.page.getByRole('link', {
    name: issueName});

    return await issueLocator.isVisible();
  }

  async validateIssueTitle(UpdatedTitle:string|number){
    if(UpdatedTitle == null){throw 'issue title is null'}
    await expect(this.issueTitle).toHaveText(UpdatedTitle.toString());
  }

}
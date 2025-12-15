import { Page, Locator } from '@playwright/test';

export class HomePage{
  readonly page: Page;
  readonly signInLink: Locator
  readonly loggedInWithUserIcon: Locator
  readonly loggedInWithUserDropdown: Locator
  readonly signOutLink: Locator; 
  readonly repositoriesOption: Locator

  readonly repoSearchField: Locator
  readonly globalNavigationButton: Locator
  readonly homeLink: Locator


  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', {name: 'Sign in'})
    this.loggedInWithUserIcon = page.getByRole('button', { name: 'Open user navigation menu' })
    this.loggedInWithUserDropdown = page.getByRole('heading', { name: 'User navigation' }) 
    this.signOutLink = page.getByRole('link', {name: "Sign out"})
    this.repositoriesOption = page.getByRole('link', {name: "Repositories"}).first()
    this.globalNavigationButton = page.getByRole('button', {name: "Open global navigation menu"})
    this.homeLink = page.getByRole('link', {name: "Home"})

    this.repoSearchField = page.locator('#dashboard-repos-filter-left')

  }

  async navigateToUrl() {
    const url = process.env.SITE_URL;
    if (!url){
        throw new Error("SITE_URL is not defined in .env");
    }
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  async openUserMenu() {
  await this.loggedInWithUserIcon.click();
}

async isUserMenuVisible(): Promise<boolean> {
  return await this.loggedInWithUserDropdown.isVisible();
}

private usernameLabel = (username: string | undefined) =>
    this.page.locator(`text=${username}`);

async isUsernameVisible(username: string | undefined): Promise<boolean> {
  return await this.usernameLabel(username).isVisible();
}

async navigateToRepositories(){
    this.repositoriesOption.click();
    await this.page.waitForTimeout(6000);
}

async isRepoPresent(username: string | undefined, repoName: string ): Promise<boolean> {
  await this.repoSearchField.fill(repoName);

  const repoLocator = this.page.getByRole('link', {
    name: `${username}/${repoName}`  });

  return await repoLocator.isVisible();
}

async navigateToHome(){
  await this.page.goto('https://github.com/dashboard');
  await this.page.waitForTimeout(5000);
}

async navigateToMyIssues(){
  await this.page.goto('https://github.com/issues/created');
  await this.page.waitForTimeout(5000);
}

}
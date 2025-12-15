import { Page, Locator } from '@playwright/test';

export class HomePage{
  readonly page: Page;
  readonly signInLink: Locator
  readonly loggedInWithUserIcon: Locator
  readonly loggedInWithUserDropdown: Locator
  readonly signOutLink: Locator; 
  readonly repositoriesIcon: Locator


  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByRole('link', {name: 'Sign in'})
    this.loggedInWithUserIcon = page.getByRole('button', { name: 'Open user navigation menu' })
    this.loggedInWithUserDropdown = page.getByRole('heading', { name: 'User navigation' }) 
    this.signOutLink = page.getByRole('link', {name: "Sign out"})
    this.repositoriesIcon = page.getByRole('link', {name: "Repositories"})
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
    this.repositoriesIcon.click();
}

}
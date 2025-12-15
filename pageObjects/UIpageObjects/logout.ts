import { Page, Locator} from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly signOutPageHeading : Locator 

  constructor(page: Page) {
    this.page = page;
    this.signOutPageHeading = page.getByText('Select account to sign out')
   
  }

  private signOutButton = (username: string | undefined) =>
    this.page.getByRole('button', {name: `Sign out of ${username}`});

  async signOut(username: string | undefined) {
    await this.signOutButton(username).click();
    }

}
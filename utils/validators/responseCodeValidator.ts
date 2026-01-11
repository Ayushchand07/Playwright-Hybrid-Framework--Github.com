import {expect} from 'playwright/test'

export class responseCodeValidator{
    static async validateResponseCode(response: any, responseCode: number){
    const responseBody = await response.json();
    expect(responseBody.responseCode).toBe(responseCode)
  }
}
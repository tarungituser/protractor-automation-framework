import { PageHelper } from '../../../components/html/page-helper';
import { browser } from 'protractor';

import { HomePageConstants } from './home-page.constants';

export class HomePageHelper {
  static async gotoDrupalHomePage() {
    await browser.get(await browser.baseUrl);
  }

  static async gotoUmbracoHomePage() {
    await PageHelper.getText(await HomePageConstants.fullDom);
  }

  static async getDrupalHomePageDOM() {
    return await PageHelper.getText(await HomePageConstants.fullDom);
  }

  static async getUmbracolHomePageDOM() {
    return await PageHelper.getText(await HomePageConstants.fullDom);
  }
}

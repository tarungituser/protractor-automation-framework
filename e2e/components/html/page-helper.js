/* eslint-disable import/no-extraneous-dependencies,no-unused-vars,no-undef,consistent-return,max-len,no-return-assign,no-underscore-dangle,no-restricted-syntax,no-await-in-loop,no-restricted-properties,no-empty,no-plusplus,no-mixed-operators */
/**
 * Page helper for general utility
 */
import { browser, protractor } from 'protractor';

import { JsHelper } from '../misc-utils/js-helper';

import { ElementHelper } from './element-helper';
import { WaitHelper } from './wait-helper';

const shortId = require('shortid');
const remote = require('selenium-webdriver/remote');

export class PageHelper {
    static MAX_RETRY_ATTEMPTS = 3;
    // noinspection JSValidateJSDoc
    /**
     * Timeout collection to meet various needs
     * @type {{xs; s; m; l; xl; xxl; xxxl}}
     */
    static timeout = {
      xxs: 1000,
      xs: 2000,
      s: 5000,
      m: 10000,
      l: 25000,
      xl: 50000,
      xxl: 75000,
      xxxl: 200000,
      xxxxl: 500000,
    };
    static DEFAULT_TIMEOUT = PageHelper.timeout.xxl;
    static EC = protractor.ExpectedConditions;

    static get isFullScreen() {
      const fullScreenScript = 'if (!window.screenTop && !window.screenY){return true;}'
            + 'else{return false;}';
      return browser.executeScript(fullScreenScript);
    }

    static actionKeyDown(key) {
      return browser.actions().keyDown(key).perform();
    }

    static async executeInIframe(index, fn) {
      await browser.switchTo().frame(index);
      fn();
      await browser.switchTo().defaultContent();
      await browser.waitForAngular();
    }

    static actionSendKeys(key) {
      return browser.actions().sendKeys(key).perform();
    }

    static async sendKeysToInputField(elem, key) {
      await elem.sendKeys(key);
    }

    static actionKeyUp(key) {
      return browser.actions().keyUp(key).perform();
    }

    static keyPressForBrowser(key) {
      return browser.actions().sendKeys(key).perform();
    }

    static actionMouseUp(location) {
      return browser.actions().mouseUp(location).perform();
    }

    // Known issue for chrome, direct maximize window doesn't work
    /**
     * To maximize the browser window
     */
    static async maximizeWindow() {
      return this.resizeWindow();
    }

    static async resizeHorizontally(height) {
      return this.resizeWindow(-1, height);
    }

    static async resizeVertically(width) {
      return this.resizeWindow(width);
    }

    /**
     * To resize the browser window
     */
    static async resizeWindow(width = -1, height = -1) {
      class Size {
            width;
            height;
      }

      const windowSize = await this.executeScript(() => ({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      }));

      const result = windowSize;
      if (width !== -1) {
        result.width = width;
      }

      if (height !== -1) {
        result.height = height;
      }

      return this.setWindowSize(result.width, result.height);
    }

    /**
     * Sets window size
     * @param {number} width
     * @param {number} height
     */
    static async setWindowSize(width, height) {
      return browser.driver
        .manage()
        .window()
        .setSize(width, height);
    }

    /**
     * Wrapper for executing javascript code
     * @param {string | Function} script
     * @param varAargs
     * @returns {promise.Promise<any>}
     */
    static async executeScript(script, ...varAargs) {
      return browser.driver.executeScript(script, varAargs);
    }

    /**
     * Wrapper to return an active element
     * @returns {WebElementPromise}

     static async getFocusedElement() {
    return browser.driver.switchTo().activeElement()
  } */

    /**
     * Switch to a new tab if browser has availability
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async switchToNewTabIfAvailable(windowNumber = 1) {
      const handles = await browser.getAllWindowHandles();
      const newWindowHandle = handles[windowNumber]; // this is your new window
      if (newWindowHandle) {
        await browser.switchTo().window(newWindowHandle);
      }
      const url = await browser.getCurrentUrl();

      // Avoiding bootstraping issue, Known issue
      // Error: Error while waiting for Protractor to sync with the page:
      // "window.angular is undefined. This could be either because this is a non-angular page or
      // because your test involves client-side navigation, which can interfere with Protractor's bootstrapping.
      // See http://git.io/v4gXM for details
      return browser.driver.get(url);
    }

    static async switchToFirstTab() {
      const handles = await browser.getAllWindowHandles();
      await browser.driver.close();
      await browser.switchTo().window(handles[0]);
    }

    /**
     * Gets html attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static async getAttributeValue(elem, attribute) {
      await WaitHelper.waitForElementToBeDisplayed(elem);
      const attributeValue = await elem.getAttribute(attribute);
      return attributeValue.trim();
    }

    /**
     * Click on element
     * @param {ElementFinder} targetElement
     * @returns {any}
     */
    static async click(targetElement) {
      await WaitHelper.waitForElementToBeClickable(targetElement);
      return targetElement.click();
    }

    static async clickIfPresent(targetElement) {
      const isPresent = await targetElement.isPresent();
      if (isPresent) {
        return this.click(targetElement);
      }
    }

    /**
     * Click on the element and wait for it to get hidden
     * @param {ElementFinder} targetElement
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    static async clickAndWaitForElementToHide(targetElement) {
      await WaitHelper.waitForElementToBeClickable(targetElement);
      await targetElement.click();
      return WaitHelper.waitForElementToBeHidden(targetElement);
    }

    /**
     * Click on element if displayed
     * @param {ElementFinder} targetElement
     * @param withoutJs
     * @returns {any}
     */
    static async clickIfDisplayed(targetElement, withoutJs = true) {
      const isPresent = await targetElement.isPresent();
      if (isPresent === true) {
        const isDisplayed = await targetElement.isDisplayed();
        if (isDisplayed === true) {
          if (withoutJs) {
            await PageHelper.click(targetElement);
          } else {
            await ElementHelper.clickUsingJs(targetElement);
          }
        }
      }
    }

    static async getTextWithNoWait(elem) {
      const text = await elem.getText();
      return text;
    }

    /**
     * Gets promise for current url
     * @returns {any}
     */
    static async currentUrl() {
      return browser.getCurrentUrl();
    }

    static async getPageTitle() {
      return await browser.getTitle();
    }

    /**
     * Refresh a page
     *
     */
    static async refreshPage() {
      await browser.refresh();
    }

    static async switchToFrame(frameEle) {
      return browser.driver.switchTo().frame(frameEle.getWebElement());
    }

    /**
     * Verify whether element is hidden on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @returns {Promise<any>}
     */
    static async isElementHidden(targetElement, toWait = true) {
      if (toWait) {
        return browser.wait(async () =>
          !(await targetElement.isPresent()) || !(await targetElement.isDisplayed())).then(() => true).catch(() => false);
      }
      return !(await targetElement.isPresent()) || !(await targetElement.isDisplayed());
    }

    /**
     * Verify whether element is displayed on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static async isElementDisplayed(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
      let caughtException = false;
      if (toWait) {
        await WaitHelper.waitForElementToBeDisplayed(targetElement, timeout)
          .catch(() => caughtException = true);
      }
      return !caughtException && await targetElement.isDisplayed();
    }

    /**
     * Verify whether element is present on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static async isElementPresent(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
      let caughtException = false;
      if (toWait) {
        await WaitHelper.waitForElementToBePresent(targetElement, timeout)
          .catch(() => caughtException = true);
      }
      return !caughtException && await targetElement.isPresent();
    }

    /**
     * Verify whether element is enabled on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static async isElementEnabled(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
      let caughtException = false;
      if (toWait) {
        await WaitHelper.waitForElementToBeEnabled(targetElement, timeout)
          .catch(() => caughtException = true);
      }
      return !caughtException && await targetElement.isEnabled();
    }

    /**
     * Verify whether element is selected on page or not
     * @param {ElementFinder} targetElement
     * @param {boolean} toWait
     * @param {number} timeout
     * @returns {Promise<boolean>}
     */
    static async isElementSelected(targetElement, toWait = true, timeout = PageHelper.DEFAULT_TIMEOUT) {
      let caughtException = false;
      if (toWait) {
        await WaitHelper.waitForElementToBeSelected(targetElement, timeout)
          .catch(() => caughtException = true);
      }
      return !caughtException && await targetElement.isSelected();
    }

    static isListSorted(sourceList, isAscending) {
      let isSorted = true;
      const sortList = Object.assign([], sourceList);
      sortList.sort((a, b) => (((a < b) === isAscending) ? -1 : 1));
      for (let i = 0; i < sourceList.length; i++) {
        if (sourceList[i] !== sortList[i]) {
          isSorted = false;
          break;
        }
      }
      return isSorted;
    }

    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    static async getAllTexts(elements) {
      const allTexts = await elements.getText();
      return allTexts;
    }

    static async getText(elem) {
      await WaitHelper.waitForElementToBePresent(elem);
      await browser.wait(async () => (await elem.getText()).trim() !== '').catch(() => false);
      const text = await elem.getText();
      return text.trim();
    }

    static async getAllTextsInArray(elements) {
      const allTexts = await PageHelper.getAllTexts(elements);
      return JsHelper.cleanArray(allTexts);
    }

    static async switchToiFrame(frameOrIframeElement, sleepTime = PageHelper.timeout.xs) {
      await browser.waitForAngularEnabled(false);
      await WaitHelper.waitForElementToBeDisplayed(frameOrIframeElement);
      // Wait is needed to load the iframe properly
      await browser.sleep(sleepTime);
      return await browser.switchTo().frame(frameOrIframeElement.getWebElement());
    }

    static async switchToDefaultContent() {
      await browser.switchTo().defaultContent();
      await browser.waitForAngularEnabled(true);
    }

    static async acceptAlert() {
      return await browser.switchTo().alert().accept();
    }

    static async closeAlertIfPresent() {
      try {
        await browser.sleep(PageHelper.timeout.xs);
        await browser.switchTo().alert().accept().then(null, async () => {
          await browser.sleep(PageHelper.timeout.xs);
        });
      } catch (e) {
      }
    }

    static getUniqueId(size = 8) {
      // noinspection reason: Giving error for unknown character function
      // noinspection Annotator
      shortId.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_');
      return shortId.generate().replace(/-/g, '').replace(/_/g, '').substr(0, size);
    }

    static getUniqueIdForCategory(length) {
      return Math.random().toString(36).substr(2, length);
    }

    static getUniqueIdWithAlphabetsOnly(size = 8) {
      return this.getUniqueId().replace(/[0-9]/g, '').substr(0, size);
    }

    static getUniqueIntId(size = 6) {
      // noinspection reason: Giving error for unknown character function
      // noinspection Annotator
      return Math.floor(Math.pow(10, size - 1) + Math.random() * 9 * Math.pow(10, size - 1)).toString();
    }

    static async uploadFile(item, filePath) {
      browser.setFileDetector(new remote.FileDetector());
      await WaitHelper.waitForElementToBePresent(item);
      await item.sendKeys(filePath);
    }

    static async getAlertText(timeout = PageHelper.DEFAULT_TIMEOUT, message = 'Alert is not present') {
      await this.waitForAlertToBePresent(timeout, message);
      return await browser.driver.switchTo().alert().getText();
    }

    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    static async waitForAlertToBePresent(timeout = PageHelper.DEFAULT_TIMEOUT, message = 'Alert is not present') {
      return await browser.wait(this.EC.alertIsPresent(), timeout, message);
    }

    static async sleepForXSec(milliseconds) {
      await browser.sleep(milliseconds);
    }

    static async randomString(size) {
      let text = '';
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < size; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    static numberFromString(text) {
      return Number(text.replace(/\D+/g, ''));
    }

    /**
     * Gets innertext for all the elements
     * @param {WebElementPromise} elements
     * @returns {string} inner text
     */
    static async getAllTextsInLowerCase(elements) {
      const allTexts = [];
      const allItems = await elements.asElementFinders_();
      for (const elem of allItems) {
        const elementText = await this.getText(elem);
        allTexts.push(elementText.toLowerCase());
      }
      return allTexts;
    }

    static async replaceSpaceWithMinus(text) {
      return text.replace(/\s+/g, '-');
    }

    /**
     * Gets CSS attribute value
     * @param {WebElementPromise} elem
     * @param {string} attribute
     * @returns {string} attribute value
     */
    static async getCssValue(elem, attribute) {
      await WaitHelper.waitForElementToBeDisplayed(elem);
      const attributeValue = await elem.getCssValue(attribute);
      return attributeValue.trim();
    }
}

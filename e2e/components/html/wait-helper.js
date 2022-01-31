/* eslint-disable no-empty */
import { browser, protractor } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';

import { PageHelper } from './page-helper';

export class WaitHelper {
    static EC = protractor.ExpectedConditions;

    static assertionHandler(error) {
      if (browser.params.softAssertions) {
        return false;
      }
      throw error;
    }

    /**
     * Default timeout for promises
     * @type {number}
     */
    /**
     * Wait for an element to exist
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElement(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element should exist',
    ) {
      VerboseLogger.logSelector(timeout, targetElement, 'exist');
      return browser.wait(
        this.EC.presenceOf(targetElement),
        timeout, targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    /**
     * Wait for an element to display
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeDisplayed(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element should be visible',
    ) {
      VerboseLogger.logSelector(timeout, targetElement, 'be visible');
      return browser.wait(
        this.EC.visibilityOf(targetElement),
        timeout,
        targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    /**
     * Wait for an element to present
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBePresent(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element should be visible',
    ) {
      VerboseLogger.logSelector(timeout, targetElement, 'be present');
      return browser.wait(
        this.EC.presenceOf(targetElement),
        timeout,
        targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    /**
     * Wait for an element to hide
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeHidden(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element should not be visible',
    ) {
      VerboseLogger.logSelector(timeout, targetElement, 'be invisible');
      return browser.wait(
        this.EC.invisibilityOf(targetElement),
        timeout, targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    /**
     * Wait for an element to become clickable
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     */
    static async waitForElementToBeClickable(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element not clickable',
    ) {
      VerboseLogger.logSelector(timeout, targetElement, 'be clickable');
      try {
        await browser.wait(
          this.EC.elementToBeClickable(targetElement),
          timeout,
          targetElement.locator().toString() + message,
        );
      } catch (e) {
      }
    }

    static async waitForElementToHaveText(targetElement, timeout = PageHelper.DEFAULT_TIMEOUT, message = '') {
      await this.waitForElementToBePresent(targetElement);
      VerboseLogger.logSelector(timeout, targetElement, 'have text');
      return await browser.wait(
        async () => (await targetElement.getText()).trimLeft().trimRight() !== '',
        timeout, message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    // eslint-disable-next-line max-len
    static async waitForElementOptionallyPresent(targetElement, timeout = PageHelper.DEFAULT_TIMEOUT) {
      const isDisplayed = this.EC.presenceOf(targetElement);
      return browser.wait(isDisplayed, timeout).then(() => true, () => false);
    }

    /**
     * Wait for an element to be enabled
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeEnabled(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element not enabled',
    ) {
      return await browser.wait(
        targetElement.isEnabled(), timeout,
        targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }

    /**
     * Wait for an element to be selected
     * @param {ElementFinder} targetElement
     * @param {number} timeout
     * @param {string} message
     * @returns {any}
     */
    static async waitForElementToBeSelected(
      targetElement,
      timeout = PageHelper.DEFAULT_TIMEOUT,
      message = 'Element not selected',
    ) {
      return await browser.wait(
        targetElement.isSelected(), timeout,
        targetElement.locator().toString() + message,
      )
        .then(() => true, error => this.assertionHandler(error));
    }
}

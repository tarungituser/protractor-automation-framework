/* eslint-disable max-len */
import { browser } from 'protractor';

import { StepLogger } from '../../../core/logger/step-logger';
import { ElementHelper } from '../html/element-helper';
import { PageHelper } from '../html/page-helper';

import { ValidationsHelper } from './validation-helper';

export class ExpectationHelper {
  /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param refresh
     * @returns {Promise<void>}
     */
  static async verifyDisplayedStatus(targetElement, elementName, refresh = true) {
    StepLogger.subVerification(`${elementName} should display`);
    const isDisplayed = await PageHelper.isElementDisplayed(targetElement);
    if (!isDisplayed && refresh) {
      await browser.refresh();
      await this.verifyDisplayedStatus(targetElement, elementName, false);
      return;
    }
    await expect(await PageHelper.isElementDisplayed(targetElement))
      .toBe(
        true,
        ValidationsHelper.getDisplayedValidation(elementName),
      );
  }

  /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyPageNavigation(targetElement, elementName) {
    StepLogger.subVerification(`Page - ${elementName} should display`);
    await expect(await PageHelper.isElementDisplayed(targetElement))
      .toBe(
        true,
        ValidationsHelper.getPageDisplayedValidation(elementName),
      );
  }

  /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyNotDisplayedStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should not display`);
    await expect(await PageHelper.isElementPresent(targetElement, false))
      .toBe(false, ValidationsHelper.getNotDisplayedValidation(elementName));
  }

  /**
     * Verify whether an element is displayed or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyElementPresentStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should present`);
    await expect(await PageHelper.isElementPresent(targetElement))
      .toBe(
        true,
        ValidationsHelper.getPresentValidation(elementName),
      );
  }

  /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param toWait
     * @returns {Promise<void>}
     */
  static async verifyHiddenStatus(targetElement, elementName, toWait = true) {
    StepLogger.subVerification(`${elementName} should be hidden`);
    await expect(await PageHelper.isElementHidden(targetElement, toWait))
      .toBe(
        true,
        ValidationsHelper.getHiddenValidation(elementName),
      );
  }

  /**
     * Verify whether an element is hidden or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyRemovedStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should be removed`);
    await expect(await PageHelper.isElementHidden(targetElement))
      .toBe(
        true,
        ValidationsHelper.getHiddenValidation(elementName),
      );
  }

  /**
     * Verify whether an element is enabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyEnabledStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should be enabled`);
    await expect(await PageHelper.isElementEnabled(targetElement))
      .toBe(
        true,
        ValidationsHelper.getEnabledValidation(elementName),
      );
  }

  /**
     * Verify whether an element is present or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyPresentStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should present`);
    await expect(await PageHelper.isElementPresent(targetElement))
      .toBe(
        true,
        ValidationsHelper.getPresentValidation(elementName),
      );
  }

  /**
     * Verify whether an element is enabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifySelectedStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should be selected`);
    await expect(await PageHelper.isElementSelected(targetElement))
      .toBe(
        true,
        ValidationsHelper.getSelectedValidation(elementName),
      );
  }

  /**
     * Verify whether an element is disabled or not
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @returns {Promise<void>}
     */
  static async verifyDisabledStatus(targetElement, elementName) {
    StepLogger.subVerification(`${elementName} should be disabled`);
    await expect(await PageHelper.isElementEnabled(targetElement))
      .toBe(
        false,
        ValidationsHelper.getDisabledValidation(elementName),
      );
  }

  /**
     * Verify that element has the exact text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @returns {Promise<void>}
     */
  static async verifyText(targetElement, elementName, expectedValue) {
    StepLogger.subVerification(`${elementName} should have exact text as ${expectedValue} `);
    const value = (await ElementHelper.getText(targetElement)).toLowerCase().trim();
    await expect(value)
      .toBe(
        expectedValue.toLowerCase().trim(),
        ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, value),
      );
  }

  /**
     * Verify that value is grater than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyValueGraterThan(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should be grater than ${expectedValue} value`);
    await expect(actualValue).toBeGreaterThan(expectedValue, ValidationsHelper.getGreaterThanValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that value is less or equal than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyValueLessOrEqualTo(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should be less ot equal to ${expectedValue} value`);
    await expect(actualValue).toBeLessThanOrEqual(expectedValue, ValidationsHelper.getLessThanOrEqualToValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that value is less or equal than other value
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyValueGreaterOrEqualTo(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should be greater or equal to ${expectedValue} value`);
    await expect(actualValue).toBeGreaterThanOrEqual(expectedValue, ValidationsHelper.getGreaterThanOrEqualToValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that checkbox is checked
     * @param targetElement
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyCheckBoxNotSelected(targetElement, elementName) {
    const actualValue = await targetElement.isSelected();
    StepLogger.subVerification(`${elementName} should not be selected`);
    await expect(actualValue).toEqual(false, ValidationsHelper.getUnSelectedValidation(elementName));
  }

  /**
     * Verify that attribute values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param attribute
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyAttributeValue(targetElement, attribute, expectedValue, elementName) {
    const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
    StepLogger.subVerification(`${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue).toEqual(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that attribute values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param attribute
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyAttributeValueNotToBe(
    targetElement,
    attribute,
    expectedValue,
    elementName,
  ) {
    const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
    StepLogger.subVerification(`${actualValue} should not be equal to  ${expectedValue} value`);
    await !expect(actualValue).not.toBe(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that value is equal to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyStringValueEqualTo(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue).toEqual(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that value contains to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyStringValueContain(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`'${actualValue}' should contains  '${expectedValue}' value`);
    await expect(actualValue).toContain(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that value not contains to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyStringValueNotContain(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`'${actualValue}' should not contains '${expectedValue}' value`);
    await expect(actualValue).not.toContain(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that actual value contains expected value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyActualValueContainsExpectedValue(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should contain ${expectedValue} value`);
    await expect(actualValue).toContain(
      expectedValue.toLowerCase(),
      ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName),
    );
  }

  /**
     * Verify that element contains text
     * @param {ElementFinder} targetElement
     * @param {string} elementName
     * @param {string} expectedValue
     * @returns {Promise<void>}
     */
  static async verifyContainsText(targetElement, elementName, expectedValue) {
    StepLogger.subVerification(`${elementName} should have contains text as ${expectedValue} `);
    await expect((await ElementHelper.getText(targetElement)).toLowerCase())
      .toContain(
        expectedValue.toLowerCase(),
        ValidationsHelper.getFieldShouldHaveValueValidation(elementName, expectedValue, elementName),
      );
  }

  /**
     * Verify that value is not equal to other value
     * @param {string} actualValue
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyStringValueNotEqualTo(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue).not.toBe(expectedValue, ValidationsHelper.getInequalityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that String is equal to other String
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyEquality(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue).toEqual(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that String is not equal to other String
     * @param {number} actualValue
     * @param {number} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyInequality(actualValue, expectedValue, elementName) {
    StepLogger.subVerification(`Field ${elementName} - ${actualValue} should not be equal to  ${expectedValue} value`);
    await expect(actualValue)
      .not.toBe(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that CSS values is equal to expected Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyCssAttributeValue(targetElement, attribute, expectedValue, elementName) {
    const actualValue = await PageHelper.getCssValue(targetElement, attribute);
    StepLogger.subVerification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue).toEqual(expectedValue, ValidationsHelper.getEqualityValidation(actualValue, expectedValue, elementName));
  }

  /**
     * Verify that attribute values contains expected Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyAttributeContains(targetElement, attribute, expectedValue, elementName) {
    const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
    StepLogger.subVerification(`Field ${elementName} - ${actualValue} should contain  ${expectedValue} value`);
    await expect(actualValue)
      .toContain(
        expectedValue,
        ValidationsHelper.getNotContainsValidation(actualValue, expectedValue, elementName),
      );
  }

  /**
     * Verify that attribute values does not contain Value
     * @param targetElement
     * @param attribute
     * @param {string} expectedValue
     * @param elementName
     * @returns {Promise<void>}
     */
  static async verifyAttributeNotContains(targetElement, attribute, expectedValue, elementName) {
    const actualValue = await PageHelper.getAttributeValue(targetElement, attribute);
    StepLogger.subVerification(`Field ${elementName} - ${actualValue} should be equal to  ${expectedValue} value`);
    await expect(actualValue)
      .not.toContain(expectedValue, ValidationsHelper.getContainsValidation(actualValue, expectedValue, elementName));
  }

  static async isListSortedAscending(sourceList, elementName) {
    await expect(await PageHelper.isListSorted(sourceList, true))
      .toBe(
        true,
        ValidationsHelper.getAscendingSortedValidation(elementName),
      );
  }

  static async isListSortedDescending(sourceList, elementName) {
    await expect(await PageHelper.isListSorted(sourceList, false))
      .toBe(
        true,
        ValidationsHelper.getDescendingSortedValidation(elementName),
      );
  }
}

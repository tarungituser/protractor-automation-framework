export class ValidationsHelper {
  static get types() {
    return {
      field: 'Field',
      dropDown: 'Drop down',
      page: 'Page',
      button: 'Button',
      label: 'Label',
      image: 'Image',
      window: 'Window',
      notification: 'Notification',
      grid: 'Grid',
      menu: 'Menu',
      link: 'Link',
    };
  }

  static getOnlyOneRecordShouldBeDisplayed(type, title) {
    return `There should only be 1 record displayed in ${type} with title ${title}`;
  }

  static getFieldShouldHaveValueValidation(fieldLabel, value, name) {
    return this.getFieldValueValidation(fieldLabel, value, name);
  }

  static getFieldShouldNotHaveValueValidation(fieldLabel, value) {
    return this.getFieldValueValidation(fieldLabel, value, 'not');
  }

  static getFieldValueValidation(fieldLabel, value, status) {
    return `${this.types.field} ${fieldLabel} should ${status} have value as ${value}`;
  }

  static getNoOptionDisplayed(fieldLabel) {
    return `${this.types.dropDown} ${fieldLabel} should not have any option displayed`;
  }

  static getOptionDisplayed(fieldLabel, optionLabel) {
    return `${this.types.dropDown} ${fieldLabel} should display option with text ${optionLabel}`;
  }

  static getPageDisplayedValidation(name) {
    return `${this.types.page} ${this.getDisplayedValidation(name)}`;
  }

  static getFieldDisplayedValidation(name) {
    return `${this.types.field} ${this.getDisplayedValidation(name)}`;
  }

  static getButtonDisplayedValidation(name) {
    return `${this.types.button} ${this.getDisplayedValidation(name)}`;
  }

  static getButtonDisabledValidation(name) {
    return `${this.types.button} ${this.getDisabledValidation(name)}`;
  }

  static getMenuDisplayedValidation(name) {
    return `${this.types.menu} ${this.getDisplayedValidation(name)}`;
  }

  static getMenuShouldNotBeDisplayedValidation(name) {
    return `${this.types.menu} ${this.getNotDisplayedValidation(name)}`;
  }

  static getMenuExpandedValidation(name) {
    return `${this.types.menu} ${name} should be expanded`;
  }

  static getMenuCollapsedValidation(name) {
    return `${this.types.menu} ${name} should be shrinked`;
  }

  static getMenuShouldNotHaveChildValidation(name) {
    return `${this.types.menu} "${name}" should not have children`;
  }

  static getLabelDisplayedValidation(name) {
    return `${this.types.label} '${this.getDisplayedValidation(name)}'`;
  }

  static getImageDisplayedValidation(name) {
    return `${this.types.image} '${this.getDisplayedValidation(name)}'`;
  }

  static getGridDisplayedValidation(name) {
    return `${this.types.grid} ${this.getDisplayedValidation(name)}`;
  }

  static getDeletionConfirmationDisplayedValidation(recordText) {
    return `Confirmation box for deletion of record which contains ${this.getDisplayedValidation(recordText)}`;
  }

  static getRecordContainsMessage(message) {
    return `Record which contains ${message}`;
  }

  static getDisplayedValidation(name) {
    return `${name} should be displayed`;
  }

  static getSortedValidation(order, name) {
    return `Column ${name} must be sorted in ${order} order`;
  }

  static getAscendingSortedValidation(name) {
    return this.getSortedValidation(name, 'ascending');
  }

  static getDescendingSortedValidation(name) {
    return this.getSortedValidation(name, 'descending');
  }

  static getDisabledValidation(name) {
    return `${name} should be disabled`;
  }

  static getEnabledValidation(name) {
    return `${name} should be enabled`;
  }

  static getEnabledButtonValidation(name) {
    return `${name} should be enabled`;
  }

  static getNotEnabledButtonValidation(name) {
    return `${name} should not be enabled`;
  }

  static getDisabledButtonValidation(name) {
    return `${name} should be disabled`;
  }

  static getErrorDisplayedValidation(error) {
    return `Error ${this.getDisplayedValidation(error)}`;
  }

  static getErrorDisplayedValidationForField(field, error) {
    return `Error ${this.getDisplayedValidation(error)} for field ${field}`;
  }

  static getWindowShouldNotBeDisplayedValidation(name) {
    return `${this.types.window} ${this.getNotDisplayedValidation(name)}`;
  }

  static getNotificationDisplayedValidation(name) {
    return `${this.types.notification} ${this.getDisplayedValidation(name)}`;
  }

  static getHttpStatusCodeValidation(statusCode) {
    return `Http response code should be ${statusCode}`;
  }

  static getHttpResponseBodyValidation(content) {
    return `Http response body should contain ${content}`;
  }

  static getNotDisplayedValidation(name) {
    return `${name} should not be displayed`;
  }

  static getOnlyOneRecordShouldBeDisplayedInGrid(name) {
    return this.getOnlyOneRecordShouldBeDisplayed(this.types.dropDown, name);
  }

  static getOnlyOneRecordShouldBeDisplayedInDropDown(name) {
    return this.getOnlyOneRecordShouldBeDisplayed(this.types.grid, name);
  }

  static getMessageDisplayedValidation(msg) {
    return `Message ${this.getDisplayedValidation(msg)}`;
  }

  static getLinkDisplayedValidation(name) {
    return `${this.types.link} ${this.getDisplayedValidation(name)}`;
  }

  static getLinkNotDisplayedValidation(name) {
    return `${this.types.link} ${this.getNotDisplayedValidation(name)}`;
  }

  static getCheckedValidation(name) {
    return `${name} should be checked`;
  }

  static getElementDisplayedValidation(name) {
    return `${name} element should be displayed`;
  }

  static getIconDisplayedValidation(name) {
    return `Icon ${this.getDisplayedValidation(name)}`;
  }

  static getIconNotDisplayedValidation(name) {
    return `Icon ${this.getNotDisplayedValidation(name)}`;
  }

  static getFieldHasValueValidation(fieldLabel, value) {
    return `Field ${fieldLabel} has value as ${value}`;
  }

  static getFieldDoesNotHaveValueValidation(fieldLabel, value) {
    return `Field ${fieldLabel} does not have value as ${value}`;
  }

  static getAlertHasMessage(message) {
    return `Alert box has message ${message}`;
  }

  static getPresentValidation(name) {
    return `${name} should be present`;
  }

  static getNotPresentValidation(name) {
    return `${name} should not be present`;
  }

  static getSelectedValidation(name) {
    return `${name} should be selected`;
  }

  static getUnSelectedValidation(name) {
    return `${name} should be unselected`;
  }

  static getGreaterThanValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should be grater than ${expectedValue}`;
  }

  static getLessThanOrEqualToValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should be less than or equal ${expectedValue}`;
  }

  static getGreaterThanOrEqualToValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should be greater than or equal ${expectedValue}`;
  }

  static getEqualityValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should be equal to ${expectedValue}`;
  }

  static getInequalityValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should be not be equal to ${expectedValue}`;
  }

  static getContainsValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should contain ${expectedValue}`;
  }

  static getNotContainsValidation(actualValue, expectedValue, elementName) {
    return `Field name - ${elementName} : ${actualValue} should not contain ${expectedValue}`;
  }

  static getHiddenValidation(name) {
    return `${name} should be hidden`;
  }
}

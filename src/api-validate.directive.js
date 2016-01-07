import angular from 'angular';
export const name = 'nmApiValidate';

/**
 * @ngdoc directive
 * @name nmApiValidate
 * @module naturalartmedia.api-validation
 *
 * @description
 * *
 * @usage
 * ```html
 * ```
 */

/*@ngInject*/
export default function nmApiValidate($log) {
  let directive = {
    require: 'ngModel',
    restrict: 'A',
    link: postLink
  };

  return directive;



  function postLink(scope, element, attrs, model) {
    // expose interface to register API error for this field
    model.$registerApiError = registerApiError.bind(model);
    // add validator to validation loop, that will remove current API errors
    model.$validators.apiValidate = apiValidator.bind(model);
    // make a place to store errors
    model.$nmApiErrors = [];
  }


  function apiValidator() {
    // validation loop, remove all field api errors
    while (this.$nmApiErrors.length) {
      this.$setValidity(this.$nmApiErrors.shift(), true);
    }
    // this is a fake validator, just return true
    return true;
  }


  function registerApiError(code) {
    this.$nmApiErrors.push(code);
    this.$setValidity(code, false);
  }
} //nmApiValidate

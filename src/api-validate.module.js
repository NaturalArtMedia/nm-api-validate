import angular from 'angular';

import * as apiValidationService from './api-validation.service';
import * as apiFormValidateDirective from './api-form-validate.directive';
import * as apiValidatateDirective from './api-validate.directive';

export default angular.module('naturalartmedia.api-validation', ['ng'])
  .factory(apiValidationService.name, apiValidationService.default)
  .directive(apiFormValidateDirective.name, apiFormValidateDirective.default)
  .directive(apiValidatateDirective.name, apiValidatateDirective.default)
  .name;

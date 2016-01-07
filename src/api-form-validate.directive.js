import angular from 'angular';
export const name = 'nmApiFormValidate';

/**
 * @ngdoc directive
 * @name nmApiFormValidate
 * @module naturalartmedia.validation.api
 *
 * @description
 * *
 * @usage
 * ```html
 * ```
 */

/*@ngInject*/
export default function nmApiFormValidate($log, $nmApiValidationService) {
  let directive = {
    require: 'form',
    restrict: 'A',
    link: postLink,
  };

  return directive;

  function postLink(scope, element, attrs, formCtrl) {
    let watchPromise = attrs.nmApiFormValidate;
    if(watchPromise !== undefined){
      scope.$watch(watchPromise, formSubmitted.bind(null, formCtrl));
    }
  }


  function formSubmitted(formCtrl, promise) {
    if(!promise || !promise.then) {
      return;
    }
    $nmApiValidationService.reset(formCtrl);
    promise.catch(resp => $nmApiValidationService.applyErrors(formCtrl, resp);
  }
} //nmApiForm

import angular from 'angular';
export const name = '$nmApiValidationService';

/*@ngInject*/
export default function $nmApiValidationService($log) {
  let service = {
    applyErrors: applyErrors,
    applyError: applyError,
    reset: reset,
    setValidity: setValidity
  };

  return service;


  function applyErrors(formCtrl, resp) {
    let data = resp.data;
    let apiError = (formCtrl.$api || reset(formCtrl)).$error;
    if (!data) {
      // no data returned, fallback to system error
      setValidity(formCtrl, false);
      apiError.system_error = [true];
    } else if (data.errors) {
      let errors = data.errors;
      setValidity(formCtrl, false);
      // for loop loop through the model errors
      for (let i = 0; i < errors.length; i++) {
        let currentError = errors[i];
        if (typeof currentError === 'object') {
          // It's an error for a specific field
          // for loop - when the server puts all fields in one object and we need to find the properties
          for (let key in currentError) {
            applyError(formCtrl, key, currentError[key]);
          }
        } else {
          // It's an error on the general data model (form)
          apiError[currentError] = [true];
        }
      }
    } else {
      $log.warn('Server error: Data returned, but no error structure');
    }
  }


  function applyError(formCtrl, field, errors) {
    // Ensure errors in an array for loop below
    errors = _.isArray(errors) ? errors : [errors];
    // $log.debug('applyError called: ', field,  errors);
    let apiError = (formCtrl.$api || reset(formCtrl)).$error;
    if (!formCtrl[field] || !formCtrl[field].$registerApiError) {
      // field is not able to handle API errors
      $log.warn('Form Field ', field, 'does not handle API errors - putting them on the form');
      setValidity(formCtrl, false);
      for (let i = 0; i < errors.length; i++) {
        if (!apiError[errors[i]]) { apiError[errors[i]] = []; }
        apiError[errors[i]].push(field);
      }
    } else {
      // field exists and is able to handle API errors
      $log.debug('Setting errors:', errors, 'on field:', field);
      for (let i = 0; i < errors.length; i++) {
        formCtrl[field].$registerApiError(errors[i]);
      }
    }
  }


  function reset(formCtrl){
    formCtrl.$api = {
      $error: {},
      $invalid: false,
      $valid: true
    };
    return formCtrl.$api;
  }


  function setValidity(formCtrl, valid){
    let formApi = formCtrl.$api || reset(formCtrl);
    formApi.$invalid = !valid;
    formApi.$valid = valid;
  }
} //$nmApiFormService

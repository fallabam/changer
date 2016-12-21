angular.module('exceptionOverride', [])
.factory('$exceptionHandler', function($log) {
  return function myExceptionHandler(exception, cause) {
      // logErrorsToBackend(exception, cause);
      $log.warn(exception, cause);
    };
});

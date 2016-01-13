(function() {
  'use strict';

  angular
      .module('app.default')
      .filter('dueIn', dueIn);

  function dueIn() {
    return dueInFilter;

    ////////////////

    function dueInFilter(input) {
      var now = new Date();
      var due = (input - now.getTime()) / 60000;
      return due < 1 ? 'due' : parseInt(due, 10) + (parseInt(due, 10) === 1 ? ' min' : ' mins');
    }
  }

})();
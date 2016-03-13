/**
 * Created by 310031267 on 2016/3/13.
 */

(function(){
  'use strict' ;
  angular.module('starter').factory('projects', projects) ;

  projects.$inject = ['$window'] ;
  function projects($window){
    var service = {
      all: all ,
      save: save,
      newProject: newProject,
      getLastActiveIndex: getLastActiveIndex,
      setLastActiveIndex: setLastActiveIndex
    };
    return service ;

    function all(){
      var projectString = $window.localStorage['PROJECTS'] ;
      if (projectString) {
        return angular.fromJson(projectString) ;
      }
      return [] ;
    }

    function save(projects){
      $window.localStorage['PROJECTS'] = angular.toJson(projects) ;
    }

    function newProject(projectTitle){
      return {
        title: projectTitle,
        tasks: []
      }
    }

    function getLastActiveIndex(){
      return parseInt($window.localStorage['LAST_ACTIVE_PROJECT']) || 0 ;
    }

    function setLastActiveIndex(index){
      $window.localStorage['LAST_ACTIVE_PROJECT'] = index ;
    }
  }
})();

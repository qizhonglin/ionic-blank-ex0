/**
 * Created by 310031267 on 2016/3/13.
 */
(function(){
  'user strict';
  angular.module('starter').controller('ProjectsController', ProjectsController) ;

  ProjectsController.$inject = ['$scope', '$ionicModal', '$timeout', 'projects', '$ionicSideMenuDelegate'];
  function ProjectsController($scope, $ionicModal, $timeout, projects, $ionicSideMenuDelegate){
    $scope.projects = {};
    $scope.activeProject = {} ;

    $scope.toggleProjects = toggleProjects ;
    $scope.newProject = newProject;
    $scope.selectProject = selectProject ;

    $scope.taskModal = {};
    $scope.createTask = createTask;
    $scope.newTask = newTask;
    $scope.closeNewTask = closeNewTask;

    activate();

    function activate() {
      $scope.projects = projects.all();

      $scope.activeProject = $scope.projects[projects.getLastActiveIndex()];

      $ionicModal.fromTemplateUrl('js/projects/new-task.html', function (modal) {
        $scope.taskModal = modal;
      }, {scope: $scope, animation: 'slide-in-up'});

      $timeout(function () {
        if ($scope.projects.length == 0) {
          while (true) {
            var projectTitle = prompt('Your first project title:');
            if (projectTitle) {
              createProject(projectTitle);
              break;
            }
          }
        }
      });
    };

    function newProject() {
      var projectTitle = prompt('Project name');
      if (projectTitle) {
        createProject(projectTitle);
      }
    }

    function toggleProjects(){
      $ionicSideMenuDelegate.toggleLeft() ;
    }

    function createProject(projectTitle) {
      var newProject = projects.newProject(projectTitle);
      $scope.projects.push(newProject);
      projects.save($scope.projects);
      $scope.selectProject(newProject, $scope.projects.length - 1);
    }

    function selectProject(project, index) {
      $scope.activeProject = project;
      projects.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    }

    function createTask(task) {
      if (!$scope.activeProject || !task) {
        return;
      }
      $scope.activeProject.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();
      projects.save($scope.projects);
      task.title = "";
    };

    function newTask() {
      $scope.taskModal.show();
    };

    function closeNewTask() {
      $scope.taskModal.hide();
    };
  }

})() ;

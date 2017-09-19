var app = angular.module('myApp', ["ui.router"]);

app.factory('students', function ($http) {

  function getStudents(callback) {
    $http({
      method: 'GET',
      url: 'students.json',
      cache: false
    }).then(callback);
  };

  return {
    list : getStudents
  }
});

app.config(function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "templates/home.html",
      controller: function ($scope, students) {
        students.list(function (response) {
          $scope.students = response.data;
        });
      }

    })
    .state('new-rp', {
      url: '/new/:lastName',
      templateUrl: "templates/student.html",
      controller: function ($scope, students, $stateParams) {
        $scope.lastName = $stateParams.lastName;
        students.list(function (response) {
          $scope.students = response.data;
          for (var i = 0; i < $scope.students.length; i++) {
            if($scope.students[i].lastName == $scope.lastName ) {
              $scope.student = $scope.students[i];
              console.log($scope.student);
            }
           }
        });

          $scope.editing = false;  

          $scope.edit = function() {
            $scope.editing = true;
          }

          $scope.save = function() {
            $scope.editing = false;
          }   
    }
});
});
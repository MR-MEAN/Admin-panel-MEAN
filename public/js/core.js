var scotchTodo = angular.module('scotchTodo', ['ngRoute','angularFileUpload']);
//
//
scotchTodo.config(
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/default.html'
        }).
        when('/addUsers/:id', {
            templateUrl: 'views/addUsers.html'
        }).
        when('/userProfile', {
            templateUrl: 'views/userProfile.html'
        }).
        otherwise({
            redirectTo: '/'
        })
  });
//
//
  scotchTodo.controller('UserController',function($scope,$http,$rootScope,$location){
	$scope.Users = [];
	$scope.xyz = 'asd';
	$http.get('/api/users')
		.success(function(data) {
			$scope.Users = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$scope.remove = function(user){
		var idx = $scope.Users.indexOf(user);
		var id = $scope.Users[idx]._id;
		$http.delete('/api/delete/' + id)
			.success(function(data) {
				$scope.Users = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
});
//
//
scotchTodo.controller('AddUsersController',function($scope,$http,$location,$routeParams,$upload){
	$scope.customer = {};
	var id = $routeParams.id;
	if(id) {
		$scope.user_id = id;
		$http.get('/api/getUser/'+id)
		.success(function(data) {	
			$scope.customer = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}
	$scope.addUser = function(){
		$http.post('/api/addUser', $scope.customer)
		.success(function(data) {
			$scope.customer = {};
			$location.path("/");
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}
	$scope.$watch('files', function() {
        $scope.upload($scope.files);
        console.log('watch');
    });
    $scope.upload = function(files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: '/api/uploadImage',
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' +
                        evt.config.file.name);
                }).success(function(data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' +
                        JSON.stringify(data));
                });
            }
        }
    };
});

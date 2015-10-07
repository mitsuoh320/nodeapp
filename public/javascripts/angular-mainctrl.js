 angular.module('myApp', []).controller('mainCtrl', function($scope) {
	$scope.users=[
		{"name":"taguchi","age":23},
		{"name":"ito","age":23},
		{"name":"kaneko","age":23},
	];	
        $scope.loginchecker=true; 
	$scope.logincheck=function(){
	}
	
});

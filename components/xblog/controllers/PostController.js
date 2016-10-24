PostController = function($scope, $http, $route, $routeParams, $location, $mdDialog) {
	var service = new AppService($http, 'get_post_content');
	service.$mdDialog = $mdDialog;
	service.onSuccess = function(response) {
		$scope.post = response.data.result;
	}.bind(this);
	service.run({
		alias: $routeParams.alias
	});
};
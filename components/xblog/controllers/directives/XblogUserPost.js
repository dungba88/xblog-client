AppDirectiveManager.registerDirective("xblogUserPost", {
	
	scope : {
		userId: '='
	},
	
	controller : function($scope, $http, $mdDialog) {
		var service = new AppService($http, $scope.userId ? 'get_user_posts' : 'get_all_posts');
		service.$mdDialog = $mdDialog;
		service.onSuccess = function(response) {
			$scope.posts = response.data.result;
		}.bind(this);
		service.run({
			id: $scope.userId
		});
	}
});
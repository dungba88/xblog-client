AppDirectiveManager.registerDirective("xblogCreatePost", {
	
	scope : {
		
	},
	
	controller : function($scope, $http, $mdDialog) {
		$scope.post = {};
		$scope.categoryDisabled = true;
		$scope.markdown = function($text) {
			if ($text == undefined)
				return "";
			return markdown.toHTML($text);
		}
		var service = new AppService($http, 'get_categories');
		service.$mdDialog = $mdDialog;
		service.onSuccess = function(response) {
			$scope.categories = response.data.result;
			$scope.categoryDisabled = false;
		}
		service.run();
	}
});
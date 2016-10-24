AppDirectiveManager.registerDirective("xblogFormattedTime", {
	
	scope : {
		time: '='
	},
	
	controller : function($scope, $filter) {
		$scope.format = function($time) {
			return $filter('date')($time, 'MMMM dd, y');
		}
	}
});
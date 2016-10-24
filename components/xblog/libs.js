PageConfigurator = {
	config: function(app) {
		// configure router
		app.config(function($routeProvider) {
			for (var i in window.AppConfigs.pageConfig) {
				var page = window.AppConfigs.pageConfig[i];
				$routeProvider.when(page.url, {
					templateUrl: page.template,
					controller: page.id
				});
			}
		});
		
		// define controller
		for (var i in window.AppConfigs.pageConfig) {
			var page = window.AppConfigs.pageConfig[i];
			app.controller(page.id, window[page.controller]);
		}
	}
};

AppDirectiveManager = {
	
	directives: [],
	
	registerDirective: function(el, definition) {
		this.directives.push({
			element: el,
			definition: definition
		});
	}
};

AppService = function($http, name) {
	
	this.serviceConfig = window.ServiceConfigs.services[name];
	this.$http = $http;
	this.run = function(params) {
		var endpoint = this.serviceConfig.endpoint;
		if (endpoint.indexOf('http://') != 0 && endpoint.indexOf('https://') != 0) {
			endpoint = window.ServiceConfigs.baseUrl + endpoint;
		}
		endpoint = endpoint.replace(/{.*}/, function(a, b) {
			var key = a.substr(1, a.length - 2);
			if (params[key] != undefined) {
				var value = params[key];
				delete params[key];
				return value;
			}
			return a;
		});
		this.$http({
			method: this.serviceConfig.method,
			url: endpoint,
			params: params
		}).then(function(response) {
			this.preSuccess(response);
			if (this.onSuccess)
				this.onSuccess.apply(this, arguments);
		}.bind(this), function(response) {
			if (this.onFail)
				this.onFail.apply(this, arguments);
			else
				this.handleFail(response);
		}.bind(this));
	};
	
	this.preSuccess = function(response) {
		if (response == null || response.data == null) {
			return;
		}
		if (response.data.errorCode) {
			if (this.$mdDialog) {
				this.$mdDialog.show({
				    templateUrl: 'xblog_error_dialog',
				    locals: {
				    	errors: response.data.errors,
				    	additionalInfos: response.data.additionalInfos
				    },
					controller: XblogErrorDialogController,
				    parent: angular.element(document.body)
				});
			}
		}
	}
	
	this.handleFail = function(response) {
		if (response.status == -1) {
			this.$mdDialog.show({
			    templateUrl: 'xblog_error_dialog',
			    locals: {
			    	errors: ['Cannot connect to back-end server']
			    },
				controller: XblogErrorDialogController,
			    parent: angular.element(document.body)
			});
		}
	}
}

function XblogErrorDialogController($scope, locals, $mdDialog) {
	$scope.ctrl = locals;
	$scope.cancel = function() {
		$mdDialog.cancel();
	}
}
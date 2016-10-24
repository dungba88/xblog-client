// initialize application module
var app = angular.module(window.AppConfigs.moduleName, window.AppConfigs.dependencies);

// application configuration
for (var i in window.AppConfigs.configurators) {
	var configurator = window.AppConfigs.configurators[i];
	var className = configurator.substr(0, 1).toUpperCase() + configurator.substr(1) + 'Configurator';
	window[className].config(app);
}

// application directives
for (var i in window.AppDirectiveManager.directives) {
	var directive = window.AppDirectiveManager.directives[i];
	directive.definition.restrict = 'E';
	directive.definition.templateUrl = StringUtils.camelCaseToUnderscore(directive.element);
	(function(directive) {
		app.directive(directive.element, function() {
			return directive.definition;
		});
	})(directive);
}
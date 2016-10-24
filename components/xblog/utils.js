StringUtils = {
	
	camelCaseToUnderscore: function(s) {
		return s.replace(/([A-Z])/g, function(a){
			return "_"+a.toLowerCase();
		});
	}
};
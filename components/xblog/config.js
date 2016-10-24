AppConfigs = {
	
	// application module name
	moduleName: 'xblog',
	
	// application dependencies
	dependencies: ['ngRoute', 'ngMaterial', 'ngSanitize'],
	
	// page configuration
	pageConfig: [{
		id: 'home',
		url: '/',
		template: 'page_home',
		controller: 'HomeController'
	}, {
		id: 'post',
		url: '/post/:alias',
		template: 'page_post',
		controller: 'PostController'
	}, {
		id: 'author',
		url: '/author/:alias',
		template: 'page_author',
		controller: 'AuthorController'
	}, {
		id: 'admin',
		url: '/admin',
		template: 'page_admin',
		controller: 'AdminController'
	}, {
		id: 'adminCreate',
		url: '/admin/create',
		template: 'page_admin_create',
		controller: 'AdminCreateController'
	}],
	
	// application configurators
	configurators: ['page']
};

ServiceConfigs = {
	
	baseUrl: 'http://localhost:8080/',
	services: {
		'get_user_posts' : {
			id: 'get_user_posts',
			description: 'Get all user posts',
			method: 'GET',
			endpoint: 'user/{id}/posts'
		},
		'get_post_content': {
			id: 'get_post_content',
			description: 'Get post content',
			method: 'GET',
			endpoint: 'post/{alias}'
		},
		'get_all_posts': {
			id: 'get_all_posts',
			description: 'Get all posts',
			method: 'GET',
			endpoint: 'posts'
		},
		'get_categories': {
			id: 'get_categories',
			description: 'Get all categories',
			method: 'GET',
			endpoint: 'categories'
		}
	}
};
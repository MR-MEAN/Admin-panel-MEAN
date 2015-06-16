var adminPanel = angular.module('adminPanel', ['ngAnimate', 'ngCookies', 'ngRoute', 'angularFileUpload', 'textAngular', 'angularUtils.directives.dirPagination', 'angular-growl', 'ui.bootstrap']);
var cache = '';
/*************** Routes of Application ****************************/
//
adminPanel.config(
    function($routeProvider, growlProvider) {
        $routeProvider.
        when('/', {
            title: 'Login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    } else {
                        $location.path("/dashboard");
                    }
                }
            }
        }).
        when('/dashboard', {
            title: 'Dashboard',
            templateUrl: 'views/dashboard.html',
            controller: "DashboardController",
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/managepages/:id', {
            title: 'Manage Pages',
            templateUrl: 'views/managePages.html',
            controller: 'ManagePage',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/pages', {
            title: 'Pages',
            templateUrl: 'views/pages.html',
            controller: 'PageController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/managecustomers/:id', {
            title: 'Manage Customers',
            templateUrl: 'views/addCustomer.html',
            controller: 'AddCustomerController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/customers/:message', {
            title: 'Customers',
            templateUrl: 'views/customers.html',
            controller: 'CustomerController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/products', {
            title: 'Products',
            templateUrl: 'views/products.html',
            controller: 'ProductController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/manageproducts/:id', {
            title: 'Products',
            templateUrl: 'views/manageProducts.html',
            controller: 'ManageProductController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/timePicker', {
            title: 'Products',
            templateUrl: 'views/timePicker.html',
            controller: 'TimePickerController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/categories', {
            title: 'Categories',
            templateUrl: 'views/categories.html',
            controller: 'CategoriesController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/managecategories/:id', {
            title: 'Categories',
            templateUrl: 'views/manageCategories.html',
            controller: 'ManageCategoriesController',
            resolve: {
                auth: function($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        otherwise({
            redirectTo: '/'
        });
        growlProvider.globalTimeToLive(2000);
        growlProvider.globalPosition('top-center');
    });
//
adminPanel.run(function($cookies, $location, $cacheFactory, $rootScope) {
    cache = $cacheFactory('cacheId');
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.$$route) {
            $rootScope.title = current.$$route.title;
        }
    });
});

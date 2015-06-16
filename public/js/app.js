var adminPanel = angular.module('adminPanel', ['ngAnimate', 'ngCookies', 'ngRoute', 'angularFileUpload', 'textAngular', 'angularUtils.directives.dirPagination', 'angular-growl', 'ui.bootstrap']);
var cache = '';
/*************** Routes of Application ****************************/
//
adminPanel.config(
    function ($routeProvider, growlProvider) {
        $routeProvider.
        when('/', {
            title: 'Login',
            templateUrl: 'views/login.html',
            controller: 'LoginController',
            resolve: {
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
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
                auth: function ($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/brands', {
            title: 'Brands',
            templateUrl: 'views/brands.html',
            controller: 'BrandsController',
            resolve: {
                auth: function ($cookies, $location) {
                    if ($cookies.loginStatus != 'true') {
                        $location.path("/");
                    }
                }
            }
        }).
        when('/managebrands/', {
            title: 'Brands',
            templateUrl: 'views/managebrands.html',
            controller: 'ManageBrandsController',
            resolve: {
                auth: function ($cookies, $location) {
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
adminPanel.run(function ($cookies, $location, $cacheFactory, $rootScope) {
    cache = $cacheFactory('cacheId');
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        if (current.$$route) {
            $rootScope.title = current.$$route.title;
        }
    });
});
/*************** Factory of Application ****************************/
adminPanel.factory("authFactory", function ($upload, $q, $location, $http, $upload, $cookies, $cacheFactory, $rootScope) {
    return {
        login: function (credentials) {
            var q = $q.defer();
            $http.post('/api/login', credentials)
                .success(function (response) {
                    q.resolve(response);
                }).error(function (data, status, headers, config) {
                    q.reject(data);
                });
            return q.promise;
        },
        addPageContent: function (data) {
            var q = $q.defer();
            $http.post('/api/addPageContent', data)
                .success(function (response) {
                    q.resolve(response);
                }).error(function (data, status, headers, config) {
                    q.reject(data);
                });
            return q.promise;
        },
        addCustomer: function (customer) {
            var q = $q.defer();
            $http.post('/api/addCustomer', customer)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addProduct: function (product) {
            var q = $q.defer();
            $http.post('/api/addProduct', product)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addCategory: function (category) {
            var q = $q.defer();
            $http.post('/api/addCategory', category)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addBrand: function (brand) {
            var q = $q.defer();
            $http.post('/api/addBrand', brand)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addSubCategory: function (category) {
            var q = $q.defer();
            $http.post('/api/addSubCategory', category)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCustomers: function (data) {
            var q = $q.defer();
            $http.post('/api/customers', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getProducts: function (data) {
            var q = $q.defer();
            $http.post('/api/products', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCategories: function (data) {
            var q = $q.defer();
            $http.post('/api/categories', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getSubCategoriesById: function (data) {
            var q = $q.defer();
            $http.post('/api/getSubCategoriesById', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getPages: function (data) {
            var q = $q.defer();
            $http.post('/api/pages', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeSubCategory: function (data) {
            var q = $q.defer();
            $http.post('/api/removeSubCategory', data)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCustomerById: function (id) {
            var q = $q.defer();
            $http.get('/api/getCustomer/' + id)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getProductById: function (id) {
            var q = $q.defer();
            $http.get('/api/getProduct/' + id)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCategoryById: function (id) {
            var q = $q.defer();
            $http.get('/api/getCategory/' + id)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getPageById: function (id) {
            var q = $q.defer();
            $http.get('/api/getPage/' + id)
                .success(function (response) {
                    q.resolve(response);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        // Image upload factory function
        //
        imageUpload: function (files, data) {
            var q = $q.defer();
            var file = files[0];
            $upload.upload({
                    url: '/api/uploadImage/' + data,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log(progressPercentage);
                }).success(function (data, status, headers, config) {
                    q.resolve(data.imagename);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeCustomer: function (data) {
            var q = $q.defer();
            $http.post('/api/delete', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeCategory: function (data) {
            var q = $q.defer();
            $http.post('/api/category/delete', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removePage: function (data) {
            var q = $q.defer();
            $http.post('/api/page/delete', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeProduct: function (data) {
            var q = $q.defer();
            $http.post('/api/product/delete', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeBrand: function (data) {
            var q = $q.defer();
            $http.post('/api/removeBrand', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getSubcategories: function (id) {
            var q = $q.defer();
            $http.post('/api/getSubcategoriesById', id)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getBrands: function (data) {
            var q = $q.defer();
            $http.post('/api/brands', data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        searchCustomer: function (data) {
            var q = $q.defer();
            $http.get('/api/search/' + data)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getAllCategories: function () {
            var q = $q.defer();
            $http.get('/api/getAllCategories')
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getAllCategoriesAndBrands: function () {
            var q = $q.defer();
            $http.get('/api/getAllCategoriesAndBrands')
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data) {
                    q.reject(data);
                });
            return q.promise;
        },
        shareData: function () {
            return shareData;
        }
    };
});
/*************** Controllers of Application ****************************/
//
//
adminPanel.controller('NavController', ['$scope', '$location', '$cookies', function ($scope, $location, $cookies) {
    $scope.display_header = function () {
        if ($location.path() === '/' || $location.path() === ' ') {
            return false;
        } else {
            return "views/sidebar.html";
        }
    }
    $scope.logout = function () {
        $cookies.loginStatus = '';
        $location.path("/");
    }
    $scope.selectedTab = function (path) {
        return path === $location.path();
    }
    $scope.clearCache = function () {
        cache.put('message', '');
        cache.put('pageNumber', '');
    }
}]);
//
//
adminPanel.controller('LoginController', ['$scope', '$location', '$cookies', 'authFactory', function ($scope, $location, $cookies, authFactory) {
    $scope.errorMessage = false;
    $scope.login = function (credentials) {
        $scope.promise = authFactory.login(credentials);
        $scope.promise.then(
            function (res) {
                if (res != '') {
                    $cookies.loginStatus = 'true';
                    $location.path("/dashboard");
                } else {
                    $scope.errorMessage = true;
                }
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    }
}]);
//
//
adminPanel.controller('DashboardController', ['$scope', function ($scope) {
    $scope.name = "page-wrapper";
}]);

//
//
adminPanel.controller('AddCustomerController', ['$rootScope', '$upload', '$scope', '$location', 'authFactory', '$routeParams', function ($rootScope, $upload, $scope, $location, authFactory) {
    $scope.name = "page-wrapper";
    $scope.content = {};
    $scope.content.image = "default.png";
    var data = authFactory.shareData;
    if (data) {
        $scope.content = data;
        cache.put("message", "Customer Updated Successfully !");
    }
    $scope.addCustomer = function (customer) {
        $scope.promise = authFactory.addCustomer(customer);
        $scope.promise.then(
            function (res) {
                if (!cache.get('message')) {
                    cache.put("message", "Customer Added Successfully !");
                }
                $location.path("/customers/");
            },
            function (err) {
                $scope.errorMessage = true;
            });
    }
    $scope.cancelCustomer = function () {
        cache.put("message", "");
        $location.path("/customers/");
    };
    $scope.uploadProgress = {
        'visibility': 'hidden'
    };
    $scope.uploadProgressBtn = false;
    
    // Image upload code Check here
    // Image upload code Check here
    // Image upload code Check here
    // Image upload code Check here
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.upload = function (files) {
        if (files && files.length) {
            $scope.dynamic = 10;
            $scope.uploadProgress = {
                'visibility': 'visible'
            };
            $scope.uploadProgressBtn = true;
            // Check factory function
            // Second parameter is just the name of folder where i want to upload image (optional)
            authFactory.imageUpload(files, "customers").then(
                function (data) {
                    $scope.content.image = data;
                    $scope.uploadProgress = {
                        'visibility': 'hidden'
                    };
                    $scope.uploadProgressBtn = false;
                },
                function (err) {
                    $scope.errorMessage = true;
                    $scope.uploadProgress = {
                        'visibility': 'hidden'
                    };
                    $scope.uploadProgressBtn = false;
                });
        }
    };
    // END IMAGE UPLOAD
    
    //
    //
    // Image Upload Progress
    $scope.dynamic = 10;
    $scope.type = 'success';
    $scope.$on('progress', function (event, data) {
        $scope.dynamic = parseInt(data);
    });
}]);
//
//
adminPanel.controller('CustomerController', ['growl', '$timeout', '$scope', '$location', '$cookies', 'authFactory', function (growl, $timeout, $scope, $location, $cookies, authFactory) {
    $scope.noRecordFound = true;
    $scope.dataLength = false;
    $scope.name = "page-wrapper";
    $scope.loading = true;
    var message = cache.get('message');
    $scope.addSpecialWarnMessage = function () {
        growl.success(message);
    }
    $scope.removeSpecialWarnMessage = function () {
        growl.success("Customer Removed Successfully !");
    }
    if (message) {
        $timeout(function () {
            $scope.addSpecialWarnMessage();
        }, 200);
        cache.put("message", "");
    }
    $scope.Users = [];
    // Pagination
    $scope.totalUsers = 0;
    $scope.customersPerPage = 5;
    var pageNo = cache.get('pageNumber');
    if (!pageNo) {
        pageNo = 1;
    }
    // Load Customers data from server
    //
    $timeout(function () {
        getResultsPage(pageNo, '');
    }, 700);
    $scope.pagination = {
        current: pageNo
    };
    $scope.pageChanged = function (newPage, search) {
        getResultsPage(newPage, search);
    };
    function getResultsPage(pageNumber, search) {
        var data = {
            pageNumber: pageNumber,
            customersPerPage: $scope.customersPerPage,
            search: search
        };
        $scope.promise = authFactory.getCustomers(data);
        $scope.promise.then(
            function (data) {
                cache.put("pageNumber", pageNumber);
                if (data.customers.length) {
                    $scope.noRecordFound = true;
                    $scope.dataLength = true;
                } else {
                    $scope.noRecordFound = false;
                }
                $scope.Users = data.customers;
                $scope.totalUsers = parseInt(data.count.totalCount);
                $scope.loading = false;
            },
            function (err) {
                $scope.errorMessage = true;
            });
    };
    // Share data for edit with another Controller
    //
    $scope.shareDataForEdit = function (data) {
        var idx = $scope.Users.indexOf(data);
        var data = $scope.Users[idx];
        authFactory.shareData = data;
        $location.path("/managecustomers/");
    };
    // Add customer
    //
    $scope.addCustomer = function () {
        authFactory.shareData = null;
        $location.path("/managecustomers/");
    };
    $scope.remove = function (user) {
        var idx = $scope.Users.indexOf(user);
        var id = $scope.Users[idx]._id;
        var data = {
            id: id,
            pageNumber: cache.get('pageNumber'),
            customersPerPage: $scope.customersPerPage
        };
        $scope.promise = authFactory.removeCustomer(data);
        $scope.promise.then(
            function (data) {
                $scope.Users = data;
                var data = authFactory.shareData;
                if (data) {
                    $scope.content = data;
                    $scope.content.edit = "true";
                    cache.put("message", "Categories Updated Successfully !");
                }
                if (!$scope.Users.length) {
                    $scope.dataLength = false;
                    $scope.noRecordFound = false;
                }
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            });
    };
}]);
//
//
adminPanel.controller('PageController', ['growl', '$timeout', '$scope', '$location', '$cookies', 'authFactory', function (growl, $timeout, $scope, $location, $cookies, authFactory) {
    $scope.noRecordFound = true;
    $scope.dataLength = false;
    $scope.loading = true;
    $scope.name = "page-wrapper";

    var message = cache.get('message');
    $scope.addSpecialWarnMessage = function () {
        growl.success(message);
    }
    $scope.removeSpecialWarnMessage = function () {
        growl.success("Page Removed Successfully !");
    }
    if (message) {
        $timeout(function () {
            $scope.addSpecialWarnMessage();
        }, 200);
        cache.put("message", "");
    }
    $scope.Pages = [];
    // Pagination
    $scope.totalPages = 0;
    $scope.PagesPerPage = 5;
    var pageNo = cache.get('pageNumber');
    if (!pageNo) {
        pageNo = 1;
    }
    // Load Pages data from server
    //
    $timeout(function () {
        getResultsPage(pageNo, '');
    }, 700);
    $scope.pagination = {
        current: pageNo
    };
    $scope.pageChanged = function (newPage, search) {
        getResultsPage(newPage, search);
    };

    function getResultsPage(pageNumber, search) {
        var data = {
            pageNumber: pageNumber,
            PagesPerPage: $scope.PagesPerPage,
            search: search
        };
        $scope.promise = authFactory.getPages(data);
        $scope.promise.then(
            function (data) {
                cache.put("pageNumber", pageNumber);
                if (data.customers.length) {
                    $scope.noRecordFound = true;
                    $scope.dataLength = true;
                } else {
                    $scope.noRecordFound = false;
                }
                $scope.Pages = data.customers;
                $scope.totalPages = parseInt(data.count.totalCount);
                $scope.loading = false;
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    // Share data for edit b/w controllers
    //
    $scope.shareDataForEdit = function (data) {
        var idx = $scope.Pages.indexOf(data);
        var data = $scope.Pages[idx];
        authFactory.shareData = data;
        $location.path("/managepages/");
    };
    // Add Page
    //
    $scope.addPage = function () {
        authFactory.shareData = null;
        $location.path("/managepages/");
    };
    // Remove data
    //
    $scope.remove = function (page) {
        var idx = $scope.Pages.indexOf(page);
        var id = $scope.Pages[idx]._id;
        var data = {
            id: id,
            pageNumber: cache.get('pageNumber'),
            customersPerPage: $scope.customersPerPage
        };
        $scope.promise = authFactory.removePage(data);
        $scope.promise.then(
            function (data) {
                $scope.Pages = data;
                if (!$scope.Pages.length) {
                    $scope.dataLength = false;
                    $scope.noRecordFound = false;
                }
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            });
    };
}]);
//
//
adminPanel.controller('ManagePage', ['$scope', '$location', '$cookies', 'authFactory', '$timeout', '$routeParams', function ($scope, $location, $cookies, authFactory, $timeout, $routeParams) {
    $scope.name = "page-wrapper";
    $scope.content = {
        pageTitle: '',
        pageUrl: '',
        metaDescription: '',
        metaKey: ''
    };
    // Get shared data from factory
    //
    var data = authFactory.shareData;
    if (data) {
        $scope.content = data;
        cache.put("message", "Pages Updated Successfully !");
    }
    //
    // cancel button event
    $scope.cancelPage = function () {
        cache.put("message", "");
        $location.path("/pages");
    };
    //
    // Create url function
    $scope.createUrl = function (data) {
        if (data) {
            var chunks = data.split(' ');
            var length = chunks.length;
            var url = '';
            for (i = 0; i < length; i++) {
                url += chunks[i] + "-";
            }
            url = url.substring(0, url.length - 1);
            $scope.content.pageUrl = '/' + url;
        } else {
            $scope.content.pageUrl = '';
        }
    };
    //
    // Add page data
    $scope.addPageContent = function (data) {
        $scope.promise = authFactory.addPageContent(data);
        $scope.promise.then(
            function (res) {
                if (!cache.get('message')) {
                    cache.put("message", "Page Added Successfully !");
                }
                $location.path("/pages");
            },
            function (err) {
                $scope.message = true;
                $scope.messageContent = "There is some problem";
            }
        );
    }
}]);
//
//
adminPanel.controller("ManageProductController", ['$rootScope', '$upload', '$scope', '$location', 'authFactory', '$routeParams', function ($rootScope, $upload, $scope, $location, authFactory, $routeParams) {
    $scope.name = "page-wrapper";
    $scope.content = {};
    // Get data to edit
    //
    var data = authFactory.shareData;
    if (data['content']) {
        $scope.content = data['content'];
        cache.put("message", "Product Updated Successfully !");
    };
    // Get list of All Categories From Database
    //
    function getIndex(val, match, valueToMatch) {
        for (var i = 0; i < $scope[match].length; i++) {
            if ($scope[match][i][valueToMatch] == val) {
                return i;
            }
        }
    };
    // get categories list
    $scope.promise = authFactory.getAllCategories();
    $scope.promise.then(
        function (response) {
            $scope.selectTab = response;
            if(data['flag'] == 'editData'){
				getSubcategories();
				var index = getIndex($scope.content.category, 'selectTab', 'name');
				$scope.selectCategory = $scope.selectTab[index];
			}
        },
        function (err) {
            $scope.errorMessage = true;
        }
    );
    // Get subcategories
    //
    $scope.changeSelectBox = function () {
        $scope.content.category = $scope.selectCategory ? $scope.selectCategory.name : 'error';
        $scope.content.category_id = $scope.selectCategory ? $scope.selectCategory._id : 0;
        getSubcategories();
    };
     function getSubcategories() {
		 var data = {id: $scope.content.category_id};
		 authFactory.getSubCategoriesById(data).then(
            function (response) {
                $scope.selectSubTab = response.subCat;
                $scope.selectBrands = response.brands;
                var index1 = getIndex($scope.content.brand, 'selectBrands', 'brandName');	
                $scope.brand = $scope.selectBrands[index1];
				var index2 = getIndex($scope.content.subCategory_id, 'selectSubTab', '_id');
				$scope.selectSubCategory = $scope.selectSubTab[index2];
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
	};
    // default image
    //
    // Add Or Update new Product
    //
    $scope.addProduct = function () {
        $scope.content.subCategory_id = $scope.selectSubCategory._id;
        $scope.content.brand = $scope.brand.brandName;
        var data = $scope.content;
        $scope.promise = authFactory.addProduct(data);
        $scope.promise.then(
            function (res) {
                if (!cache.get('message')) {
                    cache.put("message", "Product Added Successfully !");
                }
                $location.path("/products");
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    // Cancel product
    //
    $scope.cancelProduct = function () {
        cache.put("message", "");
        $location.path("/products");
    };
    // Image upload
    //
    $scope.uploadProgress = {
        'visibility': 'hidden'
    };
    $scope.uploadProgressBtn = false;
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.upload = function (files) {
        if (files && files.length) {
            //$scope.dynamic = 10;
            $scope.uploadProgress = {
                'visibility': 'visible'
            };
            $scope.uploadProgressBtn = true;
            $scope.promise = authFactory.imageUpload(files, "products");
            $scope.promise.then(
                function (data) {
                    $scope.content.image = data;
                    $scope.uploadProgress = {
                        'visibility': 'hidden'
                    };
                    $scope.uploadProgressBtn = false;
                },
                function (err) {
                    $scope.errorMessage = true;
                    $scope.uploadProgress = {
                        'visibility': 'hidden'
                    };
                    $scope.uploadProgressBtn = false;
                }
            );
        }
    };
    //Image Upload Progress
    // 
    $scope.dynamic = 10;
    $scope.type = 'success';
    $scope.$on('progress', function (event, data) {
        $scope.dynamic = parseInt(data);
    });
}]);

adminPanel.controller("ProductController", ['$scope', '$timeout', 'authFactory', '$location', 'growl', function ($scope, $timeout, authFactory, $location, growl) {
    $scope.noRecordFound = true;
    $scope.dataLength = false;
    $scope.name = "page-wrapper";
    $scope.loading = true;
    var message = cache.get('message');
    $scope.addSpecialWarnMessage = function () {
        growl.success(message);
    }
    $scope.removeSpecialWarnMessage = function () {
        growl.success("Product Removed Successfully !");
    }
    if (message) {
        $timeout(function () {
            $scope.addSpecialWarnMessage();
        }, 200);
        cache.put("message", "");
    }
    $scope.Products = [];
    // Pagination
    $scope.totalProducts = 0;
    $scope.productsPerPage = 5;
    var pageNo = cache.get('pageNumber');
    if (!pageNo) {
        pageNo = 1;
    }
    // Load Customers data from server
    //
    $timeout(function () {
        getResultsPage(pageNo, '');
    }, 700);
    $scope.pagination = {
        current: pageNo
    };

    $scope.pageChanged = function (newPage, search) {
        getResultsPage(newPage, search);
    };

    function getResultsPage(pageNumber, search) {
        var data = {
            pageNumber: pageNumber,
            customersPerPage: $scope.productsPerPage,
            search: search
        };
        $scope.promise = authFactory.getProducts(data);
        $scope.promise.then(
            function (data) {
                cache.put("pageNumber", pageNumber);
                if (data.customers.length) {
                    $scope.noRecordFound = true;
                    $scope.dataLength = true;
                } else {
                    $scope.noRecordFound = false;
                }
                $scope.Products = data.customers;
                $scope.totalProducts = parseInt(data.count.totalCount);
                $scope.loading = false;
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    // Share data for edit b/w controllers
    //
    $scope.shareDataForEdit = function (data) {
        var idx = $scope.Products.indexOf(data);
        var data = [];
        data['content'] = $scope.Products[idx];
        data['flag'] = 'editData'
        authFactory.shareData = data
        $location.path("/manageproducts/");
    };
    // Add Page
    //
    $scope.addProduct = function () {
        var data = [];
        data['content'] = '';
         data['flag'] = ''
        authFactory.shareData = data;
        $location.path("/manageproducts/");
    };
    $scope.remove = function (product) {
        var idx = $scope.Products.indexOf(product);
        var id = $scope.Products[idx]._id;
        var data = {
            id: id,
            pageNumber: cache.get('pageNumber'),
            customersPerPage: $scope.productsPerPage
        };
        $scope.promise = authFactory.removeProduct(data);
        $scope.promise.then(
            function (data) {
                $scope.Products = data;
                if (!$scope.Products.length) {
                    $scope.dataLength = false;
                    $scope.noRecordFound = false;
                }
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
}]);
adminPanel.directive('onlyNumbers', function () {
    return function (scope, element, attrs) {
        var keyCode = [8, 9, 13, 37, 39, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190];
        element.bind("keydown", function (event) {
            if ($.inArray(event.which, keyCode) == -1) {
                scope.$apply(function () {
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }
        });
    };
});
//
// Manage Categories controller 
//
//
adminPanel.controller("ManageCategoriesController", ['$scope', '$location', 'authFactory', '$routeParams', function ($scope, $location, authFactory, $routeParams) {
    $scope.name = "page-wrapper";
    $scope.content = {};
    // Get list of All Categories From Database
    //
    function getIndex(val) {
        for (var i = 0; i < $scope.parentCategories.length; i++) {
            if ($scope.parentCategories[i]._id == val) {
                return i;
            }
        }
    }

    $scope.content.parent_id = 0;
    $scope.content.edit = 'false';

    $scope.promise = authFactory.getAllCategories();
    $scope.promise.then(
        function (data) {
            if (data.name == "CastError") {
                $location.path("/categories");
            } else {
                $scope.parentCategories = data;
                if ($scope.subCatFlag == "subCategory") {
                    var index = getIndex($scope.content.parent_id);
                    $scope.selectedCategory = $scope.parentCategories[index];
                }
            }
        },
        function (err) {
            $scope.errorMessage = true;
        }
    );
    // On change of Select Box
    //
    $scope.parentId = function () {
        $scope.content.parent_id = $scope.selectedCategory ? $scope.selectedCategory._id : 0;
    };
    // If User has come here to Edit data
    //
    var data = authFactory.shareData;
    if (data['content']) {
        $scope.content = data['content'];
        $scope.subCatFlag = data['flag'];
        $scope.content.edit = "true";
        cache.put("message", "Categories Updated Successfully !");
    }
    // Add New Category for Products
    //
    $scope.addCategory = function (category) {
            if ($scope.content.parent_id == 0) {
                $scope.promise = authFactory.addCategory(category);
            } else {
                $scope.promise = authFactory.addSubCategory(category);
            }
            $scope.promise.then(
                function (res) {
                    if (res.status == "success") {
                        if (!cache.get('message')) {
                            cache.put("message", "Category Added Successfully !");
                        }
                        $location.path("/categories");
                    } else {
                        $scope.messageContent = res.message;
                        $scope.errorMessage = true;
                    }
                },
                function (err) {
                    $scope.errorMessage = true;
                }
            );
        }
        // Cancel button function 
        //
    $scope.cancelCategory = function () {
        cache.put("message", "");
        $location.path("/categories");
    };
}]);
//
adminPanel.controller("CategoriesController", ['$scope', '$timeout', 'authFactory', '$location', 'growl', function ($scope, $timeout, authFactory, $location, growl) {
    // Initial settings
    //
    $scope.noRecordFound = true;
    $scope.dataLength = false;
    $scope.name = "page-wrapper";
    $scope.loading = true;
    // Growl messages settings
    //
    var message = cache.get('message');
    $scope.addSpecialWarnMessage = function () {
        growl.success(message);
    }
    $scope.removeSpecialWarnMessage = function () {
        growl.success("Category Removed Successfully !");
    }
    if (message) {
        $timeout(function () {
            $scope.addSpecialWarnMessage();
        }, 200);
        cache.put("message", "");
    }
    $scope.Products = [];
    // Pagination
    //
    $scope.totalCategories = 0;
    $scope.categoryPerPage = 5;
    var pageNo = cache.get('pageNumber');
    if (!pageNo) {
        pageNo = 1;
    }
    // Load Categories from server
    //
    $timeout(function () {
        getResultsPage(pageNo, '');
    }, 700);
    $scope.pagination = {
        current: pageNo
    };
    // when person changes the page by pagination links 
    //
    $scope.pageChanged = function (newPage, search) {
        getResultsPage(newPage, search);
    };
    // Get result on the basis of search and pagination
    //
    function getResultsPage(pageNumber, search) {
        var data = {
            pageNumber: pageNumber,
            customersPerPage: $scope.categoryPerPage,
            search: search
        };
        $scope.promise = authFactory.getCategories(data);
        $scope.promise.then(
            function (data) {
                cache.put("pageNumber", pageNumber);
                if (data.customers.length) {
                    $scope.noRecordFound = true;
                    $scope.dataLength = true;
                } else {
                    $scope.noRecordFound = false;
                }
                $scope.Categories = data.customers;
                $scope.totalCategories = parseInt(data.count.totalCount);
                $scope.loading = false;
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    // Edit data By sharing it with other controller
    //
    $scope.shareDataForEdit = function (data) {
        var idx = $scope.Categories.indexOf(data);
        var data = [];
        data['content'] = $scope.Categories[idx];
        data['flag'] = "parentCategory";
        authFactory.shareData = data;
        $location.path("/managecategories/");
    };
    // Add new category
    //
    $scope.addCategory = function () {
        var data = [];
        data['content'] = '';
        data['flag'] = '';
        authFactory.shareData = data;
        $location.path("/managecategories/");
    };
    // Remove category
    //
    $scope.remove = function (category) {
        var idx = $scope.Categories.indexOf(category);
        var id = $scope.Categories[idx]._id;
        var data = {
            id: id,
            pageNumber: cache.get('pageNumber'),
            customersPerPage: $scope.categoryPerPage
        };
        $scope.promise = authFactory.removeCategory(data);
        $scope.promise.then(
            function (data) {
                $scope.Categories = data;
                if (!$scope.Categories.length) {
                    $scope.dataLength = false;
                    $scope.noRecordFound = false;
                }
                $scope.subCategories = [];
                $scope.subCatLength = false;
                $scope.noRecordFoundSubCat = false;
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    //Sub categories check functions
    //
    $scope.noRecordFoundSubCat = false;
    $scope.subCatLength = false;
    var parentId = '';
    $scope.getSubCategories = function (data) {
		console.log('hererer');
        $scope.subCatLoading = true;
        var idx = $scope.Categories.indexOf(data);
        var idc = $scope.Categories[idx]._id;
        parentId = idc;
        $scope.parentCategory = $scope.Categories[idx].name
        var data = {
            'id': idc
        };
        $scope.promise = authFactory.getSubcategories(data);
        $scope.promise.then(
            function (data) {
                $scope.subCatLoading = false;
                $scope.subCategories = data.subCat;
                if ($scope.subCategories.length) {
                    $scope.subCatLength = true;
                    $scope.noRecordFoundSubCat = true;
                } else {
                    $scope.subCatLength = false;
                    $scope.noRecordFoundSubCat = false;
                }

            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    }
    $scope.subCatEdit = function (data) {
        var idx = $scope.subCategories.indexOf(data);
        var data = [];
        data['content'] = $scope.subCategories[idx];
        data['flag'] = "subCategory";
        authFactory.shareData = data;
        $location.path("/managecategories/");
    };
    $scope.removeSubCat = function (data) {
        var idx = $scope.subCategories.indexOf(data);
        var id = $scope.subCategories[idx]._id;
        var data = {
            'id': id,
            'parent_id': parentId
        };
        $scope.promise = authFactory.removeSubCategory(data);
        $scope.promise.then(
            function (data) {
                $scope.subCategories = data;
                if (!$scope.subCategories.length) {
                    $scope.subCatLength = false;
                    $scope.noRecordFoundSubCat = false;
                }
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
}]);
//
//
adminPanel.controller("BrandsController", ['$scope', '$timeout', 'authFactory', '$location', 'growl', function ($scope, $timeout, authFactory, $location, growl) {
    $scope.noRecordFound = true;
    $scope.dataLength = false;
    $scope.name = "page-wrapper";
    $scope.loading = true;
    var message = cache.get('message');
    $scope.addSpecialWarnMessage = function () {
        growl.success(message);
    }
    $scope.removeSpecialWarnMessage = function () {
        growl.success("Brand Removed Successfully !");
    }
    if (message) {
        $timeout(function () {
            $scope.addSpecialWarnMessage();
        }, 200);
        cache.put("message", "");
    }
    $scope.Brands = [];
    // Pagination
    $scope.totalBrands = 0;
    $scope.brandsPerPage = 5;
    var pageNo = cache.get('pageNumber');
    if (!pageNo) {
        pageNo = 1;
    }
    // Load Customers data from server
    //
    $timeout(function () {
        getResultsPage(pageNo, '');
    }, 700);
    $scope.pagination = {
        current: pageNo
    };

    $scope.pageChanged = function (newPage, search) {
        getResultsPage(newPage, search);
    };

    function getResultsPage(pageNumber, search) {
        var data = {
            pageNumber: pageNumber,
            brandsPerPage: $scope.brandsPerPage,
            search: search
        };
        $scope.promise = authFactory.getBrands(data);
        $scope.promise.then(
            function (data) {
                cache.put("pageNumber", pageNumber);
                if (data.brands.length) {
                    $scope.noRecordFound = true;
                    $scope.dataLength = true;
                } else {
                    $scope.noRecordFound = false;
                }
                $scope.Brands = data.brands;
                $scope.totalBrands = parseInt(data.count);
                $scope.loading = false;
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
    // Share data for edit b/w controllers
    //
    $scope.shareDataForEdit = function (content) {
		var data = [];
		data['content'] = content;
        authFactory.shareData = data;
        $location.path("/managebrands/");
    };
    // Add Page
    //
    $scope.addBrand = function () {
        var data = '';
        authFactory.shareData = data;
        $location.path("/managebrands/");
    };
    $scope.remove = function (brand) {
        var idx = $scope.Brands.indexOf(brand);
        var id = $scope.Brands[idx]._id;
        var id = brand._id;
        var data = {
            id: id,
            pageNumber: cache.get('pageNumber'),
            brandsPerPage: $scope.brandsPerPage
        };
        $scope.promise = authFactory.removeBrand(data);
        $scope.promise.then(
            function (data) {
                $scope.Brands = data;
                if (!$scope.Brands.length) {
                    $scope.dataLength = false;
                    $scope.noRecordFound = false;
                }
                $timeout(function () {
                    $scope.removeSpecialWarnMessage();
                }, 200);
            },
            function (err) {
                $scope.errorMessage = true;
            }
        );
    };
}]);
//
//
adminPanel.controller('ManageBrandsController', ['$scope', '$location', 'authFactory', '$routeParams', function ($scope, $location, authFactory) {
    $scope.name = "page-wrapper";
    $scope.edit = 'false';
    var data = authFactory.shareData;
    var CatArray = [];
    if (data['content']) {
        $scope.brandName = data['content'].brandName;
        $scope._id = data['content']._id;
        $scope.edit = 'true';
        CatArray = data['content'].category_id;
        cache.put("message", "Brand Updated Successfully !");
    }
	function getIndex(val) {
			for (var i = 0; i < $scope.selectTab.length; i++) {
				if ($scope.selectTab[i]._id == val) {
						return i;
				}
		}
	}
    // get categories list
    var multiSelect = [];
    $scope.promise = authFactory.getAllCategories();
    $scope.promise.then(
        function (response) {
            $scope.selectTab = response;	
            for(var i = 0; i < CatArray.length; i++){
				var index = getIndex(CatArray[i]);
				multiSelect.push($scope.selectTab[index]);
			}
        $scope.selectCategory = multiSelect;
        },
        function (err) {
            $scope.errorMessage = true;
        }
    );
    $scope.addBrand = function () {
		var ids = [];
		for(var i in $scope.selectCategory) {
		  ids.push($scope.selectCategory[i]._id);	
		}
        $scope.promise = authFactory.addBrand({
            brandName: $scope.brandName,
            edit: $scope.edit,
            _id: $scope._id,
            category_id: ids
        });
        $scope.promise.then(
            function (res) {
                if (!cache.get('message')) {
                    cache.put("message", "Brand Added Successfully !");
                }
                if (res.status == "failure") {
                    $scope.errorMessage = true;
                    $scope.messageContent = res.message;
                } else {
                    $location.path("/brands");
                }

            },
            function (err) {
                $scope.errorMessage = true;
            });
    }
    $scope.cancelBrand = function () {
        cache.put("message", "");
        $location.path("/brands");
    };
}]);

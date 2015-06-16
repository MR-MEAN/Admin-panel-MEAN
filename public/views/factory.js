/*************** Factory of Application ****************************/
adminPanel.factory("authFactory", function($upload, $q, $location, $http, $upload, $cookies, $cacheFactory, $rootScope) {
    return {
        login: function(credentials) {
            var q = $q.defer();
            $http.post('/api/login', credentials)
                .success(function(response) {
                    q.resolve(response);
                }).error(function(data, status, headers, config) {
                    q.reject(data);
                });
            return q.promise;
        },
        addPageContent: function(data) {
            var q = $q.defer();
            $http.post('/api/addPageContent', data)
                .success(function(response) {
                    q.resolve(response);
                }).error(function(data, status, headers, config) {
                    q.reject(data);
                });
            return q.promise;
        },
        addCustomer: function(customer) {
            var q = $q.defer();
            $http.post('/api/addCustomer', customer)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addProduct: function(product) {
            var q = $q.defer();
            $http.post('/api/addProduct', product)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        addCategory: function(category) {
            var q = $q.defer();
            $http.post('/api/addCategory', category)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCustomers: function(data) {
            var q = $q.defer();
            $http.post('/api/customers', data)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getProducts: function(data) {
            var q = $q.defer();
            $http.post('/api/products', data)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCategories: function(data) {
            var q = $q.defer();
            $http.post('/api/categories', data)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getPages: function(data) {
            var q = $q.defer();
            $http.post('/api/pages', data)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCustomerById: function(id) {
            var q = $q.defer();
            $http.get('/api/getCustomer/' + id)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getProductById: function(id) {
            var q = $q.defer();
            $http.get('/api/getProduct/' + id)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getCategoryById: function(id) {
            var q = $q.defer();
            $http.get('/api/getCategory/' + id)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getPageById: function(id) {
            var q = $q.defer();
            $http.get('/api/getPage/' + id)
                .success(function(response) {
                    q.resolve(response);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        imageUpload: function(files, data) {
            var q = $q.defer();
            var file = files[0];
            $upload.upload({
                    url: '/api/uploadImage/' + data,
                    file: file
                }).progress(function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $rootScope.$broadcast('progress', progressPercentage);
                    $rootScope.progress = progressPercentage;
                }).success(function(data, status, headers, config) {
                    q.resolve(data.imagename);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeCustomer: function(data) {
            var q = $q.defer();
            $http.post('/api/delete', data)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeCategory: function(data) {
            var q = $q.defer();
            $http.post('/api/category/delete', data)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removePage: function(data) {
            var q = $q.defer();
            $http.post('/api/page/delete', data)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        removeProduct: function(data) {
            var q = $q.defer();
            $http.post('/api/product/delete', data)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        searchCustomer: function(data) {
            var q = $q.defer();
            $http.get('/api/search/' + data)
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
        getAllCategories: function() {
            var q = $q.defer();
            $http.get('/api/getAllCategories')
                .success(function(data) {
                    q.resolve(data);
                })
                .error(function(data) {
                    q.reject(data);
                });
            return q.promise;
        },
         shareData: function() {
            return shareData;
        },
    };
});

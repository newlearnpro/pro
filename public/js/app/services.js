var app = angular.module('companyApp', ['ui.router', 'ngTouch', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('position', {
            url: '/index/position',
            templateUrl: '../../public/partials/position.html',
        })
        .state('users', {
            url: '/index/users',
            templateUrl: '../../public/partials/users.html',
        })
        .state('addlesson', {
            url: '/index/addlesson',
            templateUrl: '../../public/partials/addlesson.html',
        })
        .state('contacts', {
            url: '/index/contacts',
            templateUrl: '../../public/partials/contacts.html',
        })
        .state('list', {
            url: '/index/list',
            templateUrl: '../../public/partials/list.html',
        })
    $locationProvider.html5Mode(true);
});


app.service('language', function($http, $q) {
    var deffered = $q.defer();
    $http.get('../../public/data/lang.json').success(function(data) {
        $http({
            method: 'POST',
            url: 'admin_lang',
            data: {
                'data': data
            }
        }).success(function(data) {
            deffered.resolve(data);
        }).error(function() {
            deffered.reject("error langage json file");
        });
    });

    this.getLang = function() {
        return deffered.promise;
    }
});
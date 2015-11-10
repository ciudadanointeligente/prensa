var app = angular.module('prensaApp', ['ngRoute','angular.filter'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('newsController', ["$scope", "$http", "$timeout", function ($scope, $http, $timeout){
  get_news = "//api.morph.io/jdgarrido/prensa-spreadsheet-storage/data.json?key=C317BJoPzKOOMj%2B83VbD&query=select%20*%20from%20%27data%27%20order%20by%20fecha%20desc&callback=JSON_CALLBACK"
  $http.jsonp(get_news)
      .then( function (response){
        $scope.allnews = response.data
        var news;
        $scope.allnews2 = []
        var color = {'Radio':'pink', 'TV':'violet', 'Online':'orange' }
        for (news in $scope.allnews){
        	news.color = color[news.tipo_prensa]
        	$scope.allnews2.push(news)
        }
      }, function (response){
        console.log(response)
      })
}]);
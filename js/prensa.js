var app = angular.module('prensaApp', ['ngRoute','angular.filter'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('newsController', ["$scope", "$http", "$timeout", function ($scope, $http, $timeout){
  get_news = "//api.morph.io/jdgarrido/prensa-spreadsheet-storage/data.json?key=C317BJoPzKOOMj%2B83VbD&query=select%20*%20from%20%27data%27%20order%20by%20fecha%20desc&callback=JSON_CALLBACK"
  $http.jsonp(get_news)
      .then( function (response){
        $scope.allnews = response.data
        var i;
        var color = {'radio':'pink', 'radio-online':'pink', 'impreso':'calypso', 'impreso-online':'calypso','tv':'orange', 'tv-online':'orange','online':'purple' }
        var icon_class = {'radio':'fa fa-microphone', 'radio-online':'fa fa-microphone', 'impreso':'fa fa-newspaper-o', 'impreso-online':'fa fa-newspaper-o','tv':'fa fa-television', 'tv-online':'fa fa-television','online':'fa fa-globe' }
        for (i in $scope.allnews){
          var news = $scope.allnews[i]
        	news.color = color[news.tipo_prensa]
          news.icon_class = icon_class[news.tipo_prensa]
        }
      }, function (response){
        console.log(response)
      })
}]);
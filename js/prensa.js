var app = angular.module('prensaApp', ['ngRoute','angular.filter'], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('newsController', ["$scope", "$http", "$timeout", function ($scope, $http, $timeout){
  get_news = "//api.morph.io/ciudadanointeligente/prensa-ci/data.json?key=NB5JgFSb%2FeF87jzVs983&query=select%20*%20from%20'data'%20where%20destacada%20%3D%20%221%22%20order%20by%20fecha%20DESC&callback=JSON_CALLBACK"

    $http.jsonp(get_news)
    .then( function (response){
      $scope.allnews = response.data
      var i;
      var color = {'radio':'pink', 'radio-online':'pink', 'impreso':'calypso', 'impreso-online':'calypso','tv':'orange', 'tv-online':'orange','online':'purple' }
      var icon_class = {'radio':'fa fa-microphone', 'radio-online':'fa fa-microphone', 'impreso':'fa fa-newspaper-o', 'impreso-online':'fa fa-newspaper-o','tv':'fa fa-television', 'tv-online':'fa fa-television','online':'fa fa-globe' }
      var months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
      for (i in $scope.allnews){
        if ($scope.allnews[i]['destacada'] === "1") {
          var news = $scope.allnews[i]
          news.unixtime = $scope.allnews[i]['fecha']
          n_date = new Date(parseInt($scope.allnews[i]['fecha'])).getDate().toString() +'-'+ months[new Date(parseInt($scope.allnews[i]['fecha'])).getMonth()].toString() +'-'+ new Date(parseInt($scope.allnews[i]['fecha'])).getFullYear().toString() //#
          news.format_date = n_date
          news.color = color[news.tipo_prensa.toLowerCase()]
          news.icon_class = icon_class[news.tipo_prensa]
        }
      }
    }, function (response){
      console.log(response)
    })
}]);

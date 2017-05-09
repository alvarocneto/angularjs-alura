/* global angular */

angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams, $resource) {
  $scope.fotos = {}
  $scope.mensagem = ''

  var recursoFoto = $resource('v1/fotos/:fotoId', null, {
    update: {
      method: 'PUT'
    }
  })

  if ($routeParams.fotoId) {
    recursoFoto.get({fotoId: $routeParams.fotoId},
    function (foto) {
      $scope.foto = foto
    }, function (erro) {
      console.log(erro)
      $scope.mensagem = 'Não foi possí­vel alterar a foto'
    })
  }

  $scope.submeter = function () {
    if ($scope.formulario.$valid) {
      if ($scope.foto._id) {
        recursoFoto.update({fotoId: $scope.foto._id}, $scope.foto,
          function () {
            $scope.mensagem = `Foto ${$scope.foto.titulo} alterada com sucesso`
          },
          function (erro) {
            console.log(erro)
            $scope.mensagem = `NÃ£o foi possÃ­vel alterar a foto ${$scope.foto.titulo}`
          })
      } else {
        recursoFoto.save($scope.foto, function () {
          $scope.foto = {}
          $scope.mensagem = 'Foto cadastrada com sucesso'
        }, function (erro) {
          console.log(erro)
          $scope.mensagem = 'Não foi possível cadastrar a foto'
        })
      }
    }
  }
})

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('CitasasignadasCtrl', function($scope,$position,$http,$base64) {
  	$scope.prueba="Esto se carga desde el controlador"
  	$scope.citas = [
  		{
  			tipo:"Medicina General",
  			fecha_hora:"27-11-2015 04:15",
  			medico: "Juan Perez"
  		},{
  			tipo:"Valoración Oral",
  			fecha_hora:"30-11-2015 11:00",
  			medico: "Maria Maria"
  		},{
  			tipo:"Terapia Ocupacional",
  			fecha_hora:"27-11-2015 04:15",
  			medico: "Lastenia Rojas"
  		},
  	]

  	$scope.citaSeleccionada = {
  			tipo:"",
  			fecha_hora:"",
  			medico: ""
  		}

      var user = "paciente"
      var pass = "paciente"
      var authBase64 = user+":"+pass
    $scope.cargarCitas = function(){
          console.log($base64.encode(authBase64))
    }
  	$scope.detalleCita = function(cita){
		//alert(JSON.stringify(cita));
  		$scope.citaSeleccionada = cita
  	}
  	$scope.generarTurno = function(){
      console.log($base64.encode(authBase64))
  		//alert(JSON.stringify($scope.citaSeleccionada))
  	}
  });

'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('solicitudTurnoCtrl', function($scope,$position,$http,$base64) {
	$scope.consultarCitas = function(){


		var postData = {
			"tipo_doc":$scope.formdata.tipo_documento,
			"doc":$scope.formdata.documento
		}

				$scope.citas = []

                $http({
			        url: 'http://localhost:9090/sct/Appointments/listAppointmentsByPatient',
			        method: "POST",
			        data: JSON.stringify(postData),
			        withCredentials: true,
			        headers: {
			            'Authorization': 'Basic '+$base64.encode("paciente:paciente")
			        }
			    }).success(function (result) {
                    console.log(result)
                    $scope.citas = result
                    
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });
	}


		$scope.prueba="Esto se carga desde el controlador"
		  	$scope.citas = [
		  		/*{
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
		  		},*/
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


		$scope.hayCitas = function(){
			return $scope.citas.length > 0
		}


  });

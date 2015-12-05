'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('medicoCtrl', function($scope,$position,$http,$base64) {
    $scope.turnoSeleccionado = {}
  	$scope.listadoPacientesConTurno = function(){
  			

				$scope.pacientes = []

            $http({
			        url: 'http://localhost:9090/sct/turns/listPatientsbyAttention',
			        method: "POST",
			        data: "",
			        withCredentials: true,
			        headers: {
			            'Authorization': 'Basic '+$base64.encode("doctor:doctor")
			        }
			    }).success(function (result) {
                    console.log(result)
                    $scope.pacientes = result
                    
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });
  	}

  	$scope.listadoPacientesConTurno()


      $scope.detalleTurno = function(turno){
        //alert(JSON.stringify(turno));
          $scope.turnoSeleccionado = turno;
          $scope.turnoSeleccionado.pagado = 0;
        }
        $scope.hayPago = function(){
          return $scope.turnoSeleccionado.pagado != 0;
        }
        $scope.pagarTurno = function(){
          var postData = {
          "turn_id":$scope.turnoSeleccionado.id
        }

        $http({
              url: 'http://localhost:9090/sct/Turns/finalizarCita',
              method: "POST",
              data: JSON.stringify(postData),
              withCredentials: true,
              headers: {
                  'Authorization': 'Basic '+$base64.encode("doctor:doctor")
              }
          }).success(function (result) {
                    console.log(result)
                    if(result != 0){
                      $scope.listadoPacientesConTurno()
                      $scope.turnoSeleccionado.pagado = result;
                    }
                  else{
                    alert("Cita no Finalizada (sql).")
                  }
                    
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });


        }
  });

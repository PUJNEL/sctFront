'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('cajeroCtrl', function($scope,$position,$http,$base64) {
    $scope.turnoSeleccionado = {}
  	$scope.listadoPacientesConTurno = function(){
  			

				$scope.pacientes = []

            $http({
			        url: 'http://localhost:9090/sct/turns/listPatientsBYTurn',
			        method: "POST",
			        data: "",
			        withCredentials: true,
			        headers: {
			            'Authorization': 'Basic '+$base64.encode("cajero:paciente")
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
          "turn_id":$scope.turnoSeleccionado.id,
          "cashier_id":sessionStorage.getItem("user_id")
        }

        $http({
              url: 'http://localhost:9090/sct/Turns/pagarTurno',
              method: "POST",
              data: JSON.stringify(postData),
              withCredentials: true,
              headers: {
                  'Authorization': 'Basic '+$base64.encode("cajero:paciente")
              }
          }).success(function (result) {
                    console.log(result)
                    if(result != 0){
                      $scope.listadoPacientesConTurno()
                      $scope.turnoSeleccionado.pagado = result;
                    }
                  else{
                    alert("Turno no pagado (sql).")
                  }
                    
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });


        }
  });

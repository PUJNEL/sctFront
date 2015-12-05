'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope,$position,$http,$base64,$location) {
  	$scope.user = ""
  	$scope.password =""
  	$scope.login = function(){

  		var postData = {
  			username: $scope.user,
  			password: $scope.password
  		}


  		

                $http({
			        url: 'http://localhost:9090/sct/users/loginverify',
			        method: "POST",
			        data: JSON.stringify(postData),
			        withCredentials: true,
			        headers: {
			            'Authorization': 'Basic '+$base64.encode($scope.user+":"+$scope.pass)
			        }
			    }).success(function (result) {
                    console.log(result)
                    if(result.error != undefined){
                    	alert("Error de autenticacion, intenten de nuevo")

                    	
                    }else{
                    	sessionStorage.setItem("group_id",result.group);
		    			sessionStorage.setItem("token",$base64.encode($scope.user+":"+$scope.pass));
		    			if(result.group == 1) // paciente
		  					$location.path("/dashboard/citas");
                    	if(result.group == 2) // doctor
		  					$location.path("/dashboard/doctor");
		  				if(result.group == 3) // cajero
		  					$location.path("/dashboard/cajero");
                    }
                }).error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                });


	}

  });
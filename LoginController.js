const localUrl = 'http://localhost:3000';
angular.module("myApp")
    .controller("LoginController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $window.loged = false;

        $scope.submit = function () {
            const url = `${localUrl}/LogIn`;
            const data = {username: $scope.uname, password: $scope.password};
            $http.post(url, data).then($scope.successLogin, $scope.errorLogin);
        }

        $scope.successLogin = function(response){
            if(response && response.data && response.data.token && response.data.full_name){
                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('full_name', response.data.full_name);
                $window.loged = true;
                $scope.getHelloName();
            }
            else{
                $scope.errorLogin("");
            }
        }
        $scope.errorLogin = function(errorResponse) {
            if(errorResponse && (errorResponse.status == 401)){
                $scope.errors =  [{ key: 'errorInLogin', value: errorResponse.data }];
            }
            else
                $scope.errors =  [{ key: 'errorInLogin', value: 'Oops we have a problem. Please try again later.'}];
        }

        $scope.getHelloName = function(){
            if($window.loged) {
                return $window.sessionStorage.full_name;
            }
            else return "Guest";
        }

    }]);
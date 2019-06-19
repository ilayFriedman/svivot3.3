const localUrl = 'http://localhost:3000';
angular.module("myApp")
    .controller("LoginController", ['$scope', '$http', '$window','$rootScope','$location', function ($scope, $http, $window,$rootScope,$location) {
        $rootScope.loged = false;
        $scope.resPass = false;
        $scope.showLoginForm = true;
        $scope.restoredPsw;
        $scope.submit = function () {
            const url = `${localUrl}/LogIn`;
            const data = {username: $scope.uname, password: $scope.password};
            $http.post(url, data).then($scope.successLogin, $scope.errorLogin);
        }
        $scope.restore_Password = function(){
            const url = `${localUrl}/RestorePassword`;
            const data = {username: $scope.username, question: $scope.questions, answer: $scope.answer};
            $http.post(url, data).then($scope.successRestore, $scope.errorRestore);
        }
        $scope.goToRestore = function(){
            $scope.resPass = true;
            $scope.showLoginForm = false;
        }
        $scope.back = function(){
            $scope.resPass = false;
            $scope.showLoginForm = true;
        }


        // Login answers from server:
        $scope.successLogin = function (response) {
            if (response && response.data && response.data.token && response.data.full_name) {
                $window.sessionStorage.setItem('token', response.data.token);
                $window.sessionStorage.setItem('full_name', response.data.full_name);
                $rootScope.loged = true;
                $rootScope.welcomePath = '#!LogInHome'
                // $window.location.href = "#!/LogInHome"
                $location.url('/LogInHome');
            } else {
                $scope.errorLogin("");
            }
        }
        $scope.errorLogin = function (errorResponse) {
            if (errorResponse && (errorResponse.status == 401)) {
                $scope.errors = [{key: 'errorInLogin', value: errorResponse.data}];
            } else
                $scope.errors = [{key: 'errorInLogin', value: 'Oops we have a problem. Please try again later.'}];
        }

        // Restore answers from server:
        $scope.successRestore = function (response) {
            $scope.restoredPsw = response.data[0].password;
        }
        $scope.errorRestore = function (errorResponse) {
            alert(errorResponse.data)
        }

        //
        //
        // $scope.getHelloName = function () {
        //     if ($window.loged) {
        //         return $window.sessionStorage.full_name;
        //     } else return "Guest";
        // }

    }]);
angular.module("myApp")
    .controller("registerController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $scope.submit = function () {
            const jsonToAns ={
                username: $scope.username,
                password: $scope.psw,
                passQuestion: [{q:'elementary school', ans: $scope.Q1}, {q:'mommys mother', ans: $scope.Q2}],
                city: $scope.city,
                country: $scope.countries,
                email: $scope.email,
                firstName: $scope.Fname,
                lastName: $scope.Lname,
                categories: $scope.categories
            }

            // Http connection
            const url = `${localUrl}/Register`;
            const data = jsonToAns;
            $http.post(url,data).then($scope.successRegister, $scope.errorRegister);
        }
        $scope.successRegister = function(response){
            if(response.status == 200){
                $window.location.href = "#!/LogIn"
                alert("Successfully Registered! you can now log in.")
            }
            else{
                $scope.errorRegister("");
            }
        }

        $scope.errorRegister = function (errorResponse) {
            if(errorResponse && (errorResponse.status == 500 || errorResponse.status == 400)){
                $scope.errors =  [{ key: 'errorInLogin', value: errorResponse.data }];
            }
            else
                $scope.errors =  [{ key: 'errorInLogin', value: 'Oops we have a problem. Please try again later.'}];
        }

    }])

//{"username": String, "password": String, "passQuestion":{"q": String, "ans": String},
// "city": String, "country": String, "e-mail": String, "firstName" :String, "lastName": String, "categories": string[]}
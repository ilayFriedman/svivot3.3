angular.module("myApp")
    .controller("registerController", function ($scope, $http) {
        $scope.submit = function () {
            var x =  document.getElementById("categories");
            let selectedValues = Array.from(x.selectedOptions).map(option => option.value)
            var curr = x.options;
            for (var i =0 ; i<selectedValues.length; i++){
                $scope.answer = "Submitted! you entered: " + selectedValues[i];
                console.log(selectedValues[i]);


            }
            console.log($scope.categories.toString());

            var jsonToAns ={
                username: $scope.username,
                password: $scope.psw,
                passQuestion: [{q: $scope.Q1, ans: $scope.A1}, {q:$scope.Q2, ans: $scope.A2}],
                city: $scope.city,
                country: $scope.countries,
                email: $scope.email,
                firstName: $scope.Fname,
                lastName: $scope.Lname,
                categories: $scope.categories
            }
        };


    })

//{"username": String, "password": String, "passQuestion":{"q": String, "ans": String},
// "city": String, "country": String, "e-mail": String, "firstName" :String, "lastName": String, "categories": string[]}
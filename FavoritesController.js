angular.module("myApp")
    .controller("FavoritesController", ['$scope', '$http', '$window', '$rootScope', '$sce',
        function ($scope, $http, $window, $rootScope, $sce) {
            //$rootScope.favorites = JSON.parse($window.sessionStorage.allUserFavorites);
            // const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
            // $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then(successFavorites, errorFavorites);
            //
            //
            // function successFavorites(response) {
            //     if (response && response.data) {
            //         $scope.favorites = response.data;
            //     } else {
            //         errorFavorites("");
            //     }
            // }
            //
            // function errorFavorites(errorResponse) {
            //     if (errorResponse && (errorResponse.status == 401)) {
            //         $scope.errors = [{key: 'errorInFav', value: errorResponse.data}];
            //     } else
            //         $scope.errors = [{
            //             key: 'errorInFav',
            //             value: 'Oops we have a problem. Please try again later.'
            //         }];
            // }

            // $scope.removeToFavorites = function (poi) {
            //     console.log(poi.NamePOI)
            //     $scope.currPOI = poi;
            //     const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
            //     $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then($scope.successRemove, $scope.errorRemove);
            //
            // }
            //
            // $scope.successRemove = function (response) {
            //     if (response && response.data) {
            //         console.log(response.data)
            //         $scope.userFavorites = [];
            //         for (var i = 0; i < response.data.length; i++) {
            //             if (response.data[i].NamePOI != $scope.currPOI.NamePOI) {
            //                 $scope.userFavorites.push({
            //                     NamePOI: response.data[i].NamePOI,
            //                     modDate: response.data[i].indexForUser
            //                 })
            //             }
            //
            //         }
            //         // $scope.date = new Date().toLocaleString().replace(', ', ' ').replace(/PM AM\..*$/, '');
            //         // $scope.userFavorites.push({NamePOI: $scope.currPOI.NamePOI, modDate: $scope.date});
            //         const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
            //         $http.put(`${localUrl}/private/updateAllFavorites`, $scope.userFavorites, headers).then($scope.successRemoveFavorites, $scope.errorRemoveFavorites);
            //         $window.numOfFavorites--;
            //
            //     } else {
            //         $scope.errorRemove("");
            //     }
            // }
            //
            // $scope.errorRemove = function (errorResponse) {
            //     if (errorResponse && (errorResponse.status == 401)) {
            //         $scope.errors = [{key: 'errorInFav', value: errorResponse.data}];
            //     } else
            //         $scope.errors = [{
            //             key: 'errorInFav',
            //             value: 'Oops we have a problem. Please try again later.'
            //         }];
            // }
            // $scope.successRemoveFavorites = function (Response) {
            //     alert("The POI has added to your favorites")
            //     const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
            //     $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then(successFavorites, errorFavorites);
            //
            // }
            // $scope.errorRemoveFavorites = function (Response) {
            //     alert("not added")
            // }
            $scope.myFavorites = $rootScope.favorites;
            $scope.isInFavorites = function (poi) {
                // $rootScope.favorites = JSON.parse($window.sessionStorage.allUserFavorites);
                return $rootScope.userFavorites.find((favorite) => favorite.NamePOI === poi.NamePOI) !== undefined
            }
            $scope.addToFavorites = function (poi) {
                console.log(poi.NamePOI)
                // $scope.favorites = JSON.parse($window.sessionStorage.allUserFavorites);
                if ($scope.isInFavorites(poi)) {
                    $rootScope.userFavorites = $rootScope.userFavorites.filter((favorite) => favorite.NamePOI !== poi.NamePOI);
                } else {
                    $rootScope.userFavorites.push({NamePOI: poi.NamePOI, modDate: new Date()});
                }
                // var checkBoxPOI = document.getElementById("clicked" + poi.NamePOI);
                // for (var i = 0; i < $scope.favorites.length; i++) {
                //     if (checkBoxPOI == true && poi.NamePOI != $scope.favorites[i].NamePOI)
                //         $scope.userFavorites.push({
                //             NamePOI: $scope.favorites[i].NamePOI,
                //             modDate: $scope.favorites[i].indexForUser
                //         })
                // }
                // $scope.date = new Date();
                // if (checkBoxPOI == true){
                //
                // }
                // const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                // $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then($scope.successFavorites, $scope.errorFavorites);

            }
            $scope.updateAllFavorites = function () {
                const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                $http.put(`${localUrl}/private/updateAllFavorites`, $rootScope.userFavorites, headers).then($scope.successAddFavorites, $scope.errorAddFavorites);
                $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then($scope.successFavorites, $scope.errorFavorites);
            }

            $scope.successFavorites = function (response) {
                $rootScope.favorites = response.data;
                $rootScope.userFavorites = [];
                for (var i = 0; i < $rootScope.favorites.length; i++) {
                    $rootScope.userFavorites.push({
                        NamePOI: $rootScope.favorites[i].NamePOI,
                        modDate: $rootScope.favorites[i].indexForUser
                    })
                }
                $window.numOfFavorites = response.data.length;
            }
            $scope.errorFavorites = function (response) {}

            $scope.successAddFavorites = function (Response) {
                alert("The POI has added to your favorites")
            }
            $scope.errorAddFavorites = function (Response) {
                alert("not added")
            }
            $scope.onclick = function (poi, name) {
                var data2 = {NamePOI: poi.NamePOI};
                var namePoi = {namePoi: poi.NamePOI};
                $http.put(`${localUrl}/addOneView`,namePoi).then($scope.successAddView, $scope.errorSAddView);
                $http.post(`${localUrl}/getLastReviews`, data2).then($scope.successReviews, $scope.errorReviews);
                var modal = document.getElementById(name + poi.NamePOI);
                modal.style.display = "block";
            }

            $scope.successAddView = function (response) {

            }
            $scope.errorSAddView = function (response) {
                alert(response.data)
            }

            $scope.onXClickSearch = function (poi, name) {
                var modal = document.getElementById(name + poi);
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                for (var i = 0; i < $scope.favorites.length; i++) {
                    var modal = document.getElementById("myModalSearch" + $scope.favorites[i].NamePOI);
                    if (event.target === modal) {
                        try {
                            modal.style.display = "none";
                        } catch (e) {

                        }
                    }
                }
            }
            window.addEventListener("keydown", function (event) {
                //if ($scope.POIs) {
                for (var i = 0; i < $scope.favorites.length; i++) {
                    var modal = document.getElementById("myModalSearch" + $scope.favorites[i].NamePOI);
                    if (event.code == "Escape") {
                        try {
                            modal.style.display = "none";
                        } catch (e) {

                        }

                    }
                }
                // }
            });


        }]); // end of page
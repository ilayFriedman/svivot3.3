angular.module("myApp")
    .controller("POISController",
        ['$scope', '$http', '$window', '$rootScope', '$location',
            function ($scope, $http, $window, $rootScope, $location) {
                $http.get(`${localUrl}/orderByRank`).then(successAllPOI, errorAllPOI);
                $scope.ranked;
                $scope.rank = false;

                function successAllPOI(response) {
                    $scope.ranked = angular.copy(response.data)
                    // $scope.ranked = response.data;
                    $scope.allPOIs = response.data;
                    $scope.allPOIs.sort((a, b) => (a.NamePOI > b.NamePOI) ? 1 : ((b.NamePOI > a.NamePOI) ? -1 : 0));
                }

                function errorAllPOI(response) {
                    alert(response.data)
                }


                $scope.sortByCategory = function () {
                    var data2 = {categoryID: $scope.categories};
                    $http.post(`${localUrl}/sortByCategory`, data2).then($scope.successCat, $scope.errorCat);
                }

                $scope.successCat = function (response) {
                    $scope.categorySorted = response.data;
                }
                $scope.errorCat = function (response) {
                    alert("shit category")
                }

                $scope.byRank = function(){
                    if($scope.rank == false){
                        $scope.rank = true;
                    }
                    else $scope.rank = false;
                }

                $scope.addToFavorites = function (poi) {
                    console.log(poi.NamePOI)
                    $scope.currPOI = poi;
                    const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                    $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then($scope.successFavorites, $scope.errorFavorites);

                }

                $scope.successFavorites = function (response) {
                    if (response && response.data) {
                        console.log(response.data)
                        $scope.userFavorites = [];
                        for (var i = 0; i<response.data.length; i++){
                            $scope.userFavorites.push({NamePOI: response.data[i].NamePOI, modDate: response.data[i].indexForUser})
                        }
                        $scope.date = new Date().toLocaleString().replace(', ', ' ').replace(/PM AM\..*$/, '');
                        $scope.userFavorites.push({NamePOI: $scope.currPOI.NamePOI, modDate: $scope.date});
                        const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                        $http.put(`${localUrl}/private/updateAllFavorites`, $scope.userFavorites, headers).then($scope.successAddFavorites, $scope.errorAddFavorites);
                        $window.getNum(1);

                    } else {
                        $scope.errorFavorites("");
                    }
                }

                $scope.errorFavorites = function (errorResponse) {
                    if (errorResponse && (errorResponse.status == 401)) {
                        $scope.errors = [{key: 'errorInFav', value: errorResponse.data}];
                    } else
                        $scope.errors = [{
                            key: 'errorInFav',
                            value: 'Oops we have a problem. Please try again later.'
                        }];
                }

                $scope.successAddFavorites = function (Response) {
                    alert("The POI has added to your favorites")
                }
                $scope.errorAddFavorites = function (Response) {
                    alert("not added")
                }

                $scope.onclick = function (poi, name) {
                    var data2 = {NamePOI: poi.NamePOI};
                    $http.post(`${localUrl}/getLastReviews`, data2).then($scope.successReviews, $scope.errorReviews);
                    var modal = document.getElementById(name + poi.NamePOI);
                    modal.style.display = "block";
                }

                $scope.onXClickSearch = function (poi, name) {
                    var modal = document.getElementById(name + poi);
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    for (var i = 0; i < $scope.allPOIs.length; i++) {
                        var modal = document.getElementById("myModalSearch" + $scope.allPOIs[i].NamePOI);
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
                    for (var i = 0; i < $scope.allPOIs.length; i++) {
                        var modal = document.getElementById("myModalSearch" + $scope.allPOIs[i].NamePOI);
                        if (event.code == "Escape") {
                            try {
                                modal.style.display = "none";
                            } catch (e) {

                            }

                        }
                    }
                    // }
                });

            }]);

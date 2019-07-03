angular.module("myApp")
    .controller("POISController",
        ['$scope', '$http', '$window', '$rootScope', '$location',
            function ($scope, $http, $window, $rootScope, $location) {
                $http.get(`${localUrl}/orderByRank`).then(successAllPOI, errorAllPOI);
                $scope.ranked;
                $scope.rank = false;
                // $scope.userFavorites = [];
                // $scope.reviewText = "";
                // $scope.numRank = "";

                function successAllPOI(response) {
                    $scope.ranked = angular.copy(response.data)
                    // $scope.ranked = response.data;
                    $scope.allPOIs = response.data;
                    $scope.allPOIs.sort((a, b) => (a.CategoryID > b.CategoryID) ? 1 : ((b.CategoryID > a.CategoryID) ? -1 : 0));
                }

                function errorAllPOI(response) {
                    alert(response.data)
                }


                $scope.sortByCategory = function () {
                    $scope.byCat = true;
                    var data2 = {categoryID: $scope.categories};
                    $http.post(`${localUrl}/sortByCategory`, data2).then($scope.successCat, $scope.errorCat);
                    //$scope.rank = false;
                }

                $scope.successCat = function (response) {
                    $scope.categorySorted = response.data;

                }
                $scope.errorCat = function (response) {
                    alert("shit category")
                }

                $scope.byRank = function () {
                    $scope.byCat = false;
                    if ($scope.rank == false) {
                        $scope.rank = true;
                    } else $scope.rank = false;
                }

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
                    $http.post(`${localUrl}/private/getAllFavorites`, null, headers).then($scope.successFavorites,  $scope.errorFavorites);
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


                $scope.addReview = function (poi) {
                    console.log(poi.NamePOI);
                    var modal = document.getElementById("addReview" + poi.NamePOI);
                    modal.style.display = "block";
                }

                $scope.sendReview = function (poi) {
                    const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                    var numRank = this.numRank;
                    // var selector = document.getElementById('numRank'+poi.NamePOI);
                    // var value = selector[selector.selectedIndex].value;
                    // console.log(value)
                    var text = this.reviewText;
                    const dataR = {namePoi: poi.NamePOI, myRank: numRank};
                    $http.put(`${localUrl}/addRank`, dataR).then($scope.successSendRank, $scope.errorSendRank);
                    const dataText = {namePoi: poi.NamePOI, myReview: text};
                    $http.put(`${localUrl}/private/addReview`, dataText, headers).then($scope.successSendText, $scope.errorSendText);

                }


                $scope.successSendText = function (response) {
                    alert("text send")
                }
                $scope.errorSendText = function (response) {
                    alert("text error")
                }

                $scope.successSendRank = function (response) {
                    alert("rank send")
                }
                $scope.errorSendRank = function (response) {
                    alert("rank error")
                }

                // $scope.successFavorites = function (response) {
                //     // if (response && response.data) {
                //     //     console.log(response.data)
                //
                //     for (var i = 0; i < response.data.length; i++) {
                //         $scope.userFavorites.push({
                //             NamePOI: response.data[i].NamePOI,
                //             modDate: response.data[i].indexForUser
                //         })
                //     }
                //     $scope.date = new Date();
                //     $scope.userFavorites.push({NamePOI: $scope.currPOI.NamePOI, modDate: $scope.date});
                //     const headers = {headers: {"x-auth-token": $window.sessionStorage.token}}
                //     $http.put(`${localUrl}/private/updateAllFavorites`, $scope.userFavorites, headers).then($scope.successAddFavorites, $scope.errorAddFavorites);
                //     $window.numOfFavorites++;
                //
                //     // } else {
                //     //     $scope.errorFavorites("");
                //     // }
                // }
                //
                // $scope.errorFavorites = function (errorResponse) {
                //     if (errorResponse && (errorResponse.status == 401)) {
                //         $scope.errors = [{key: 'errorInFav', value: errorResponse.data}];
                //     } else
                //         $scope.errors = [{
                //             key: 'errorInFav',
                //             value: 'Oops we have a problem. Please try again later.'
                //         }];
                // }

                $scope.successAddFavorites = function (Response) {
                    alert("The POI has added to your favorites")
                }
                $scope.errorAddFavorites = function (Response) {
                    alert("not added")
                }

                $scope.onclick = function (poi, name) {
                    var data2 = {NamePOI: poi.NamePOI};
                    $http.post(`${localUrl}/getLastReviews`, data2).then($scope.successReviews, $scope.errorReviews);
                    var namePoi = {namePoi: poi.NamePOI};
                    $http.put(`${localUrl}/addOneView`, namePoi).then($scope.successAddView, $scope.errorSAddView);
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

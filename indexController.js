angular.module("myApp").controller("indexController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {

    // Login checker
    $scope.connectionStatus = function () {
        if ($window.loged) {
            return true;
        } else {
            return false;
        }
    };

    $scope.helloName = function () {
        if ($scope.connectionStatus()) {   // connected!!

            return $window.sessionStorage.full_name;
        } else {
            return "Guest";     // not connected!
        }
        ;
    };
    $scope.donePost = false;
    // random POI:
    $scope.clicked1 = false;
    $scope.clicked2 = false;
    $scope.clicked3 = false;
    $scope.categoryJSON = {
        1: "Architecture",
        2: "Museums",
        3: "Shopping",
        4: "Restaurants"
    }
    $scope.POIs;
    const url = `${localUrl}/getRandomPOI`;
    $http.get(url).then(successRandom, errorRandom);

    function successRandom(response) {
        $scope.POIs = response.data;
    }

    function errorRandom(response) {
        alert(response.data)
    }

    $scope.onclick = function (poi, index, type) {
        var closeBtn = document.getElementById("closeDet1");
        var det = document.getElementById('details');
            if (index == 0) {
                $scope.name1 = $sce.trustAsHtml('<div class="modal-content"><h1>' + poi.NamePOI + '</h1><p>' +
                    '<br>' +
                    'Category: ' + $scope.categoryJSON[Number(poi.CategoryID)] +
                    '<br>' +
                    'Location: ' + poi.Location +
                    '<br>' +
                    'Details: ' + poi.Details +
                    '<br>' +
                    'Rank: ' + poi.Rank +
                    '<br>' +
                    'Number Of Viewers: ' + poi.NumOfViews + '<br></p></div>');
                //var det1 = document.getElementById('details');
                det.style.display = "block";
                $scope.clicked2 = false;
                $scope.clicked3 = false;
                $scope.clicked1 = true;
                closeBtn.onclick = function () {
                    det.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == det) {
                        det.style.display = "none";
                    }
                }
                window.addEventListener("keydown", function (event) {
                    if (event.code == "Escape") {
                        det.style.display = "none";
                    }
                });

            } else if (index == 1) {

                $scope.name2 = $sce.trustAsHtml('<div class="modal-content"><h1>' + poi.NamePOI + '</h1><p> ' +
                    '<br>' +
                    'Category: ' + $scope.categoryJSON[Number(poi.CategoryID)] +
                    '<br>' +
                    'Location: ' + poi.Location +
                    '<br>' +
                    'Details: ' + poi.Details +
                    '<br>' +
                    'Rank: ' + poi.Rank +
                    '<br>' +
                    'Number Of Viewers: ' + poi.NumOfViews +
                    '<br>' +
                    '</p></div>');

                det.style.display = "block";
                $scope.clicked1 = false;
                $scope.clicked3 = false;
                $scope.clicked2 = true;

                closeBtn.onclick = function () {
                    det.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == det) {
                        det.style.display = "none";
                    }
                }
                window.addEventListener("keydown", function (event) {
                    if (event.code == "Escape") {
                        det.style.display = "none";
                    }
                });


            } else if (index == 2) {
                $scope.name3 = $sce.trustAsHtml('<div class="modal-content"><h1>' + poi.NamePOI + '</h1><p> ' +
                    '<br>' +
                    'Category: ' + $scope.categoryJSON[Number(poi.CategoryID)] +
                    '<br>' +
                    'Location: ' + poi.Location +
                    '<br>' +
                    'Details: ' + poi.Details +
                    '<br>' +
                    'Rank: ' + poi.Rank +
                    '<br>' +
                    'Number Of Viewers: ' + poi.NumOfViews + '<br></p></div>');
                // var det3 = document.getElementById('details');
                det.style.display = "block";
                $scope.clicked1 = false;
                $scope.clicked2 = false;
                $scope.clicked3 = true;

                closeBtn.onclick = function () {
                    det.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target == det) {
                        det.style.display = "none";
                    }
                }
                window.addEventListener("keydown", function (event) {
                    if (event.code == "Escape") {
                        det.style.display = "none";
                    }
                });
            }





    }


}]); // controller end




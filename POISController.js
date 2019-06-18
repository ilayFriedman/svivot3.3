angular.module("myApp")
    .controller("POISController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
        $scope.clicked1 = false;
        $scope.clicked2 = false;
        $scope.clicked3 = false;
        $scope.categoryJSON = {
            1: "Architecture",
            2: "Museums",
            3: "Shopping",
            4: "Restaurants"
        }
        const url = `${localUrl}/getRandomPOI`;
        $http.get(url).then(successRandom, errorRandom);

        $scope.POIs;

        function successRandom(response) {
            $scope.POIs = response.data;
        }


        function errorRandom(response) {
            alert("Error in DB")
        }

        $scope.onclick = function (poi, index) {
            var closeBtn = document.getElementById("closeDet1");
            if(index == 0){
                if($scope.clicked1 == false){
                    $scope.name1 = $sce.trustAsHtml('<p class="modal-content">' +
                        '<br>' +
                        'Category: ' + $scope.categoryJSON[Number(poi.CategoryID)] +
                        '<br>' +
                        'Location: ' + poi.Location +
                        '<br>' +
                        'Details: ' + poi.Details +
                        '<br>' +
                        'Rank: ' + poi.Rank +
                        '<br>' +
                        'Number Of Viewers: ' + poi.NumOfViews + '<br></p>');
                    var det1 = document.getElementById('details');
                    det1.style.display = "block";

                    $scope.clicked2 = false;
                    $scope.clicked3 = false;
                    $scope.clicked1 = true;
                    closeBtn.onclick = function() {
                        det1.style.display = "none";
                    }
                }
                else{
                    $scope.clicked1 = false;
                }
            }
            else if (index == 1){
                if($scope.clicked2 == false){
                    $scope.name2 = $sce.trustAsHtml('<p class="modal-content"> ' +
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
                        '</p>');
                    var det2 = document.getElementById('details');
                    det2.style.display = "block";
                    $scope.clicked1 = false;
                    $scope.clicked3 = false;
                    $scope.clicked2 = true;

                    closeBtn.onclick = function() {
                        det2.style.display = "none";
                    }

                }
                else{
                    $scope.clicked2 = false;
                }
            }
            else if (index == 2){
                if($scope.clicked3 == false){
                    $scope.name3 = $sce.trustAsHtml('<p class="modal-content"> ' +
                        '<br>' +
                        'Category: ' + $scope.categoryJSON[Number(poi.CategoryID)] +
                        '<br>' +
                        'Location: ' + poi.Location +
                        '<br>' +
                        'Details: ' + poi.Details +
                        '<br>' +
                        'Rank: ' + poi.Rank +
                        '<br>' +
                        'Number Of Viewers: ' + poi.NumOfViews+'<br></p>');
                    var det3 = document.getElementById('details');
                    det3.style.display = "block";
                    $scope.clicked1 = false;
                    $scope.clicked2 = false;
                    $scope.clicked3 = true;

                    closeBtn.onclick = function() {
                        det3.style.display = "none";
                    }
                }
                else{
                    $scope.clicked3 = false;
                }
            }


        }

    }]);
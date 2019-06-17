angular.module("myApp")
    .controller("POISController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
        $scope.clicked = false;
        const url = `${localUrl}/getRandomPOI`;
        $http.get(url).then(successRandom, errorRandom);


        function successRandom(response) {
            $scope.POIs = response.data;
        }

        function errorRandom(response) {
            alert("ASDFsdf")
        }

        $scope.onclick = function () {
            $scope.clicked = true;
        }


        // clickable divs:
        $scope.poiDiv = document.getElementById("poi_Div");

        //When the user clicks the button, open the modal

        // $scope.onclick = function(NamePOI) {
        //     // $scope.divText = '<span class="close">&times;</span><h2>'+$scope.POIs[0].NamePOI+'</h2><br><br><p id="content">Category: {{poi.CategoryID}}<br>{{poi.Location}}<br>{{poi.Details}}<br>Rank: {{poi.Rank}}<br>Number Of Viewers: {{poi.numOfViews}}br></p>';
        //     // document.getElementById("poiName").innerHTML = $scope.POIs[NamePOI].NamePOI;
        //     $scope.divToShow = null;
        //     $scope.divToShow = document.getElementById("divTOshow");
        //     $scope.divToShow.style.display = "block";
        // }
        var span = document.getElementsByClassName("close");
        // When the user clicks on <span> (x), close the modal

        span.onclick = function() {
            $scope.divToShow = document.getElementById("divTOshow");
            $scope.divToShow.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            $scope.divToShow = document.getElementById("divTOshow");
            if (event.target == $scope.divToShow) {

                $scope.divToShow.style.display = "none";
            }
        }
        window.addEventListener("keydown", function(event){
            if(event.code == "Escape"){
                $scope.divToShow = document.getElementById("divTOshow");
                $scope.divToShow.style.display = "none";
            }
        });

        // $scope.POIs = response.data;
    }]);
angular.module("myApp")
    .controller("registerController", function ($scope) {
        function loadXMLDoc() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    myFunction(this);
                }
            };
            xmlhttp.open("GET", "./countries.xml", true);
            xmlhttp.send();
        }
        loadXMLDoc();

        function myFunction(xml) {
            var x, i, xmlDoc, txt;
            xmlDoc = xml.responseXML;
            txt = [];
            x = xmlDoc.getElementsByTagName("Name");
            for (i = 0; i < x.length; i++) {
                txt.push(x[i].childNodes[0].nodeValue)
                console.log(txt[i]);
            }
            // document.getElementById("demo").innerHTML = txt[0];
            console.log(txt);
            var x = document.getElementById("countries");
            for (var i = 0; i < txt.length; i++) {
                var option = document.createElement("option");
                option.value = txt[i];
                option.text = txt[i];
                x.appendChild(option);
            }
        }



        $scope.submit = function(){
            $scope.answer = "Submitted! you entered: " + $scope.uname
        };


    });
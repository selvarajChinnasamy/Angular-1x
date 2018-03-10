angular.module('sharing')
    .service('Holder', function ($rootScope,$http,$q) {
            this.Change =  function () {
                $rootScope.$broadcast("namechanged", 5);
        }
        this.httpCalls = function(){
            return $q.all([$http.get('https://www.w3schools.com/angular/customers.php'),$http.get('https://www.w3schools.com/angular/customers.php')]);
        }
    });

angular.module('sharing')
    .controller('ChildCtrl', function (Holder, $scope) {
        $scope.name = 10;
        $scope.$on("namechanged", function (event, name) {
            $scope.name++;
        });
        $scope.increment = function () {
             $scope.name++;
            Holder.Change();
        };
    });

angular.module('sharing')
    .controller('ChildCtrl1', function (Holder, $scope) {
        $scope.name = 5;
        $scope.$on("namechanged", function (event, name) {
            $scope.name++;
        });
        $scope.HttpCall = function (){
            Holder.httpCalls().then(response =>{
                 console.log(response[0].data);
                $scope.userData = response[0].data.records;
            },function(err){
                console.log(err);
            });
        }
    });
'use strict';

/**
 * @ngdoc function
 * @name mercedesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mercedesApp
 */


var warningLowFuel = "Nearby gas stations";
var warningHighSpeed = "Excessive speed";


angular.module('mercedesApp')
  .controller('MainCtrl', function ($scope) {
    console.log("in MainCtrl");



    $scope.warning = "comon";
    $scope.showWarning = false;
    var gageSpeed;
    var gageBattery;
    var gageFuel;


    var checkWarnings = function(data) {
      var car = data.Car;
      var carSpeed = car.Vehicle_Speed;
      var carBattery = car.Battery_Level;
      var carFuel = car.Fuel_Level;

      console.log("in checkWarnings");
      console.log("carFuel = " + carFuel);

      if(carFuel <= 25) {
        $scope.showWarning = true;
        $scope.warning = warningLowFuel;
        console.log("update scope");
      } else if(carSpeed > 60) {
        $scope.showWarning = true;
        $scope.warning = warningHighSpeed;
      } else {
        $scope.showWarning = false;
        $scope.warning = "No warning";
      }

      $scope.$apply();
      console.log("warning: " + $scope.warning + ", showwarning: " + $scope.showWarning);
    }


     var ref = new Firebase("https://benkpak.firebaseio.com/");
       
      ref.on("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data.Car); 

        var car = data.Car;
        $scope.carSpeed = Math.round(car.Vehicle_Speed);
        $scope.carBattery = Math.round(car.Battery_Level);
        $scope.carFuel = Math.round(car.Fuel_Level);
        //$scope.carBattery

        console.log("speed: " + $scope.carSpeed);
        gageSpeed.refresh($scope.carSpeed);
        gageBattery.refresh($scope.carBattery);
        gageFuel.refresh($scope.carFuel);
        
        checkWarnings(data);
      });
      


     $scope.$on('$viewContentLoaded', function() {

      gageSpeed = new JustGage({
        id: "graph-vehicle-speed",
        value: $scope.car_speed,
        min: 0,
        max: 180,
        title: "Speed mph",
        relativeGaugeSize: true
      });

      gageBattery = new JustGage({
        id: "graph-battery-level",
        value: 67,
        min: 0,
        max: 100,
        title: "Battery"
      });
      gageFuel = new JustGage({
        id: "graph-fuel-level",
        value: 67,
        min: 0,
        max: 100,
        title: "Fuel"
      });
     });   
  });

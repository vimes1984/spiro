'use strict';
/* global $, requestAnimFrame, cancelRequestAnimFrame */
/*jshint -W030 */
angular.module('spiroApp')
  .controller('SpiroOneCtrl', function ($scope) {
    $scope.canvas = $('#spiro')[0];
    $scope.canvascanvasContext = $scope.canvas.getContext('2d');
    $scope.timerId = 0;
    $scope.clearit = function() {
            $scope.canvascanvasContext.setTransform(1, 0, 0, 1, 0, 0);
            $scope.canvascanvasContext.clearRect(0, 0, $scope.width, $scope.height);
            $scope.canvas.width = $scope.canvas.width;
          };
    $scope.randomColor = function(a) {return Math.floor(Math.random() * a);};
    $scope.canvascanvasContextArray = [];

    for (var b = 0, c = 4e3; c > b; b++){
      $scope.canvascanvasContextArray.push({
        xpos: Math.floor(600 * Math.random() - 1),
        Ypos: Math.floor(600 * Math.random() - 1),
        Rad: Math.floor(200 * Math.random() - 1)
      });
      $scope.canvascanvasContextArray.push();
      $scope.Xmove = Math.floor(600 * Math.random() - 1);
      $scope.Ymove = Math.floor(700 * Math.random() - 1);
      $scope.quadracpx = Math.floor(700 * Math.random() + 1);
      $scope.quadracpy = Math.floor(700 * Math.random() + 1);
      $scope.quadrax = Math.floor(700 * Math.random() + 1);
      $scope.quadray = Math.floor(700 * Math.random() + 1);
    }
    $scope.draw = function() {
            $scope.now = new Date();
            $scope.sec = $scope.now.getMilliseconds();
            $scope.canvas.width = $scope.canvas.width;
            $scope.Xmove = $scope.canvas.width / 2;
            angular.forEach($scope.canvascanvasContextArray, function() {
                $scope.red = $scope.randomColor(255);
                $scope.green = $scope.randomColor(255);
                $scope.blue = $scope.randomColor(255);
                $scope.canvascanvasContext.beginPath();
                $scope.grd = $scope.canvascanvasContext.createLinearGradient($scope.quadracpx, $scope.quadracpy, $scope.quadrax, $scope.quadray);
                $scope.grd.addColorStop(0, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(0.15, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(0.33, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(0.49, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(0.67, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(0.84, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ', 1)');
                $scope.grd.addColorStop(1, 'rgba(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ',  1)');
                $scope.canvascanvasContext.strokeStyle = $scope.grd;
                $scope.canvascanvasContext.lineCap = 'round';
                $scope.canvascanvasContext.shadowBlur = 3;
                $scope.canvascanvasContext.shadowColor = 'rgb(' + $scope.red + ', ' + $scope.green + ', ' + $scope.blue + ')';
                $scope.Ymove > 700 ? $scope.Ymove = $scope.canvas.height / 100 : $scope.Ymove += 5;
                $scope.Xmove > 700 ? $scope.Xmove = $scope.canvas.height / 700 : $scope.Xmove += 50;
                $scope.canvascanvasContext.arc($scope.Xmove, $scope.Ymove, 1, 0, Math.PI*2,true);
                $scope.canvascanvasContext.stroke();
                $scope.canvascanvasContext.closePath();
                $scope.canvascanvasContext.save();
              });
            $scope.canvascanvasContext.restore();
            $scope.globalID = requestAnimFrame($scope.draw);
          };
    $scope.drawit = function() {
            $scope.canvascanvasContext.beginPath();
            $scope.canvascanvasContext.arc(350, $scope.canvas.width / 2, $scope.canvas.width / 2, 0, Math.PI*2,true);
            $scope.canvascanvasContext.clip();
            $scope.globalID = requestAnimFrame($scope.draw);
            $scope.globalIDrot = requestAnimFrame($scope.rotate);
          };
    $scope.rotate = function() {
            $scope.canvascanvasContext.translate($scope.canvas.width / 2, $scope.canvas.width / 2);
            $scope.canvascanvasContext.rotate(360);
            $scope.canvascanvasContext.translate(-$scope.canvas.width / 2, -$scope.canvas.width / 2);
            $scope.globalIDrot = requestAnimFrame($scope.rotate);
          };
    $scope.stopit = function() {
            cancelRequestAnimFrame($scope.globalID);
            cancelRequestAnimFrame($scope.globalIDrot);
          };
  });

'use strict';

angular.module('spiroApp')
  .controller('SpiroTwoCtrl', function ($scope) {
    $scope.canvas = $('#spiro')[0];
    $scope.canvascanvasContext =  $scope.canvas.getContext("2d");
    //interval
    $scope.timerId = 0;

   // console.log($scope.canvas);
  $scope.clearit = function clearit(){
    // Store the current transformation matrix
    // Use the identity matrix while clearing the canvas
    $scope.canvascanvasContext.setTransform(1, 0, 0, 1, 0, 0);
    $scope.canvascanvasContext.clearRect(0, 0, $scope.width, $scope.height);
    $scope.canvas.width = $scope.canvas.width;
  };
  $scope.randomColor = function randomColor(num) {return Math.floor(Math.random() * num);}
  
  //Create elements .arc(x, y, radius, startAngle, endAngle, counterClockwise);
  $scope.canvascanvasContextArray = [];
  for (var i = 0, l = 100; i < l; i++) {
      $scope.canvascanvasContextArray.push({'xpos': Math.floor((Math.random() * 600) - 1), 'Ypos':Math.floor((Math.random() * 600) - 1), 'Rad':Math.floor((Math.random() * 200) - 1)});
      $scope.canvascanvasContextArray.push();
  }




      $scope.Xmove = Math.floor(Math.random() * (690 - 10 + 1)) + 10;
        $scope.Ymove = Math.floor((Math.random() * 690) - 1);
        $scope.quadracpx = Math.floor((Math.random() * 700) + 1);
        $scope.quadracpy = Math.floor((Math.random() * 700) + 1);
        $scope.quadrax = Math.floor((Math.random() * 700) + 1);
        $scope.quadray = Math.floor((Math.random() * 700) + 1);

        $scope.updown = false;






  $scope.draw = function draw(e){
    $scope.now = new Date();
    $scope.sec = $scope.now.getMilliseconds();
        $scope.canvas.width = $scope.canvas.width;
       // $scope.canvascanvasContext.beginPath();


        angular.forEach($scope.canvascanvasContextArray, function(value, key) {
        $scope.red = $scope.randomColor(255);
        $scope.green = $scope.randomColor(255);
        $scope.blue = $scope.randomColor(255);
        $scope.canvascanvasContext.beginPath();
        $scope.grd = $scope.canvascanvasContext.createLinearGradient($scope.quadracpx,$scope.quadracpy,$scope.quadrax,$scope.quadray);
          // Create color gradient
        $scope.grd.addColorStop(0,    "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(0.15, "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(0.33, "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(0.49, "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(0.67, "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(0.84, "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+", 1)");
        $scope.grd.addColorStop(1,    "rgba("+$scope.red+", "+$scope.green+", "+$scope.blue+",  1)");
        $scope.canvascanvasContext.strokeStyle = $scope.grd;
        $scope.canvascanvasContext.lineCap = 'round';
        $scope.canvascanvasContext.shadowBlur = 3;
        $scope.canvascanvasContext.shadowColor = "rgb("+$scope.red+", "+$scope.green+", "+$scope.blue+")";
        if($scope.updown == true){
            $scope.Ymove += 0.002;
            if($scope.Ymove > 680){
              $scope.updown=false;
            }
         }else if($scope.updown == false){
            $scope.Ymove -= 0.002;
            if($scope.Ymove < 20){
              $scope.updown = true;
            }      
         }
        if($scope.updown == true){
            $scope.Xmove += 0.01;
            if($scope.Xmove > 680){
              $scope.updown=false;
            }
         }else if($scope.updown == false){
            $scope.Xmove -= 0.01;
            if($scope.Xmove < 20){
              $scope.updown = true;
            }      
         }
          if($scope.updown == true){
            $scope.Xmove += 0.1;
            if($scope.Xmove > 680){
              $scope.updown=false;
            }
         }else if($scope.updown == false){
            $scope.Xmove -= 0.1;
            if($scope.Xmove < 20){
              $scope.updown = true;
            }      
         }         
      $scope.randstartx = Math.floor(Math.random() * (680 - 20 + 1)) + 20;
      $scope.randstarty = Math.floor(Math.random() * (680 - 20 + 1)) + 20;
      
      $scope.canvascanvasContext.fillStyle = $scope.grd;
      $scope.canvascanvasContext.beginPath();
     $scope.canvascanvasContext.moveTo($scope.randstarty,$scope.randstartx);

           //         arc(x,y,r,start,stop)
      $scope.canvascanvasContext.bezierCurveTo($scope.Xmove,$scope.Xmove + Math.PI*2,$scope.Ymove,$scope.Xmove,350,350);
      //$scope.canvascanvasContext.bezierCurveTo($scope.Ymove,$scope.Ymove,$scope.Xmove,$scope.Ymove,$scope.Xmove,Math.PI*2);
      //$scope.canvascanvasContext.arc($scope.Xmove,$scope.Ymove,20,$scope.Ymove,Math.PI*2,true);
      $scope.canvascanvasContext.stroke();
      $scope.canvascanvasContext.closePath();
           $scope.canvascanvasContext.translate($scope.canvas.width/2, $scope.canvas.width/2);
        $scope.canvascanvasContext.rotate(Math.PI/$scope.Xmove);
        $scope.canvascanvasContext.translate(-$scope.canvas.width/2, -$scope.canvas.width/2);


            $scope.canvascanvasContext.save();
          });
        $scope.canvascanvasContext.restore();
        $scope.globalID = requestAnimFrame($scope.draw);
  };

  $scope.drawit = function drawit(){
        $scope.canvascanvasContext.beginPath();
    $scope.canvascanvasContext.arc(350, $scope.canvas.width / 2, $scope.canvas.width / 2, 0, 2 * Math.PI, !0);
    $scope.canvascanvasContext.clip();
      $scope.canvascanvasContext.closePath();
  $scope.globalID = requestAnimFrame($scope.draw);      
  $scope.globalIDrot = requestAnimFrame($scope.rotate);

  };
$scope.rotate = function rotate(){
     $scope.canvascanvasContext.translate($scope.canvas.width/2, $scope.canvas.width/2);
        $scope.canvascanvasContext.rotate(Math.PI/$scope.Xmove);
        $scope.canvascanvasContext.translate(-$scope.canvas.width/2, -$scope.canvas.width/2);
        $scope.globalIDrot = requestAnimFrame($scope.rotate);
} 
  $scope.stopit = function stopit(){
      cancelRequestAnimFrame($scope.globalID);
      cancelRequestAnimFrame($scope.globalIDrot);
  
  };


  });

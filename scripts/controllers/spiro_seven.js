'use strict';
/* global THREE, $, requestAnimFrame, cancelRequestAnimFrame */
/*jshint -W030 */

angular.module('spiroApp')
.controller('SpiroSevenCtrl', function ($scope) {
	//defualt stuf and setup first 
		$scope.cameracontrols = false;
    //images and testures
    $scope.floor = THREE.ImageUtils.loadTexture( '../images/floor.jpg' );
		$scope.floor.repeat.set( 1, 1 );
		$scope.renderer = new THREE.WebGLRenderer({antialias: true});
		$scope.renderer.shadowMapEnabled = true;
		$scope.renderer.setClearColorHex( 0x000000, 1 );
		$('#spirocube').append( $scope.renderer.domElement );
		$scope.canvas = $('#spirocube')[0];
		//basic setup scene camera first
		$scope.scene = new THREE.Scene();
		$scope.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
		$scope.renderer.setSize( $scope.canvas.firstChild.clientWidth, 700 );
		//objects next! first we create the object geometrey first
		$scope.objects = {};
		/*PlaneGeometry(width, height, widthSegments, heightSegments)
			width — Width along the X axis.
			height — Height along the Y axis.
			widthSegments — Optional. Default is 1. 
			heightSegments — Optional. Default is 1.
		*/
		$scope.geometryplane = new  THREE.PlaneGeometry(500, 500,200,200 );
		/*TorusKnotGeometry(radius, tube, radialSegments, tubularSegments, p, q, heightScale)
			radius — Default is 100. 
			tube — Default is 40. 
			radialSegments — Default is 64. 
			tubularSegments — Default is 8. 
			p — Default is 2. 
			q — Default is 3. 
			heightScale — Default is 1.
		*/
		$scope.geometrytorus =new THREE.TorusKnotGeometry( 30, 5, 50, 8 );
		//material next 
		$scope.material = new THREE.MeshBasicMaterial( {
			color: 0xff0000,
			side: THREE.DoubleSide,
			reflectivity: 0.5,
			shininess: 10,
			map: $scope.floor,
		});
		$scope.materialplane = new THREE.MeshBasicMaterial( {
			//wireframe: false,
			side: THREE.DoubleSide,
			color: 0xffffff,
			specular:0xffffff,
			shininess: 10,
			map: $scope.floor,
			reflectivity: 0.05
		});
		//then put it together 
		$scope.TorusKnot = new THREE.Mesh( $scope.geometrytorus, $scope.material );
		$scope.plane = new THREE.Mesh( $scope.geometryplane, $scope.materialplane );
		$scope.light = new THREE.SpotLight( 0xffffff, 1, 100 );
		$scope.plane.castShadow = false;
		$scope.plane.receiveShadow = true;
		$scope.TorusKnot.castShadow = true;
		$scope.TorusKnot.receiveShadow = false;
		$scope.light.castShadow = true;
		$scope.light.shadowDarkness = 0.5;
		$scope.light.shadowCameraVisible = true;
		$scope.light.shadowCameraRight     =  5;
		$scope.light.shadowCameraLeft     = -5;
		$scope.light.shadowCameraTop      =  5;
		$scope.light.shadowCameraBottom   = -5;
		//default object positions/rotations
		$scope.plane.rotation.y = 21.91;
		$scope.plane.rotation.x = 21.150000000000677;
		$scope.plane.rotation.z = 21.150000000000677;
		$scope.TorusKnot.position.y = 65;
		$scope.TorusKnot.position.x = 11;
		$scope.camera.position.z = 476;
		$scope.light.position.set( 230, 123, 56 );
		//add our obejects to the scene
		$scope.scene.add( $scope.light );
		$scope.scene.add( $scope.TorusKnot);
		$scope.scene.add( $scope.plane);
		$scope.clearit = function clearit(){
		// Store the current transformation matrix
	    // Use the identity matrix while cleaplane the canvas
			$scope.canvascanvasContext.setTransform(1, 0, 0, 1, 0, 0);
			$scope.canvascanvasContext.clearRect(0, 0, $scope.width, $scope.height);
			$scope.canvas.width = $scope.canvas.width;
		};
		$scope.draw = function draw(){
			$scope.globalID = requestAnimFrame($scope.draw);
			$scope.cameracontrols = true;
			$scope.camera.position.y;
			$scope.camera.position.x;
			$scope.camera.position.z;
			$scope.plane.rotation.y;
			$scope.plane.rotation.x;
			$scope.plane.rotation.z;
			$scope.light.position.set( $scope.light.position.x, $scope.light.position.y, $scope.light.position.z );
			$scope.TorusKnot.rotation.y += 0.01;
			$scope.TorusKnot.rotation.x += 0.01;
			$scope.renderer.render($scope.scene, $scope.camera);
		};
		$scope.drawit = function drawit(){
			$scope.globalID = $scope.draw();
		};
		$scope.stopit = function stopit(){
			cancelRequestAnimFrame($scope.globalID);
			cancelRequestAnimFrame($scope.globalIDrot);
		};
	});
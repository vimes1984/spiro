'use strict';
/* global THREE, $, requestAnimFrame, cancelRequestAnimFrame */
/*jshint -W030 */

angular.module('spiroApp')
  .controller('SpiroEightCtrl', function ($scope) {
   	Physijs.scripts.worker = '/canvas/bower_components/Physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/canvas/bower_components/ammo.js/builds/ammo.js';
	var  render, createShape;

	$scope.addshapes = true;
	$scope.renderer = new THREE.WebGLRenderer({ antialias: true });
	$scope.renderer.setSize( window.innerWidth, window.innerHeight );
	$scope.renderer.shadowMapEnabled = true;
	$scope.renderer.shadowMapSoft = true;
	document.getElementById( 'spirocube' ).appendChild( $scope.renderer.domElement );
		
	$scope.initScene = function() {
		TWEEN.start();	
		$scope.scene = new Physijs.Scene({ fixedTimeStep: 1 / 60 });
		$scope.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
		$scope.scene.addEventListener(
			'update',
			function() {
				$scope.scene.simulate( undefined, 2 );
			}
		);
		$scope.camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		$scope.camera.position.y = 60;
		$scope.camera.position.x = 50;
		$scope.camera.position.z = 50;
		$scope.camera.position.set( $scope.camera.position.y, $scope.camera.position.x, $scope.camera.position.z );
		$scope.camera.lookAt( $scope.scene.position );
		$scope.scene.add( $scope.camera );
		
		// Light
		$scope.light = new THREE.DirectionalLight( 0xFFFFFF );
		$scope.light.position.set( 20, 40, -15 );
		$scope.light.target.position.copy( $scope.scene.position );
		$scope.light.castShadow = true;
		$scope.light.shadowCameraLeft = -60;
		$scope.light.shadowCameraTop = -60;
		$scope.light.shadowCameraRight = 60;
		$scope.light.shadowCameraBottom = 60;
		$scope.light.shadowCameraNear = 20;
		$scope.light.shadowCameraFar = 200;
		$scope.light.shadowBias = -.0001
		$scope.light.shadowMapWidth = $scope.light.shadowMapHeight = 2048;
		$scope.light.shadowDarkness = .7;
		$scope.scene.add( $scope.light );
		
		// Materials
		$scope.ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ) }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.ground_material.map.wrapS = $scope.ground_material.map.wrapT = THREE.RepeatWrapping;
		$scope.ground_material.map.repeat.set( 1, 1 );
		
		// Ground
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.ground_geometry = new THREE.PlaneGeometry( 75, 75, 50, 50 );
		for ( var i = 0; i < $scope.ground_geometry.vertices.length; i++ ) {
			var vertex = $scope.ground_geometry.vertices[i];
			vertex.z = $scope.NoiseGen.noise( vertex.x / 20, vertex.y / 20 ) * 2;
		}
		$scope.ground_geometry.computeFaceNormals();
		$scope.ground_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.ground = new Physijs.HeightfieldMesh(
			$scope.ground_geometry,
			$scope.ground_material,
			0, // mass
			50,
			50
		);
		//$scope.ground.rotation.y;
		$scope.ground.rotation.x = Math.PI / -2;
		$scope.ground.receiveShadow = true;
		$scope.scene.add( $scope.ground );
		
		requestAnimFrame( $scope.render );
		$scope.scene.simulate();
		
		$scope.createShape();
	};
	
	$scope.render = function() {
		$scope.globalID = requestAnimFrame( $scope.render );
		$scope.renderer.render( $scope.scene, $scope.camera );
	};
	$scope.createShape = (function() {
		var	shapes = 0,
			box_geometry = new THREE.CubeGeometry( 3, 3, 3 ),
			sphere_geometry = new THREE.SphereGeometry( 1.5, 32, 32 ),
			cylinder_geometry = new THREE.CylinderGeometry( 2, 2, 1, 32 ),
			cone_geometry = new THREE.CylinderGeometry( 0, 2, 4, 32 ),
			octahedron_geometry = new THREE.OctahedronGeometry( 1.7, 1 ),
			torus_geometry = new THREE.TorusKnotGeometry ( 1.7, .2, 32, 4 ),
			doCreateShape;
		
		
			
		doCreateShape = function() {
			var shape, material = new THREE.MeshLambertMaterial({ opacity: 0, transparent: true });
			
			switch ( Math.floor(Math.random() * 2) ) {
				case 0:
					shape = new Physijs.BoxMesh(
						box_geometry,
						material
					);
					break;
				
				case 1:
					shape = new Physijs.SphereMesh(
						sphere_geometry,
						material,
						undefined,
						{ restitution: Math.random() * 1.5 }
					);
				case 2:
					shape = new Physijs.SphereMesh(
						sphere_geometry,
						material,
						undefined,
						{ restitution: Math.random() * 1.5 }
					);					
					break;
			}
				
			shape.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
			shape.castShadow = true;
			shape.receiveShadow = true;
			
			shape.position.set(
				Math.random() * 30 - 15,
				20,
				Math.random() * 30 - 15
			);
			
			shape.rotation.set(
				Math.random() * Math.PI,
				Math.random() * Math.PI,
				Math.random() * Math.PI
			);
			
			if ( $scope.addshapes ) {
				shape.addEventListener( 'ready', $scope.createShape );
			}
			$scope.scene.add( shape );
			
			new TWEEN.Tween(shape.material).to({opacity: 1}, 500).start();	
		};
		
		return function() {
			setTimeout( doCreateShape, 250 );
		};
	})();
	$scope.drawit = function(){
		$scope.cameracontrols = true;
		$scope.initScene();
		$scope.addshapes = true;
	}
	$scope.stopit = function stopit(){
			$scope.addshapes = false;
	};
  });
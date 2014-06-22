'use strict';
/* global THREE, $, requestAnimFrame, cancelRequestAnimFrame */
/*jshint -W030 */

angular.module('spiroApp')
  .controller('SpiroEightCtrl', function ($scope) {
 //   Physijs.scripts.worker = '/canvas/bower_components/Physijs/physijs_worker.js';
  //  Physijs.scripts.ammo = '/canvas/bower_components/ammo.js/builds/ammo.js';
    Physijs.scripts.ammo = '/bower_components/ammo.js/builds/ammo.js';
    Physijs.scripts.worker = '/bower_components/Physijs/physijs_worker.js';

	var initScene, render, createShape, NoiseGen,
		renderer, render_stats, physics_stats, scene, light, ground, ground_geometry, ground_material, camera;
	
	$scope.initScene = function() {
		TWEEN.start();
		
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		document.getElementById( 'spirocube' ).appendChild( renderer.domElement );
		
		
		scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
		scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
		scene.addEventListener(
			'update',
			function() {
				scene.simulate( undefined, 2 );
			}
		);
		
		camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		camera.position.set( 60, 50, 60 );
		camera.lookAt( scene.position );
		scene.add( camera );
		
		// Light
		light = new THREE.DirectionalLight( 0xFFFFFF );
		light.position.set( 20, 40, -15 );
		light.target.position.copy( scene.position );
		light.castShadow = true;
		light.shadowCameraLeft = -60;
		light.shadowCameraTop = -60;
		light.shadowCameraRight = 60;
		light.shadowCameraBottom = 60;
		light.shadowCameraNear = 20;
		light.shadowCameraFar = 200;
		light.shadowBias = -.0001
		light.shadowMapWidth = light.shadowMapHeight = 2048;
		light.shadowDarkness = .7;
		scene.add( light );
		
		// Materials
		ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ) }),
			.8, // high friction
			.4 // low restitution
		);
		ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
		ground_material.map.repeat.set( 1, 1 );
		
		// Ground
		NoiseGen = new SimplexNoise;
		
		ground_geometry = new THREE.PlaneGeometry( 75, 75, 50, 50 );
		for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
			var vertex = ground_geometry.vertices[i];
			vertex.z = NoiseGen.noise( vertex.x / 10, vertex.y / 10 ) * 2;
		}
		ground_geometry.computeFaceNormals();
		ground_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.ground = new Physijs.HeightfieldMesh(
			ground_geometry,
			ground_material,
			0, // mass
			50,
			50
		);
		$scope.ground.rotation.x = Math.PI / -2;
		$scope.ground.receiveShadow = true;
		scene.add( $scope.ground );
		
		requestAnimFrame( render );
		scene.simulate();
		
		createShape();
	};
	
	render = function() {
		requestAnimFrame( render );
		renderer.render( scene, camera );
	};
	
		createShape = (function() {
		var addshapes = true,
			shapes = 0,
			box_geometry = new THREE.CubeGeometry( 3, 3, 3 ),
			sphere_geometry = new THREE.SphereGeometry( 1.5, 32, 32 ),
			cylinder_geometry = new THREE.CylinderGeometry( 2, 2, 1, 32 ),
			cone_geometry = new THREE.CylinderGeometry( 0, 2, 4, 32 ),
			octahedron_geometry = new THREE.OctahedronGeometry( 1.7, 1 ),
			torus_geometry = new THREE.TorusKnotGeometry ( 1.7, .2, 32, 4 ),
			doCreateShape;
		
		setTimeout(
			function addListener() {
				var button = document.getElementById( 'stop' );
				if ( button ) {
					button.addEventListener( 'click', function() { addshapes = false; } );
				} else {
					setTimeout( addListener );
				}
			}
		);
			
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
			
			if ( addshapes ) {
				shape.addEventListener( 'ready', createShape );
			}
			scene.add( shape );
			
			new TWEEN.Tween(shape.material).to({opacity: 1}, 500).start();
			
		};
		
		return function() {
			setTimeout( doCreateShape, 250 );
		};
	})();
	
	$scope.initScene();
	
  });




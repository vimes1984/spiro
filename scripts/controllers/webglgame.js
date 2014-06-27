'use strict';

angular.module('spiroApp')
  .controller('WebglgameCtrl', function ($scope) {
Physijs.scripts.worker = '/canvas/bower_components/Physijs/physijs_worker.js';
    Physijs.scripts.ammo = '/canvas/bower_components/ammo.js/builds/ammo.js';
	var  render, createShape;

	$scope.addshapes = true;
	$scope.renderer = new THREE.WebGLRenderer({ antialias: true });
	$scope.renderer.setSize( window.innerWidth, window.innerHeight );
	$scope.renderer.shadowMapEnabled = true;
	$scope.renderer.shadowMapSoft = true;
	$scope.planesContainer = new THREE.Object3D();


				var pivot;

				var plane;
				var projector;
				
				var planes = new Array();
				var numOfPlanesX = 10;
				var numOfPlanesY = 10;
				var offset = 5;
	document.getElementById( 'spirocube' ).appendChild( $scope.renderer.domElement );
	$scope.walls = 
	$scope.wallone = function(){
		$scope.wall_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ), side: THREE.DoubleSide }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.wall_material.map.wrapS = $scope.wall_material.map.wrapT = THREE.RepeatWrapping;
		$scope.wall_material.map.repeat.set( 40, 40 );
		
		// wall
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.wall_geometry = new THREE.PlaneGeometry( 500, 150, 50, 50 );
		for ( var i = 0; i < $scope.wall_geometry.vertices.length; i++ ) {
			var vertex = $scope.wall_geometry.vertices[i];
			vertex.z = $scope.NoiseGen.noise( vertex.x / 20, vertex.y / 20 ) * 2;
		}
		$scope.wall_geometry.computeFaceNormals();
		$scope.wall_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.wall = new THREE.Mesh(
			$scope.wall_geometry,
			$scope.wall_material
		);
		$scope.wall.rotation.y = 0;
		$scope.wall.rotation.x = 0;
		$scope.wall.rotation.z = 0;
		
		$scope.wall.position.y = 74;
		$scope.wall.position.x = 0;
		$scope.wall.position.z = -250;

		$scope.wall.receiveShadow = false;
		$scope.wall.castShadow = false;
		
		$scope.scene.add( $scope.wall );	
	};
	$scope.walltwo = function(){
		$scope.wall2_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ), side: THREE.DoubleSide }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.wall2_material.map.wrapS = $scope.wall2_material.map.wrapT = THREE.RepeatWrapping;
		$scope.wall2_material.map.repeat.set( 40, 40 );
		
		// wall2
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.wall2_geometry = new THREE.PlaneGeometry( 500, 150, 50, 50 );
		for ( var i = 0; i < $scope.wall2_geometry.vertices.length; i++ ) {
			var vertex = $scope.wall2_geometry.vertices[i];
			vertex.z = $scope.NoiseGen.noise( vertex.x / 20, vertex.y / 20 ) * 2;
		}
		$scope.wall2_geometry.computeFaceNormals();
		$scope.wall2_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.wall2 = new THREE.Mesh(
			$scope.wall2_geometry,
			$scope.wall2_material
		);
		$scope.wall2.rotation.y = 1.57;
		$scope.wall2.rotation.x = 0;
		$scope.wall2.rotation.z = 0;
		
		$scope.wall2.position.y = 74;
		$scope.wall2.position.x = -250;
		$scope.wall2.position.z = 0;

		$scope.wall2.receiveShadow = true;
		$scope.scene.add( $scope.wall2 );	
	};
	$scope.wallthree = function(){
		$scope.wall3_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ), side: THREE.DoubleSide }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.wall3_material.map.wrapS = $scope.wall3_material.map.wrapT = THREE.RepeatWrapping;
		$scope.wall3_material.map.repeat.set( 40, 40 );
		
		// wall3
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.wall3_geometry = new THREE.PlaneGeometry( 500, 150, 50, 50 );
		for ( var i = 0; i < $scope.wall3_geometry.vertices.length; i++ ) {
			var vertex = $scope.wall3_geometry.vertices[i];
			vertex.z = $scope.NoiseGen.noise( vertex.x / 20, vertex.y / 20 ) * 2;
		}
		$scope.wall3_geometry.computeFaceNormals();
		$scope.wall3_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.wall3 = new THREE.Mesh(
			$scope.wall3_geometry,
			$scope.wall3_material
		);
		$scope.wall3.rotation.y = -1.57;
		$scope.wall3.rotation.x = 0;
		$scope.wall3.rotation.z = 0;
		
		$scope.wall3.position.y = 74;
		$scope.wall3.position.x = 250;
		$scope.wall3.position.z = 0;

		$scope.wall3.receiveShadow = false;
		$scope.wall3.castShadow = false;
		
		$scope.scene.add( $scope.wall3 );	
	};
	$scope.wallfour = function(){
		$scope.wall4_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ), side: THREE.DoubleSide }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.wall4_material.map.wrapS = $scope.wall4_material.map.wrapT = THREE.RepeatWrapping;
		$scope.wall4_material.map.repeat.set( 40, 40 );
		
		// wall4
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.wall4_geometry = new THREE.PlaneGeometry( 500, 150, 50, 50 );
		for ( var i = 0; i < $scope.wall4_geometry.vertices.length; i++ ) {
			var vertex = $scope.wall4_geometry.vertices[i];
			vertex.z = $scope.NoiseGen.noise( vertex.x / 20, vertex.y / 20 ) * 2;
		}
		$scope.wall4_geometry.computeFaceNormals();
		$scope.wall4_geometry.computeVertexNormals();
		
		// If your plane is not square as far as face count then the HeightfieldMesh
		// takes two more arguments at the end: # of x faces and # of y faces that were passed to THREE.PlaneMaterial
		$scope.wall4 = new THREE.Mesh(
			$scope.wall4_geometry,
			$scope.wall4_material
		);
		$scope.wall4.rotation.y = 0;
		$scope.wall4.rotation.x = 0;
		$scope.wall4.rotation.z = 0;
		
		$scope.wall4.position.y = 74;
		$scope.wall4.position.x = 0;
		$scope.wall4.position.z = 250;

		$scope.wall4.receiveShadow = false;
		$scope.wall4.castShadow = false;
		
		$scope.scene.add( $scope.wall4 );	
	};		

	$scope.floor = function(){
		
		$scope.ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( '../images/floor.jpg' ), side: THREE.DoubleSide }),
			.1, // high friction
			.4 // low restitution
		);
		$scope.ground_material.map.wrapS = $scope.ground_material.map.wrapT = THREE.RepeatWrapping;
		$scope.ground_material.map.repeat.set( 10, 10 );
		
		// Ground
		$scope.NoiseGen = new SimplexNoise;
		
		$scope.ground_geometry = new THREE.PlaneGeometry( 500, 500, 50, 50 );
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

	};
	$scope.light = function(){
		// Light
		$scope.light = new THREE.DirectionalLight( 0xFFFFFF );
		$scope.light.position.set(  -46, 319, 49 );
		$scope.light.target.position.copy( $scope.scene.position );
		$scope.light.castShadow = true;
		$scope.light.shadowCameraVisible = true;
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
	};
	$scope.camera = function(){


	};
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
			2000
		);
		$scope.camera.position.y = 60;
		$scope.camera.position.x = 50;
		$scope.camera.position.z = 50;
		$scope.camera.position.set( $scope.camera.position.y, $scope.camera.position.x, $scope.camera.position.z );
		$scope.camera.lookAt( $scope.scene.position );
		$scope.scene.add( $scope.camera );
		

		

		$scope.controls = 
			new THREE.OrbitControls( 
				$scope.camera, 
				$scope.renderer.domElement 
			);
		// Materials

		
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
		$scope.wallone();
		$scope.walltwo();
		$scope.wallthree();
		$scope.wallfour();
		$scope.floor();
		$scope.light();
		$scope.addshapes = true;
	}
	$scope.stopit = function stopit(){
			$scope.addshapes = false;
	};
  });

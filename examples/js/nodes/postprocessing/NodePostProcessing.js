/**
 * Generated from 'examples/jsm/nodes/postprocessing/NodePostProcessing.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('/Users/Tomasz/Documents/repos/three.js/examples/jsm/nodes/materials/NodeMaterial.js'), require('/Users/Tomasz/Documents/repos/three.js/examples/jsm/nodes/inputs/ScreenNode.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', '/Users/Tomasz/Documents/repos/three.js/examples/jsm/nodes/materials/NodeMaterial.js', '/Users/Tomasz/Documents/repos/three.js/examples/jsm/nodes/inputs/ScreenNode.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, function (exports, THREE, NodeMaterial_js, ScreenNode_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function NodePostProcessing( renderer, renderTarget ) {

		if ( renderTarget === undefined ) {

			var parameters = {
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBAFormat,
				stencilBuffer: false
			};

			var size = renderer.getDrawingBufferSize( new THREE.Vector2() );
			renderTarget = new THREE.WebGLRenderTarget( size.width, size.height, parameters );

		}

		this.renderer = renderer;
		this.renderTarget = renderTarget;

		this.output = new ScreenNode_js.ScreenNode();
		this.material = new NodeMaterial_js.NodeMaterial();

		this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
		this.scene = new THREE.Scene();

		this.quad = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2, 2 ), this.material );
		this.quad.frustumCulled = false; // Avoid getting clipped
		this.scene.add( this.quad );

		this.needsUpdate = true;

	}

	NodePostProcessing.prototype = {

		constructor: NodePostProcessing,

		render: function ( scene, camera, frame ) {

			if ( this.needsUpdate ) {

				this.material.dispose();

				this.material.fragment.value = this.output;
				this.material.build();

				if ( this.material.uniforms.renderTexture ) {

					this.material.uniforms.renderTexture.value = this.renderTarget.texture;

				}

				this.needsUpdate = false;

			}

			frame.setRenderer( this.renderer )
				.setRenderTexture( this.renderTarget.texture );

			this.renderer.setRenderTarget( this.renderTarget );
			this.renderer.render( scene, camera );

			frame.updateNode( this.material );

			this.renderer.setRenderTarget( null );
			this.renderer.render( this.scene, this.camera );

		},

		setPixelRatio: function ( value ) {

			this.renderer.setPixelRatio( value );

			var size = this.renderer.getSize( new THREE.Vector2() );

			this.setSize( size.width, size.height );

		},

		setSize: function ( width, height ) {

			var pixelRatio = this.renderer.getPixelRatio();

			this.renderTarget.setSize( width * pixelRatio, height * pixelRatio );

			this.renderer.setSize( width, height );

		},

		copy: function ( source ) {

			this.output = source.output;

			return this;

		},

		toJSON: function ( meta ) {

			var isRootObject = ( meta === undefined || typeof meta === 'string' );

			if ( isRootObject ) {

				meta = {
					nodes: {}
				};

			}

			if ( meta && ! meta.post ) meta.post = {};

			if ( ! meta.post[ this.uuid ] ) {

				var data = {};

				data.uuid = this.uuid;
				data.type = "NodePostProcessing";

				meta.post[ this.uuid ] = data;

				if ( this.name !== "" ) data.name = this.name;

				if ( JSON.stringify( this.userData ) !== '{}' ) data.userData = this.userData;

				data.output = this.output.toJSON( meta ).uuid;

			}

			meta.post = this.uuid;

			return meta;

		}

	};

	exports.NodePostProcessing = NodePostProcessing;

}));

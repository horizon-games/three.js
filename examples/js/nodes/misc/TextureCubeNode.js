/**
 * Generated from 'examples/jsm/nodes/misc/TextureCubeNode.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/core/TempNode.js'), require('/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/inputs/FloatNode.js'), require('/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/misc/TextureCubeUVNode.js'), require('/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/accessors/ReflectNode.js'), require('/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/accessors/NormalNode.js')) :
	typeof define === 'function' && define.amd ? define(['exports', '/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/core/TempNode.js', '/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/inputs/FloatNode.js', '/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/misc/TextureCubeUVNode.js', '/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/accessors/ReflectNode.js', '/Users/tomaszdysinski/Repositories/three.js/examples/jsm/nodes/accessors/NormalNode.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, TempNode_js, FloatNode_js, TextureCubeUVNode_js, ReflectNode_js, NormalNode_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function TextureCubeNode( value, uv, bias ) {

		TempNode_js.TempNode.call( this, 'v4' );

		this.value = value;

		this.radianceNode = new TextureCubeUVNode_js.TextureCubeUVNode(
			this.value,
			uv || new ReflectNode_js.ReflectNode( ReflectNode_js.ReflectNode.VECTOR ),
			// bias should be replaced in builder.context in build process
			bias
		);

		this.irradianceNode = new TextureCubeUVNode_js.TextureCubeUVNode(
			this.value,
			new NormalNode_js.NormalNode( NormalNode_js.NormalNode.WORLD ),
			new FloatNode_js.FloatNode( 1 ).setReadonly( true )
		);

	}

	TextureCubeNode.prototype = Object.create( TempNode_js.TempNode.prototype );
	TextureCubeNode.prototype.constructor = TextureCubeNode;
	TextureCubeNode.prototype.nodeType = "TextureCube";

	TextureCubeNode.prototype.generate = function ( builder, output ) {

		if ( builder.isShader( 'fragment' ) ) {

			builder.require( 'irradiance' );

			if ( builder.context.bias ) {

				builder.context.bias.setTexture( this.value );

			}

			var scopeNode = builder.slot === 'irradiance' ? this.irradianceNode : this.radianceNode;

			return scopeNode.build( builder, output );

		} else {

			console.warn( "THREE.TextureCubeNode is not compatible with " + builder.shader + " shader." );

			return builder.format( 'vec4( 0.0 )', this.getType( builder ), output );

		}

	};

	TextureCubeNode.prototype.copy = function ( source ) {

		TempNode_js.TempNode.prototype.copy.call( this, source );

		this.value = source.value;

		return this;

	};

	TextureCubeNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.value = this.value.toJSON( meta ).uuid;

		}

		return data;

	};

	exports.TextureCubeNode = TextureCubeNode;

})));

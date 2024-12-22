export default /* glsl */`
#if NUM_CLIPPING_PLANES > 0 || defined( USE_DITHERED_HOLE )

varying vec3 vClipPosition;

#endif

#if NUM_CLIPPING_PLANES > 0

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;

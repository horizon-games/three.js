export default /* glsl */`
#ifdef USE_DITHERED_HOLE
  vPosition = gl_Position;
  vPosition.x /= projectionMatrix[0][0] * 0.8;
#endif
`;

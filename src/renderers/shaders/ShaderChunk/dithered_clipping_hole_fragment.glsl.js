export default /* glsl */`
#ifdef USE_DITHERED_HOLE
vec2 ditherCoord = gl_FragCoord.xy;
ditherCoord.y -= mod(ditherCoord.x, 2.0);
float holeDist = length(vPosition.xy / (vPosition.w) - ditheredHole.xy);
vec2 dither = mod(ditherCoord, 2.0) * 0.15;
holeDist /= ditheredHole.z;
holeDist *= holeDist * holeDist;
holeDist *= ditheredHole.z;
holeDist += (dither.x + dither.y * 2.0);
float pDepth = gl_FragCoord.z / gl_FragCoord.w;
if(holeDist < ditheredHole.z && pDepth < ditheredHole.w) discard;
#endif
`;

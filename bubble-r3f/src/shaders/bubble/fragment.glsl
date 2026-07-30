varying vec2 vUv;
varying float vWobble;

uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNor;
varying vec3 vPosition;

uniform float fresnelIntensity;
uniform float uAlphaMin;


vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


vec3 boostSaturation(vec3 color, float amount) {
    vec3 hsv = rgb2hsv(color);
    hsv.y = clamp(hsv.y * amount, 0.0, 1.0); // sube el canal de saturación
    return hsv2rgb(hsv);
}

void main(){

    vec3 normals = normalize(vNor);
    float colorMix = smoothstep(- 1.0, 1.0, vWobble);
    vec3 baseColor = mix(uColorA, uColorB, colorMix);
    // baseColor = boostSaturation(baseColor, 1.4) * 4.4;

    if(!gl_FrontFacing)
        normals *= - 1.0;

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normals) + 1.0;
    fresnel = pow(clamp(fresnel, 0.0, 1.0), fresnelIntensity);


    csm_DiffuseColor.rgb = baseColor;

    csm_DiffuseColor.a = fresnel;
}
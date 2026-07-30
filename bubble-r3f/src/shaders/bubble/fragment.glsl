varying vec2 vUv;
varying float vWobble;

uniform vec3 uColorA;
uniform vec3 uColorB;
varying vec3 vNor;
varying vec3 vPosition;

uniform float fresnelIntensity;
uniform float uAlphaMin;

void main(){

    vec3 normals = normalize(vNor);
    float colorMix = smoothstep(- 1.0, 1.0, vWobble);
    vec3 baseColor = mix(uColorA, uColorB, colorMix);

    if(!gl_FrontFacing)
        normals *= - 1.0;

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normals) + 1.0;
    fresnel = pow(clamp(fresnel, 0.0, 1.0), fresnelIntensity);


    csm_DiffuseColor.rgb = baseColor;

    csm_DiffuseColor.a = fresnel;
}
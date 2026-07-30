function hexToNormalisedArray(hex) {
                var r = parseInt(hex.slice(1, 3), 16) / 256,
                    g = parseInt(hex.slice(3, 5), 16) / 256,
                    b = parseInt(hex.slice(5, 7), 16) / 256

                return [r, g, b]
}

export const createControlsSchema = (materialRef) => ({
    uPositionFrequency: 
    {
        value: 0.382,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uPositionFrequency.value = v
        } 
    },
    uTimeFrequency: 
    {
        value: 0.788,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uTimeFrequency.value = v
        } 
    },
    uStrength: 
    {
        value: 0.4,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uStrength.value = v
        } 
    },

    uWarpPositionFrequency: 
    {
        value: 0.2,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uWarpPositionFrequency.value = v
        } 
    },
    uWarpTimeFrequency: 
    {
        value: 0.7,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uWarpTimeFrequency.value = v
        } 
    },
    uWarpStrength: 
    {
        value: 0.5,
        min: 0,
        max: 2,
        onChange: (v) => {
            materialRef.current.uniforms.uWarpStrength.value = v
        } 
    },
    uColorA: 
    {
        value: "#09c0da",
        onChange: (v) => {
            materialRef.current.uniforms.uColorA.value = hexToNormalisedArray(v)
        } 
    },
    uColorB: 
    {
        value: "#284bd7",
        onChange: (v) => {
            materialRef.current.uniforms.uColorB.value = hexToNormalisedArray(v)
        } 
    },
    roughness: 
    {
        value: 0,
        min: 0,
        max: 1,
        onChange: (v) => {
            materialRef.current.roughness = v
        } 
    },
    metalness: 
    {
        value: 0,
        min: 0,
        max: 1,
        onChange: (v) => {
            materialRef.current.metalness = v
        } 
    },
    thickness: 
    {
        value: 0.4,
        min: 0,
        max: 1,
        onChange: (v) => {
            materialRef.current.thickness = v
        } 
    },
    
    transmission: 
    {
        value: 0.9,
        min: 0,
        max: 1,
        onChange: (v) => {
            materialRef.current.transmission = v
        }
    },
    ior: 
    {
        value: 1.3,
        min: 1,
        max: 2.42,
        onChange: (v) => {
            materialRef.current.ior = v
        } 
    }
})
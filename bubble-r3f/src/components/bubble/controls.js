import { button } from 'leva'

function hexToNormalisedArray(hex) {
                var r = parseInt(hex.slice(1, 3), 16) / 256,
                    g = parseInt(hex.slice(3, 5), 16) / 256,
                    b = parseInt(hex.slice(5, 7), 16) / 256

                return [r, g, b]
}

function linearToSRGB(buffer) {
    for (let i = 0; i < buffer.length; i += 4) {
        for (let c = 0; c < 3; c++) { // solo RGB, no alpha
            const linear = buffer[i + c] / 255
            const srgb = linear <= 0.0031308
                ? linear * 12.92
                : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055
            buffer[i + c] = Math.round(srgb * 255)
        }
    }
    return buffer
}

export const createControlsSchema = (materialRef, scene, camera, gl, fbo) => ({
    render: button(() => {
            const width = 4096
            const height = 2048

            const prevTarget = gl.getRenderTarget()

            gl.setRenderTarget(fbo)
            gl.render(scene, camera)

            const buffer = new Uint8Array(width * height * 4)
            gl.readRenderTargetPixels(fbo, 0, 0, width, height, buffer)

            gl.setRenderTarget(prevTarget)

            linearToSRGB(buffer) // 👈 corrige el color aquí

            // Volcamos a un canvas 2D, corrigiendo el flip vertical
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext('2d')

            const imageData = ctx.createImageData(width, height)

            // Invertimos filas: WebGL tiene el origen abajo-izquierda
            for (let y = 0; y < height; y++) {
                const srcStart = y * width * 4
                const dstStart = (height - y - 1) * width * 4
                imageData.data.set(
                    buffer.subarray(srcStart, srcStart + width * 4),
                    dstStart
                )
            }

            ctx.putImageData(imageData, 0, 0)

            const dataURL = canvas.toDataURL('image/png')

            // Descarga automática (opcional, quítalo si solo quieres el dataURL)
            const link = document.createElement('a')
            link.href = dataURL
            link.download = 'captura.png'
            link.click()
        }),
    uPositionFrequency: 
    {
        value: 0.10,
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
        value: 1.4,
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
        value: "#e94c83",
        onChange: (v) => {
            materialRef.current.uniforms.uColorA.value = hexToNormalisedArray(v)
        } 
    },
    uColorB: 
    {
        value: "#ee9e5c",
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
    },
    fresnelIntensity: 
    {
        value: 1,
        min: 0,
        max: 10,
        onChange: (v) => {
            materialRef.current.uniforms.fresnelIntensity.value = v
        } 
    }
})
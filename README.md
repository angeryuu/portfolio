# 🚀 Interactive Developer Portfolio — ÁngeL C. Martos

> **Live Demo:** [angelcmartos.com](https://www.angelcmartos.com/)  
> **Repository:** [github.com/angeryuu/portfolio](https://github.com/github.com/angeryuu/portfolio)

Bienvenido a mi portfolio personal. Una aplicación web interactiva diseñada y desarrollada para mostrar mis proyectos, habilidades técnicas y experiencia como **Frontend Developer**, combinando desarrollo web moderno, renderizado 3D y animaciones fluidas.

---

## 🛠️ Tech Stack & Herramientas

* **Core & UI:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Creative & 3D:** [Three.js](https://threejs.org/) / [React Three Fiber](https://r3f.docs.pmnd.rs/)
* **Animaciones & UI Interactivas:** [GSAP (GreenSock)](https://gsap.com/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Despliegue & Hosting:** GitHub Pages

---

## ✨ Características Principales

* 🎨 **Experiencia Visual e Interactiva:** Integración de gráficos 3D mediante Three.js y animaciones avanzadas basadas en eventos del usuario con GSAP.
* 📱 **Diseño 100% Responsive:** Adaptación fluida de la interfaz y la carga de canvas 3D para distintos tamaños de pantalla y dispositivos móviles.
* ⚡ **Optimización de Rendimiento:** Gestión eficiente de carga de assets pesados, compresión de texturas y optimización del bundle con Vite para mantener métricas óptimas de rendimiento.
* 🌐 **Soporte Multilingüe:** Contenido adaptado para internacionalización y navegación clara.

---

## 🏛️ Decisiones Técnicas y Arquitectura

1. **Vite sobre CRA / Next.js para este proyecto:** Se optó por Vite para mantener un entorno de desarrollo ultrarrápido y un empaquetado (*bundling*) mínimo y eficiente en un entorno de Single Page Application (SPA).
2. **Gestión de Recursos 3D:** Carga diferida (*lazy loading*) de componentes 3D y reutilización de geometrías/materiales en memoria para evitar caídas de fotogramas (FPS) en dispositivos de gama media/baja.
3. **Animaciones Sincronizadas:** Uso de GSAP ScrollTrigger para ligar la narrativa visual del portfolio con el desplazamiento del usuario de forma suave e intuitiva.

---

## 🚀 Instalación y Ejecución Local

Si deseas clonar y ejecutar este proyecto de forma local:

```bash
# 1. Clonar el repositorio
git clone [https://github.com/angeryuu/portfolio.git](https://github.com/angeryuu/portfolio.git)

# 2. Acceder al directorio
cd portfolio

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
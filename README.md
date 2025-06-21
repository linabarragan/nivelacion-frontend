# 🎼 Gestión de Instructores - Frontend

Este proyecto es la interfaz de usuario del sistema de gestión de instructores de una escuela de música. Permite registrar instructores, asignarles instrumentos, filtrar por estado y realizar acciones de activación/inactivación o eliminación.

---

## 🚀 Tecnologías

- [Vue.js 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify 3](https://next.vuetifyjs.com/)
- [Vite](https://vitejs.dev/)

---

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/frontend-instructores.git
   cd frontend-instructores

   ```

2. Instala las dependencias:
   npm install

3. Ejecutar en desarrollo
   npm run dev

La aplicación se abrirá en: http://localhost:5173

## 🧰 Funcionalidades

✅ Registro de instructores con nombre e instrumentos.

✅ Edición y eliminación de instructores.

✅ Activación / inactivación de instructores.

✅ Filtros por nombre y estado (activos/inactivos).

✅ Snackbar para mostrar errores del backend.

✅ Validaciones del formulario (nombre mínimo 3 letras, sin números).

✅ Estilo visual con fondo musical personalizado.

## 📁 Estructura de Carpetas

src/
├── assets/ # Imágenes como fondo musical
├── components/ # Componentes reutilizables
│ └── instructores/ # Formulario y tabla
├── services/ # Comunicación con la API
├── views/ # Vista principal
├── App.vue / main.ts # Configuración raíz
└── router/ # Rutas de la aplicación

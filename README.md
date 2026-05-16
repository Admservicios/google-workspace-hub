# Google Workspace Hub

Un dashboard centralizado y moderno para gestionar herramientas de Google Workspace (Gmail, Calendar, Tasks, Notes) y asistencia por IA (Gemini).

## Requisitos
- Node.js 20+

## Instalación

1. Clona el repositorio e instala las dependencias:
```bash
npm install
```

2. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## Acceso
Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Estructura de Carpetas

```
src/
├── app/          # Next.js App Router (Páginas y API Routes)
├── components/   # Componentes de UI modulares
├── hooks/        # Custom hooks para la lógica de negocio
├── lib/          # Datos mock y utilidades
├── store/        # Estado global con Zustand
├── styles/       # Variables CSS y temas
└── types/        # Definiciones de TypeScript
```

## Modificar Mock Data

Para agregar nuevas tareas, emails, o modificar cualquier dato inicial, puedes editar el archivo `src/lib/mockData.ts`. La estructura de tipos garantiza que los datos cumplan con el formato esperado.

Ejemplo para agregar una tarea:
Simplemente añade un nuevo objeto al array `mockTasks` siguiendo la interfaz `Task` definida en `src/types/tasks.ts`.

## Funcionalidades

- **Dark Mode**: Soporte nativo y persistente de modo oscuro (Haz click en el icono del sol/luna en la cabecera).
- **Responsive**: Totalmente adaptable a dispositivos móviles, tablets y escritorio.
- **Gestión de Estado**: Utiliza Zustand para manejar toda la información centralizada en `src/store/appStore.ts`.

## Próximas Fases
- Autenticación real con Google OAuth.
- Conexión con las APIs reales de Google Workspace (Gmail API, Calendar API, etc.).
- Almacenamiento persistente en base de datos.

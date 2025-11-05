# Fundación Joel - Aplicación Web

Aplicación web full-stack para la Fundación Joel con sistema de donaciones integrado vía Stripe.

![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639?logo=nginx)

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
  - [Opción A: Desde código fuente](#opción-a-desde-código-fuente-desarrollo)
  - [Opción B: Con imágenes precompiladas](#opción-b-con-imágenes-precompiladas-más-rápido)
- [Uso](#uso)
- [Configuración](#configuración)
- [Docker Hub](#docker-hub)
- [Desarrollo](#desarrollo)
- [Troubleshooting](#troubleshooting)
- [Contribuir](#contribuir)

## ✨ Características

- 🎨 Interfaz moderna y responsive con React
- 💳 Sistema de donaciones con Stripe
- 🌍 Soporte multiidioma (Español/Inglés)
- 🎬 Galería multimedia optimizada con streaming de videos
- 🐳 Completamente dockerizado para fácil deployment
- 📱 Diseño mobile-first
- ⚡ Optimizado para producción con Nginx

## 🚀 Tecnologías

### Frontend
- **React.js 18** - Framework UI
- **SCSS** - Estilos
- **React Router** - Navegación
- **i18n** - Internacionalización
- **Nginx** - Servidor web en producción

### Backend
- **Node.js 18** - Runtime
- **Express** - Framework web
- **Stripe API** - Procesamiento de pagos

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación
- **Docker Hub** - Registro de imágenes

## 📦 Instalación

### Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop) instalado
- Cuenta de [Stripe](https://stripe.com) (para el sistema de pagos)
- Git (para clonar el repositorio)

### Opción A: Desde código fuente (desarrollo)

Ideal si quieres ver, modificar o contribuir al código.

```bash
# 1. Clonar el repositorio
git clone https://github.com/andrewortiz89/fundaci-n-joel.git
cd fundaci-n-joel

# 2. Configurar variables de entorno
cp backend/.env.example backend/.env

# 3. Editar backend/.env con tus credenciales
# En Windows: notepad backend/.env
# En Linux/Mac: nano backend/.env

# 4. Construir y ejecutar con Docker
docker-compose up --build
```

**Tiempo estimado**: 5-10 minutos (primera vez)

### Opción B: Con imágenes precompiladas (más rápido)

Ideal para instalación rápida sin necesidad de clonar el código completo.

```bash
# 1. Crear directorio del proyecto
mkdir fundacion-joel && cd fundacion-joel

# 2. Descargar docker-compose
curl -O https://raw.githubusercontent.com/andrewortiz89/fundaci-n-joel/main/docker-compose.hub.yml

# 3. Crear estructura de carpetas
mkdir -p backend

# 4. Crear archivo de configuración
cat > backend/.env << EOF
STRIPE_SECRET_KEY=tu_clave_secreta_aqui
FRONTEND_URL=http://localhost
PORT=4242
NODE_ENV=production
EOF

# 5. Ejecutar (descarga imágenes de Docker Hub automáticamente)
docker-compose -f docker-compose.hub.yml up
```

**Tiempo estimado**: 2-3 minutos (primera vez)

## 🎮 Uso

Una vez ejecutado, accede a:

- **Frontend**: http://localhost
- **Backend API**: http://localhost:4242

### Detener la aplicación

```bash
# Si ejecutaste con docker-compose up (en primer plano)
Ctrl + C

# Si ejecutaste con -d (en segundo plano)
docker-compose down

# O para docker-compose.hub.yml
docker-compose -f docker-compose.hub.yml down
```

### Ver logs

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs solo del frontend
docker-compose logs -f frontend

# Ver logs solo del backend
docker-compose logs -f backend
```

## ⚙️ Configuración

### Variables de entorno (backend/.env)

```env
# Stripe Configuration (REQUERIDO)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx  # Tu clave secreta de Stripe

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost

# Server Configuration
PORT=4242
NODE_ENV=production  # o 'development'
```

### Obtener credenciales de Stripe

1. Crea una cuenta en https://stripe.com
2. Ve a **Developers > API keys**
3. Copia tu **Secret key** (empieza con `sk_test_`)
4. Pégala en `backend/.env`

⚠️ **NUNCA** subas tu `.env` a Git. El archivo `.gitignore` ya lo protege.

## 🐳 Docker Hub

Las imágenes están públicamente disponibles en Docker Hub:

- **Frontend**: [`jeysonandresortiz/fundacion-joel-frontend:latest`](https://hub.docker.com/r/jeysonandresortiz/fundacion-joel-frontend)
- **Backend**: [`jeysonandresortiz/fundacion-joel-backend:latest`](https://hub.docker.com/r/jeysonandresortiz/fundacion-joel-backend)

### Usar imágenes directamente

```bash
# Pull de las imágenes
docker pull jeysonandresortiz/fundacion-joel-frontend:latest
docker pull jeysonandresortiz/fundacion-joel-backend:latest

# Ejecutar frontend
docker run -p 80:80 jeysonandresortiz/fundacion-joel-frontend:latest

# Ejecutar backend (con variables de entorno)
docker run -p 4242:4242 \
  -e STRIPE_SECRET_KEY=tu_clave \
  -e PORT=4242 \
  jeysonandresortiz/fundacion-joel-backend:latest
```

## 💻 Desarrollo

### Modo desarrollo (con hot-reload)

```bash
# Usar docker-compose de desarrollo
docker-compose -f docker-compose.dev.yml up --build
```

Accede a:
- Frontend: http://localhost:3000 (hot-reload activo)
- Backend: http://localhost:4242 (nodemon activo)

Los cambios en el código se reflejan automáticamente.

### Estructura del proyecto

```
fundaci-n-joel/
├── frontend/               # Aplicación React
│   ├── src/               # Código fuente
│   ├── public/            # Assets estáticos
│   ├── Dockerfile.dev     # Docker para desarrollo
│   ├── Dockerfile.prod    # Docker para producción
│   └── nginx.conf         # Configuración Nginx
│
├── backend/               # API Node.js
│   ├── server.js          # Entrada principal
│   ├── .env               # Variables de entorno (NO en Git)
│   ├── .env.example       # Plantilla de .env
│   ├── Dockerfile.dev     # Docker para desarrollo
│   └── Dockerfile.prod    # Docker para producción
│
├── docker-compose.yml         # Orquestación producción
├── docker-compose.dev.yml     # Orquestación desarrollo
├── docker-compose.hub.yml     # Con imágenes de Docker Hub
└── README.md                  # Este archivo
```

## 🐛 Troubleshooting
### Error: "TLS handshake timeout" al descargar imágenes de Docker

**Síntomas**: 
```
ERROR: failed to solve: node:18-alpine: failed to resolve source metadata
net/http: TLS handshake timeout
```

**Causa**: Problemas de conexión con Docker Hub o timeout en la descarga.

**Soluciones**:

1. **Reintentar** (solución más común):
```bash
docker system prune -f
docker-compose up --build
```

2. **Pre-descargar imágenes manualmente**:
```bash
docker pull node:18.20.5-alpine3.20
docker pull nginx:1.27.3-alpine
docker-compose up --build
```

3. **Aumentar timeout de Docker**:
```bash
export DOCKER_CLIENT_TIMEOUT=300
export COMPOSE_HTTP_TIMEOUT=300
docker-compose up --build
```

4. **Usar imágenes precompiladas de Docker Hub** (solución más rápida):
```bash
docker-compose -f docker-compose.hub.yml up
```
Esta opción descarga las imágenes ya construidas sin necesidad de compilar.

### Puerto 80 ya está en uso

**Solución**: Cambia el puerto del frontend en `docker-compose.yml`:

```yaml
frontend:
  ports:
    - "8080:80"  # Accede en http://localhost:8080
```

### Puerto 4242 ya está en uso

**Solución**: Cambia el puerto del backend:

```yaml
backend:
  ports:
    - "5000:4242"  # Accede en http://localhost:5000
  environment:
    - PORT=4242  # Mantén este valor
```

### Los videos no cargan o son lentos

- Los videos se sirven con **streaming progresivo** (HTTP 206)
- Verifica en DevTools que el Status sea `206 Partial Content`
- Para videos grandes (>20MB), considera comprimirlos

### Error "STRIPE_SECRET_KEY is not defined"

- Verifica que `backend/.env` existe y tiene la variable
- Asegúrate de que el formato sea: `STRIPE_SECRET_KEY=sk_test_...`
- Sin espacios ni comillas

### Docker build falla con "cross-env not found"

- Esto ya está solucionado en la última versión
- Si persiste, ejecuta: `docker-compose build --no-cache`

### Las imágenes de Docker Hub no funcionan en ARM (Raspberry Pi)

**Solución**: Construye localmente en lugar de usar Docker Hub:

```bash
git clone https://github.com/andrewortiz89/fundaci-n-joel.git
cd fundaci-n-joel
docker-compose up --build
```


## 📝 Licencia

Este proyecto es propiedad de Fundación Joel. Todos los derechos reservados.

## 👤 Autor

**Andrew Ortiz**
- GitHub: [@andrewortiz89](https://github.com/andrewortiz89)
- Docker Hub: [@jeysonandresortiz](https://hub.docker.com/u/jeysonandresortiz)


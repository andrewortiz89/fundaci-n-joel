# Proyecto Fundación Joel

Aplicación web creada con **React** y **Sass** para presentar la misión y actividades de la Fundación Joel.

## Requisitos previos

Antes de comenzar asegúrate de tener instalado:

- **Node.js** >= 14 (se recomienda la última versión LTS).
- **npm** (incluido con Node.js).

Comprueba las versiones:

```bash
node -v
npm -v
```

## Clonar e instalar dependencias

1. Clona este repositorio o descarga el `.zip` y descomprímelo:

```bash
git clone <URL-del-repositorio>
cd proyecto-fundacion-joel
```

2. Instala las dependencias:

```bash
npm install
```

## Scripts disponibles

En el directorio del proyecto puedes ejecutar:

### `npm start`

Inicia la app en modo desarrollo.  
Se abrirá en [http://localhost:3000](http://localhost:3000).

- El proyecto usa la variable `NODE_OPTIONS=--openssl-legacy-provider` para compatibilidad con OpenSSL en Node 17+.
- La aplicación se recargará si editas el código.
- Verás errores de lint en la consola.

### `npm run build`

Genera la aplicación lista para producción en la carpeta `build/`.  
Optimiza React para mejor rendimiento y minifica los archivos.

El sitio resultante puede desplegarse en servicios como **Netlify**, **Vercel**, **GitHub Pages** o un hosting propio.

### `npm test`

Lanza el runner de pruebas en modo interactivo.

### `npm run eject` (opcional)

Expone toda la configuración de `react-scripts`. **No es reversible**.

## Estructura básica del proyecto

```
proyecto-fundacion-joel/
├─ public/
│  ├─ index.html
│  └─ ...
├─ src/
│  ├─ assets/         # Imágenes, videos y recursos estáticos
│  ├─ components/     # Componentes React (Inicio, Programas, etc.)
│  ├─ App.js
│  └─ index.js
├─ package.json
└─ README.md
```

## Tecnologías principales

- **React 16** con `react-scripts`.
- **Sass** para estilos (`.scss`).
- Librerías adicionales:
  - `react-scroll` (desplazamiento suave)
  - `react-id-swiper` / `swiper` (carruseles)
  - `react-reveal` (animaciones)
  - `emailjs-com` (envío de correos)
  - `react-masonry-css` (layouts tipo masonry)
  - `react-flexbox-grid` (diseño de grillas)

## Despliegue en producción

1. Ejecuta:

```bash
npm run build
```

2. Sube el contenido de la carpeta `build/` a tu hosting o servicio de despliegue.
   - En **Netlify** o **Vercel**, simplemente arrastra la carpeta `build/`.
   - En **GitHub Pages**, configura `homepage` en `package.json` si deseas una URL específica.

## Notas de accesibilidad

- El proyecto incluye emojis en algunos textos. Para cumplir con accesibilidad, pueden envolverse en `<span role="img" aria-label="descripción">`.


## Instalación en Linux

### Prerrequisitos
- Docker 20.10+
- Docker Compose 2.0+

### Pasos

1. Clonar el repositorio:
```bash
git clone <tu-repo>
cd <tu-proyecto>
```

2. Verificar compatibilidad:
```bash
chmod +x check-compatibility.sh
./check-compatibility.sh
```

3. Modo desarrollo:
```bash
docker-compose up
```

4. Modo producción:
```bash
docker build -f Dockerfile.prod -t mi-app-prod .
docker run -p 80:80 mi-app-prod
```

### Problemas comunes

**Permisos denegados**: Ejecuta `sudo usermod -aG docker $USER` y reinicia sesión

**Puerto en uso**: Cambia el puerto en docker-compose.yml: `"3001:3000"`
# Replai Frontend

A Vue 3 single-page application scaffolded with Vite. Uses Pinia for state management, Vue Router for navigation, Axios for HTTP calls, and Tailwind CSS for styling.

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
  - [Install dependencies](#install-dependencies)
  - [Environment variables](#environment-variables)
  - [Run in development](#run-in-development)
  - [Build for production](#build-for-production)
  - [Preview production build](#preview-production-build)
- [Deployment](#deployment)
  - [Static hosts (Vercel / Netlify)](#static-hosts-vercel--netlify)
  - [GitHub Pages](#github-pages)
  - [Docker + Nginx](#docker--nginx)
- [CI / CD tips](#ci--cd-tips)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License & authors](#license--authors)

---

## About

This repository contains the frontend application for the project named `replai-frontend`. It is a modern Vue 3 + Vite application focused on fast development feedback and optimized production builds.

## Features

- Vue 3 (Composition API)
- Vite dev server and build pipeline
- Pinia for state management
- Vue Router for SPA routing
- Axios for API requests
- Tailwind CSS for utility-first styling

## Tech stack

Key dependencies (see package.json for exact versions):

- vue
- vite
- pinia
- vue-router
- axios
- tailwindcss

## Prerequisites

- Node.js: matches engines in package.json (recommended: Node 20.x or higher per engines: ^20.19.0 || >=22.12.0)
- npm (recommended) or yarn / pnpm

Verify Node and npm:

```sh
node -v
npm -v
```

## Getting started

### Install dependencies

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd replai-frontend
npm install
# or for reproducible installs in CI:
# npm ci
```

### Environment variables

This project uses Vite. Client-visible environment variables must be prefixed with `VITE_`.
Create a `.env` or `.env.local` in the project root with variables required by the app.

Example `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE="Replai Frontend"
```

Access these via `import.meta.env.VITE_API_URL` in the source code.

### Run in development

Start the dev server with hot module replacement:

```sh
npm run dev
```

Open the URL shown in the console (by default Vite uses http://localhost:5173).

### Build for production

Create an optimized production build:

```sh
npm run build
```

The build output will be written to `dist/` by default.

### Preview production build

Preview the production build locally (serves the `dist/` folder):

```sh
npm run preview
```

## Deployment

Any static-site hosting that serves the `dist/` folder will work. Below are common options.

### Static hosts (Vercel / Netlify)

- Build command: `npm run build`
- Publish / output folder: `dist`
- For SPA routing, ensure the host is configured to fallback to `index.html` (Netlify: `_redirects` or `netlify.toml`; Vercel sets this automatically for frameworks).

Netlify example:
- Build command: `npm run build`
- Publish directory: `dist`

Vercel example:
- Framework: Vite (auto-detected) or use "Other"
- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

One simple approach is to push the `dist/` contents to a branch (e.g., `gh-pages`) and enable Pages.
A tool like `gh-pages` can automate this:

```sh
npm run build
npx gh-pages -d dist
```

### Docker / Docker Compose

This repository includes a Dockerfile and a docker-compose.yml at the project root. The Dockerfile is a multi-stage build which compiles the Vite app (build stage) and serves the generated static files with Nginx (production stage).

Important: Vite injects `VITE_*` variables at build time. To set `VITE_API_URL` you must pass it as a build argument (see examples below).

Build a Docker image locally (example):

```sh
# replace the URL with your backend API URL
docker build -t replai-frontend:latest --build-arg VITE_API_URL=https://api.example.com .
```

Run the built image:

```sh
# the container serves on port 80; this maps it to host port 5173 (matches included compose file)
docker run -d --name replai-frontend -p 5173:80 replai-frontend:latest
```

Using docker-compose

The included `docker-compose.yml` builds the image and exposes it on host port `5173` (mapped to container port `80`). To build and run:

```sh
docker-compose up --build -d
```

If you need to pass build args from compose (recommended for CI), update `docker-compose.yml` to include `build.args`:

```yaml
version: '3.8'
services:
  vue-app:
    build:
      context: .
      args:
        VITE_API_URL: "https://api.example.com"
    ports:
      - "5173:80"
    restart: always
```

Rebuild without cache:

```sh
docker-compose build --no-cache
docker-compose up -d
```

nginx configuration

The Dockerfile copies `nginx.conf` from the repository into the container. Ensure `nginx.conf` exists and provides an SPA fallback so client-side routing works. Example `nginx.conf` to place in the project root:

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Optional: proxy API requests to your backend
  # location /api/ {
  #   proxy_pass http://backend:8080;
  #   proxy_set_header Host $host;
  #   proxy_set_header X-Real-IP $remote_addr;
  # }
}
```

Notes & best practices

- Vite environment variables are baked into the build at build time. To change `VITE_API_URL` you must rebuild the Docker image with `--build-arg` (or via compose build args) and redeploy the container.
- The included `docker-compose.yml` maps host port `5173` to container port `80` (so the app will be reachable at http://localhost:5173). Adjust ports if required by your environment.
- To publish the image to a registry:

```sh
docker tag replai-frontend:latest registry.example.com/org/replai-frontend:latest
docker push registry.example.com/org/replai-frontend:latest
```

If desired, README can be extended with a CI workflow (GitHub Actions/GitLab CI) example that builds the image and pushes it to a registry.

## CI / CD tips

- Use `npm ci` in CI for reproducible installs.
- Cache the node package manager's cache between runs.
- Run `npm run build` and deploy the generated `dist/` directory to your hosting provider.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a branch: `git checkout -b feat/your-feature`.
3. Implement changes and add tests if applicable.
4. Open a pull request describing your changes.

Follow repository conventions for branch names and commit messages.

## Troubleshooting

- Build errors: ensure Node version matches `engines` in `package.json`.
- Styling issues: make sure Tailwind is configured and postcss is installed.
- API errors: verify `VITE_API_URL` and CORS configuration on the backend.

If the issue persists, open an issue in the repository with logs and steps to reproduce.

## License & authors

See the `LICENSE` file in this repository for license details (if present). For questions or support, open an issue on GitHub.

---

If you need the README customized further (screenshots, architecture diagram, or deployment workflow templates), tell me which details to add and I will update it.
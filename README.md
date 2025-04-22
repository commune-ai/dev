# Development Environment

This repository contains a comprehensive development environment with support for multiple technologies including Docker, Node.js, Python, and Rust.

## Overview

This environment is designed to provide a unified development experience across multiple technologies. It includes:

- Docker-based containerization
- Next.js application framework
- Python development tools
- Tailwind CSS for styling

## Project Structure

- `/app` - Next.js application
- `/scripts` - Utility scripts for environment management
- `Dockerfile` - Multi-purpose container with NPM, Rust, Python, and Docker
- `docker-compose.yml` - Container orchestration configuration

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Python 3.9+ (for Python development)

### Setup

1. Clone the repository
2. Make scripts executable:
   ```bash
   make chmod
   ```
3. Start the environment:
   ```bash
   make start
   ```

### Available Commands

```bash
# Build the environment
make build

# Start the environment
make start

# Stop the environment
make stop

# Enter the container shell
make enter

# Run tests
make test
```

## Application Development

### Next.js Application

The `/app` directory contains a Next.js application with Tailwind CSS integration.

To run the application:

```bash
cd app
npm install
npm run dev
```

### Docker Environment

The Docker environment provides a unified container with multiple development tools:

- Python 3.x with pip and venv
- Docker-in-Docker capability
- Network host mode for easy service access

## Configuration

- `tailwind.config.js` - Tailwind CSS configuration
- `pyproject.toml` - Python project configuration
- `package.json` - Node.js dependencies

## License

MIT License
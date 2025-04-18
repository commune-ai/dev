
# Development Environment

This repository contains a development environment with support for:
- Python
- Node.js
- Rust
- Docker-in-Docker

## Getting Started

### Using Docker Compose

1. Start the container:
```bash
./scripts/docker-compose-up.sh
```

2. Enter the container:
```bash
make enter
```

3. Stop the container:
```bash
./scripts/docker-compose-down.sh
```

### Using Make Commands

1. Build the container:
```bash
make build
```

2. Start the container:
```bash
make start
# or
make up
```

3. Enter the container:
```bash
make enter
```

4. Stop the container:
```bash
make stop
# or
make down
```

## Permissions

If you encounter permission issues with the scripts, run:
```bash
make chmod
```

## Testing

Run tests with:
```bash
make test
```

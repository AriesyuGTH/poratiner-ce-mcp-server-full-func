# Portainer MCP Server

A Model Context Protocol (MCP) server implementation for Portainer, enabling AI assistants to interact with Docker containers and services through Portainer's API.

## Features

- Docker container management (create, start, delete, fetch logs)
- Docker image management (fetch, delete unused, clear build cache)
- Docker network operations (inspect, fetch)
- Docker service management (fetch, logs)
- Resource limit management for containers

## Project Structure

```
portainer-ce-mcp/
├── src/
│   ├── api/
│   │   └── portainer.ts      # Portainer API integration
│   ├── constants/
│   │   └── index.ts          # Tool names and other constants
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── main.ts               # Main server implementation
├── package.json              # Project dependencies
├── package-lock.json         # Dependency lock file
├── deno.json                 # Deno configuration
└── README.md                 # Project documentation
```

## Prerequisites

- Deno
- Portainer instance with API access
- Docker installed and running

## Installation

1. Clone the repository:
```bash
git https://github.com/BirajMainali/poratiner-ce-mcp-server.git
cd portainer-ce-mcp
```
## Configuration

The server requires the following environment variables:
- `PORTAINER_URL`: The URL of your Portainer instance
- `PORTAINER_API_KEY`: Your Portainer API key
- `PORTAINER_ENV_ID`: Your Poratiner Environment Id

## API Tools

The server provides the following tools for AI assistants (tool names correspond to the `name` property used in MCP `CallToolRequest` and defined in `src/constants/index.ts`):

### Container Management
- `fetch_docker_containers`: Fetch all Docker containers.
  - Input: `{}`
- `create_docker_container`: Create a new Docker container.
  - Input: `{ "containerName": "string", "image": "string", "exposedPorts": "object (optional)", "hostConfig": "object (optional)" }`
- `start_docker_container`: Start a Docker container.
  - Input: `{ "containerId": "string" }`
- `delete_docker_container`: Delete a Docker container.
  - Input: `{ "containerId": "string", "force": "boolean (optional)" }`
- `fetch_container_logs`: Fetch logs from a Docker container.
  - Input: `{ "containerId": "string", "since": "number (optional)", "timestamps": "boolean (optional)", "tail": "string (optional, e.g., '100')" }`
- `update_container_resource_limits`: Update resource limits for a Docker container.
  - Input: `{ "containerId": "string", "memory": "number (optional)", "memorySwap": "number (optional)", "restartPolicy": "object (optional)" }`
- `delete_stopped_containers`: Delete all stopped containers.
  - Input: `{}`

### Image Management
- `fetch_docker_images`: Fetch all Docker images.
  - Input: `{}`
- `delete_image_build_cache`: Delete the build cache for Docker images.
  - Input: `{}`
- `delete_unused_images`: Delete unused Docker images.
  - Input: `{}`

### Network Operations
- `fetch_docker_networks`: Fetch all Docker networks.
  - Input: `{}`

### Service Management
- `fetch_docker_services`: Fetch all Docker services.
  - Input: `{}`
- `fetch_service_logs`: Fetch logs from a Docker service.
  - Input: `{ "serviceId": "string", "since": "number (optional)", "timestamps": "boolean (optional)", "tail": "string (optional, e.g., '100')" }`
- `inspect_service`: Inspect a Docker service.
  - Input: `{ "serviceId": "string" }`
- `update_docker_service`: Update/Restart a Docker service.
  - Input: `{ "serviceId": "string" }`

### Authentication
- `authenticate_user`: Authenticate a user and retrieve a JWT token.
  - Input: `{ "username": "string", "password": "string" }`

### User Management
- `list_users`: Fetch all users.
  - Input: `{}`
- `create_user`: Create a new user. (Note: Implementation is currently paused due to auth method constraints on the target Portainer instance. Input schema reflects intended design.)
  - Input: `{ "username": "string", "password": "string", "role": "integer (1 for admin, 2 for regular)" }`

### Stack Management
- `list_stacks`: Fetch all stacks.
  - Input: `{}`

## Development


### Building
```bash
deno compile --allow-env --allow-read --allow-net --env-file=.env  src/main.ts
```

### Inspect MCP Server
```bash
npx @modelcontextprotocol/inspector deno run --allow-env --allow-read --allow-net --env-file=.env  src/main.ts
```

### MCP Config
```json
{
  "mcpServers": {
    "poratiner": {
      "command": "C:\\MCP\\portainer-ce-mcp\\src.exe", // use executable path
      "args": [
        "y"
      ]
    }
  }
}
```

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

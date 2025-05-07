# System Patterns: Portainer CE MCP Server

## System Architecture

The system is an MCP (Model Context Protocol) server designed to act as an intermediary between an LLM agent (via an MCP client) and a Portainer instance.

**Key Components:**

1.  **MCP Server Core (`src/main.ts`)**:
    *   Utilizes `@modelcontextprotocol/sdk` to create an MCP `Server` instance.
    *   Uses `StdioServerTransport` for communication, implying it runs as a command-line application and communicates over stdin/stdout.
    *   Defines server metadata (name, version).
    *   Registers available tools with their names, descriptions, and input schemas.
    *   Implements a request handler for `ListToolsRequestSchema` to provide tool definitions.
    *   Implements a request handler for `CallToolRequestSchema` to execute specific tools.

2.  **Portainer API Client (`src/api/portainer.ts`)**:
    *   Uses `axios` to create a pre-configured `AxiosInstance` for interacting with the Portainer API.
    *   Configuration (base URL, API key) is loaded from environment variables (via Deno's `dotenv` and `Deno.env.get`).
    *   Provides asynchronous functions, each corresponding to a specific Portainer API endpoint interaction (e.g., `fetchDockerContainers`, `createDockerContainer`).
    *   Handles constructing API request paths, parameters, and bodies.

3.  **Tool Definitions and Constants (`src/constants/index.ts`)**:
    *   Centralizes the string names for all MCP tools (e.g., `Tools.DockerContainers`). This promotes consistency and reduces errors from typos.

4.  **Type Definitions (`src/types/index.ts`)**:
    *   Contains TypeScript interfaces for various Docker-related entities (e.g., `DockerContainer`, `DockerImage`), ensuring type safety when dealing with Portainer API responses.

## Request Handling Flow (for `CallToolRequestSchema`)

1.  The MCP Server core in `src/main.ts` receives a `CallToolRequest` via `StdioServerTransport`.
2.  The `CallToolRequestSchema` handler is invoked.
3.  A `switch` statement routes the request to the appropriate logic based on the `request.params.name` (tool name).
4.  The tool name typically matches a constant from `src/constants/index.ts`.
5.  The corresponding function from `src/api/portainer.ts` is called with arguments extracted from `request.params.arguments`.
6.  The API client function in `src/api/portainer.ts` makes an HTTP request to the Portainer API using `axios`.
7.  The Portainer API response is processed.
8.  The result is formatted (usually as a JSON string) and returned as the content of the MCP response.
9.  Error handling is present: if an error occurs during tool execution or API call, a "Failed: {errorMessage}" message is returned.

## Design Patterns and Practices

-   **Service Abstraction**: `src/api/portainer.ts` acts as a service layer, abstracting the details of Portainer API communication from the main MCP server logic.
-   **Constant-based Tool Naming**: Using constants for tool names (`src/constants/index.ts`) improves maintainability and reduces the risk of naming inconsistencies.
-   **Environment-based Configuration**: Critical configuration parameters (API URL, key) are managed via environment variables, following best practices for security and deployment flexibility. Deno's `dotenv` module is used for loading these.
-   **Asynchronous Operations**: All API interactions and tool executions are handled asynchronously using `async/await`.
-   **Typed Payloads**: TypeScript interfaces in `src/types/index.ts` are used for defining the structure of data exchanged with Portainer, enhancing code reliability.
-   **Centralized Tool Registration**: Tool metadata (description, input schema) is defined centrally in the `ListToolsRequestSchema` handler in `src/main.ts`.
-   **Modular Structure**: The code is organized into modules based on functionality (api, constants, types, main server logic).

## Critical Implementation Paths

-   **Adding a New Tool**:
    1.  Define the new tool name as a constant in `src/constants/index.ts`.
    2.  Implement the corresponding API interaction function in `src/api/portainer.ts`. This function will use the `portainerClient` (axios instance) to call the relevant Portainer API endpoint.
    3.  If necessary, add new TypeScript type definitions for request/response payloads in `src/types/index.ts`.
    4.  In `src/main.ts`:
        *   Import the new API function from `src/api/portainer.ts`.
        *   Add a new tool definition (name, description, inputSchema) to the array returned by the `ListToolsRequestSchema` handler.
        *   Add a new `case` to the `switch` statement in the `CallToolRequestSchema` handler to call the new API function and return its result.
-   **Error Handling**: The `CallToolRequestSchema` handler includes a `try...catch` block. Errors from API calls (e.g., network issues, Portainer API errors) or internal logic should propagate to this handler to be returned as a structured error message to the MCP client. Axios errors might provide `error.response.data.message`.

## Assumptions

-   The Portainer API is RESTful and returns JSON.
-   The `PORTAINER_ENV_ID` (environment/endpoint ID) is largely static for the operations within this server, as it's fetched from an environment variable and used directly in API paths.

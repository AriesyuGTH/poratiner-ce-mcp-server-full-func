# Tech Context: Portainer CE MCP Server

## Core Technologies

-   **Runtime Environment**: Deno is the primary runtime environment for the server (`main.ts`, `api/portainer.ts`).
-   **Language**: TypeScript is used for all source code, providing static typing.
-   **Communication Protocol**: The server implements the Model Context Protocol (MCP) for interaction with LLM agents.

## Key Libraries and SDKs

-   **`@modelcontextprotocol/sdk`**: Used for the core MCP server implementation (Server class, StdioServerTransport, schema definitions). Referenced in `package.json` and imported in `src/main.ts`.
-   **`axios`**: An HTTP client library used to make API calls to the Portainer instance. Referenced in `package.json` and imported in `src/api/portainer.ts`.
-   **Deno Standard Library**:
    -   `deno.land/std/dotenv`: Used in `src/api/portainer.ts` to load environment variables from a `.env` file.
    -   `deno.land/std/assert`: Listed in `deno.json` imports, available for assertions (likely for testing, though not explicitly shown in provided application code).

## Development Environment and Workflow

-   **Configuration**:
    -   Server configuration (Portainer URL, API key, Environment ID) is managed through environment variables.
    -   A `.env` file is used to store these variables locally. An example is provided in `.env-sample`:
        -   `PORTAINER_BASE_URL`
        -   `PORTAINER_API_KEY`
        -   `PORTAINER_ENV_ID`
-   **Running in Development**:
    -   The server can be run with live reloading using Deno: `deno run --watch main.ts` (defined as a task in `deno.json`).
-   **Building**:
    -   The server can be compiled into an executable using Deno: `deno compile --allow-env --allow-read --allow-net --env-file=.env src/main.ts` (from `README.md`).
-   **Inspection**:
    -   The MCP Inspector can be used to interact with the server during development: `npx @modelcontextprotocol/inspector deno run --allow-env --allow-read --allow-net --env-file=.env src/main.ts` (from `README.md`).
-   **Testing**:
    -   A mandatory step: each implemented feature or tool must be thoroughly tested.
    -   The testing environment configuration is sourced from the `.env` file.
-   **Version Control**:
    -   Changes must be committed to version control after successful testing.
    -   `.gitignore` is configured to exclude environment files, build outputs (`src.exe`), Deno cache, Node.js modules, and common IDE/editor files.

## Project Structure

-   `src/`: Contains all source code.
    -   `api/portainer.ts`: Handles communication with the Portainer API.
    -   `constants/index.ts`: Defines constants, primarily tool names.
    -   `types/index.ts`: Contains TypeScript type definitions for Portainer entities.
    -   `main.ts`: The main entry point for the MCP server, handling tool registration and request dispatch.
-   `memory-bank/`: Contains documentation files for Cline's Memory Bank.
-   `package.json`: Lists Node.js dependencies (e.g., MCP SDK, axios).
-   `deno.json`: Deno-specific configuration, including tasks and import maps.
-   `README.md`: Project overview, setup instructions, and API tool list.

## Dependencies Management

-   **Deno Dependencies**: Managed via direct URL imports in `.ts` files (e.g., `https://deno.land/std...`) and potentially through an import map in `deno.json` (though the provided `imports` section is minimal).
-   **Node.js Dependencies**: Managed via `package.json` and `package-lock.json`. These are likely for tools run under Node.js (like `@modelcontextprotocol/inspector`) or for libraries that might be used by Deno via Node compatibility layers if applicable (though `axios` and `@modelcontextprotocol/sdk` seem to be directly imported in Deno files, suggesting Deno-compatible versions or usage).

## Tool Usage and Implementation Pattern

-   MCP tools are defined as string constants in `src/constants/index.ts`.
-   In `src/main.ts`, these tools are registered with the MCP server, including their descriptions and JSON input schemas.
-   A `CallToolRequestSchema` handler in `src/main.ts` uses a `switch` statement on the tool name to delegate execution to the appropriate function in `src/api/portainer.ts`.

## Prerequisites for Running

-   Deno installed.
-   A running Portainer instance with API access enabled.
-   Docker installed and running (as Portainer manages Docker).

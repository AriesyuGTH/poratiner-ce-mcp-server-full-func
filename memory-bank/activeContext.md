# Active Context: Portainer CE MCP Server

## Current Work Focus

The primary focus is to implement missing Portainer CE MCP server tools based on the user's updated requirements and the Portainer CE API Specification (`swagger-api-docs/api-swagger-essential.yaml`). The prioritized areas are:
1.  **Auth (Authentication)**: Implement `POST /auth` for username/password authentication.
2.  **Users (User Management)**: Implement CRUD operations for users, password management, and API key management.
3.  **Stacks (Stack Management)**: Implement CRUD operations for stacks, including various creation methods and lifecycle management.
4.  **Backup/Restore**: Implement system backup and restore functionalities.
5.  **LDAP**: Implement LDAP configuration management.
6.  **Container Management**: Review and enhance existing container tools if necessary.

The `authenticateUser` tool (for `POST /auth`) has been successfully implemented and tested.

## Recent Changes

-   Successfully implemented and tested the `authenticateUser` MCP tool.
    -   Added `Tools.AuthenticateUser` constant.
    -   Defined `AuthenticatePayload` and `AuthenticateResponse` types.
    -   Implemented `authenticateUser` function in `src/api/portainer.ts`.
    -   Registered and handled the tool in `src/main.ts`.
-   Added `portainer-ce-develop` server configuration to `cline_mcp_settings.json` to allow testing of the local Deno server.
-   Troubleshot and resolved Deno server startup and connection issues by running `npm install` and ensuring correct `.env` configuration and server restart.
-   Analyzed `swagger-api-docs/api-swagger-essential.yaml` against existing tools.
-   Identified a detailed list of unimplemented API functionalities.
-   User confirmed the priority areas for implementation.

## Next Steps - Task Execution

The next priority is **Users (User Management)**. This will involve:
1.  Analyzing Swagger definitions for user-related endpoints (list, create, inspect, update, delete users; manage API keys; manage passwords).
2.  Defining new tool constants in `src/constants/index.ts`.
3.  Adding necessary type definitions in `src/types/index.ts`.
4.  Implementing API functions in `src/api/portainer.ts`.
5.  Registering and handling tools in `src/main.ts`.
6.  Testing each new user management tool.
7.  Committing changes.
8.  Optionally, compiling the server after a set of user management tools are completed.

## Active Decisions and Considerations

-   **Development Workflow:**
    -   Each implemented feature (API tool) must be thoroughly tested.
    -   The testing environment details are specified in the `.env` file.
    -   Upon successful testing, changes must be committed to version control.
-   **Consistency:** New implementations must align with the existing coding style, architectural patterns, and documentation standards.
-   **Memory Bank Maintenance:** The Memory Bank files, especially `activeContext.md` and `progress.md`, must be updated regularly to reflect the current state of work, decisions, and learnings.

## Important Patterns and Preferences

-   Adherence to MCP specifications for tool definition and interaction.
-   Code style and architecture should be consistent with the existing `src/api/portainer.ts`.

## Learnings and Project Insights

-   The project involves integrating with an external API (Portainer) via a standardized protocol (MCP).
-   The primary API specification is now targeted via SwaggerHub (version 2.27.4: https://app.swaggerhub.com/apis/portainer/portainer-ce/2.27.4#/). Previous local files (`api-swagger.yaml`, `swagger-api-docs/api-swagger 5.yaml`) were too large to read directly.
-   A testing and version control discipline is required.

## Current Blockers/Challenges
- Accessing the full content of the API specification on SwaggerHub via browser automation tools is proving difficult due to UI interaction limitations (scrolling specific panes, triggering downloads).
- The local file `swagger-api-docs/api-swagger 5.yaml` (intended as an alternative) was also too large to be read by the `read_file` tool.
- Awaiting user to provide the raw OpenAPI/Swagger YAML/JSON content directly for analysis.

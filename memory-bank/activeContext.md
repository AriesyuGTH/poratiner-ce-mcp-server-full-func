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

-   Successfully implemented, tested, and compiled the `authenticateUser` MCP tool.
    -   Added `Tools.AuthenticateUser` constant.
    -   Defined `AuthenticatePayload` and `AuthenticateResponse` types.
    -   Implemented `authenticateUser` function in `src/api/portainer.ts`.
    -   Registered and handled the tool in `src/main.ts`.
-   Added `portainer-ce-develop` server configuration to `cline_mcp_settings.json` for testing.
-   Resolved Deno server startup and connection issues.
-   Successfully compiled the project to `src.exe` using `deno compile`.
-   Committed changes related to `authenticateUser` tool with message "feat: add authenticateUser tool".
-   Analyzed `swagger-api-docs/api-swagger-essential.yaml`.
-   Identified unimplemented API functionalities.
-   User confirmed priority areas.

## Recent Changes (Continued)
-   Successfully implemented and tested the `list_users` MCP tool.
    -   Added `Tools.ListUsers` constant.
    -   Defined `User` and related types.
    -   Implemented `listUsers` function in `src/api/portainer.ts`.
    -   Registered and handled the tool in `src/main.ts`.
    -   Recompiled the project to include the new tool in `src.exe`.
    -   Tested `list_users` successfully using the compiled `portainer-ce-develop` server.

## Recent Changes (Continued)
-   Attempted to test `create_user` tool, but failed due to Portainer's current authentication method (OAuth/LDAP) not allowing user creation with a password via API.
-   **Decision**: User creation functionality is temporarily paused. Code changes made for `create_user` (constants, types, initial function and MCP registration) remain in the codebase but are untested and incomplete.

## Recent Changes (Continued)
-   Successfully implemented and tested the `list_stacks` MCP tool.
    -   Added `Tools.ListStacks` constant.
    -   Defined `Stack` and related types (`Pair`, `AutoUpdateSettings`, `StackOption`, `GitAuthentication`, `GitRepoConfig`, `TeamResourceAccess`, `UserResourceAccess`, `ResourceControl`).
    -   Implemented `listStacks` function in `src/api/portainer.ts`.
    -   Registered and handled the tool in `src/main.ts`.
    -   Recompiled the project to include the new tool in `src.exe`.
    -   Tested `list_stacks` successfully using the compiled `portainer-ce-develop` server.

## Next Steps - Task Execution

Continuing with **Stacks (Stack Management)**. The next logical tool to implement would be to inspect a single stack, e.g., `inspect_stack` (corresponds to `GET /api/stacks/{id}`).

The implementation steps for `inspect_stack` will be:
1.  **Update Memory Bank**: Reflect current focus.
2.  **Define Tool Constant**: Add `InspectStack` to `Tools`.
3.  **Add Type Definitions**: The response type is `portainer.Stack`, which we already have as `Stack`. No new request payload type is needed if we pass ID as a simple argument.
4.  **Implement API Function**: Create `inspectStack(id: number)` in `src/api/portainer.ts`.
5.  **Register Tool**: Add tool definition for `inspect_stack` in `src/main.ts` (input will be stack ID).
6.  **Handle Tool Call**: Add a case for `Tools.InspectStack` in `src/main.ts`.
7.  **Testing**: Test the `inspect_stack` tool.
8.  **Compilation**: Compile the server.
9.  **Git Commit & Push**: Commit and push changes.

Following `inspect_stack`, other Stack Management tools will be implemented.

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

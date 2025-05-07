# Product Context: Portainer CE MCP Server

## Why This Project Exists

This project exists to provide an MCP (Model Context Protocol) server, enabling LLM (Large Language Model) agents to interact with the Portainer container management tool.

## Problems It Solves

- **Standardized Tool Usage:** MCP provides a standardized format for LLM agents to use tools, ensuring correct interaction with the target API (Portainer).
- **Improved Accuracy:** By adhering to the MCP specification, the interaction between the LLM agent and Portainer becomes more reliable and accurate.
- **Real-time Tool Updates:** MCP facilitates timely updates to tools, ensuring that the LLM agent always uses the most current interface to Portainer.

## How It Should Work

LLM agents will interact with the MCP server via an MCP client. The MCP server will then translate these interactions into API calls to the Portainer instance.

## User Experience Goals

- **Consistency:** The implementation of new API tools should follow the existing code's style and architectural patterns. This ensures a consistent and maintainable codebase.
- **Developer Experience:** The primary users (developers integrating LLM agents) should find the MCP server easy to understand, use, and extend.

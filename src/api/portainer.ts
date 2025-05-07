import axios, { AxiosInstance } from "axios";
import { User, UserCreatePayload, Stack } from "../types/index.ts"; // Import User, UserCreatePayload, and Stack types

import { load } from "https://deno.land/std@0.220.1/dotenv/mod.ts";

load({ export: true });

const PORTAINER_BASE_URL = Deno.env.get("PORTAINER_BASE_URL");
const PORTAINER_API_KEY = Deno.env.get("PORTAINER_API_KEY");
const PORTAINER_ENV_ID = Deno.env.get("PORTAINER_ENV_ID");

const portainerClient: AxiosInstance = axios.create({
  baseURL: PORTAINER_BASE_URL,
  headers: { "X-API-Key": PORTAINER_API_KEY },
  timeout: 30000,
});

/**
 * Fetch all Docker containers from a specified environment
 * @param envId - The ID of the environment to fetch containers from
 * @returns Array of Docker containers
 */
async function fetchDockerContainers() {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/json`,
    {
      params: {
        all: true,
      },
    },
  );

  return response.data;
}

/**
 * Create a new Docker container in a specified environment
 * @param containerName - The name of the container to create
 * @param image - The Docker image to use for the container
 * @param exposedPorts - Ports to expose from the container
 * @param hostConfig - Host configuration for the container
 * @returns Container creation response
 */
async function createDockerContainer(
  containerName: string,
  image: string,
  exposedPorts: Record<string, unknown>,
  hostConfig: Record<string, unknown>,
) {
  const response = await portainerClient.post(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/create`,
    {
      name: containerName,
      Image: image,
      ExposedPorts: exposedPorts,
      HostConfig: hostConfig,
    },
  );
  return response.data;
}

/**
 * Start a Docker container in a specified environment
 * @param containerId - The ID of the container to start
 * @returns Empty response on success
 */
async function startDockerContainer(
  containerId: string,
) {
  await portainerClient.post(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/${containerId}/start`,
  );
}

/**
 * Delete a Docker container from a specified environment
 * @param containerId - The ID of the container to delete
 * @param force - Whether to force the deletion of the container
 * @returns Empty response on success
 */
async function deleteDockerContainer(
  containerId: string,
  force: boolean = false,
) {
  await portainerClient.delete(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/${containerId}`,
    {
      params: {
        force: force,
      },
    },
  );
}

/**
 * Fetch logs from a Docker container
 * @param containerId - The ID of the container to fetch logs from
 * @param since - Timestamp to start fetching logs from
 * @param follow - Whether to follow the logs
 * @param timestamps - Whether to include timestamps
 * @param tail - Number of lines to return from the end of the logs
 * @returns Container logs
 */
async function fetchContainerLogs(
  containerId: string,
  since: number = 0,
  timestamps: boolean = false,
  tail: string = "100",
) {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/${containerId}/logs`,
    {
      params: {
        since: since,
        stdout: true,
        timestamps: timestamps,
        tail: tail,
      },
    },
  );
  return response.data;
}

/**
 * Update resource limits for a Docker container
 * @param containerId - The ID of the container to update
 * @param memory - Memory limit in bytes
 * @param memorySwap - Memory swap limit in bytes
 * @param restartPolicy - Restart policy for the container
 * @returns Empty response on success
 */
async function updateContainerResourceLimits(
  containerId: string,
  memory: number,
  memorySwap: number,
  restartPolicy: Record<string, unknown>,
) {
  await portainerClient.post(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/${containerId}/update`,
    {
      Memory: memory,
      MemorySwap: memorySwap,
      RestartPolicy: restartPolicy,
    },
  );
}

/**
 * Delete all stopped containers from a specified environment
 * @param envId - The ID of the environment to clean up
 * @returns Prune response with deleted container IDs
 */
async function pruneContainer() {
  const response = await portainerClient.delete(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/containers/prune`,
    {
      params: {
        all: true,
      },
    },
  );
  return response.data;
}

/**
 * Fetch all Docker images from a specified environment
 * @returns Array of Docker images
 */
async function fetchImages() {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/images/json`,
  );
  return response.data;
}

/**
 * Delete the build cache for Docker images
 * @param envId - The ID of the environment to clean up
 * @returns Prune response with deleted image IDs
 */
async function deleteImageBuildCache() {
  const response = await portainerClient.delete(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/images/prune`,
  );
  return response.data;
}

/**
 * Delete unused Docker images
 * @returns Prune response with deleted image IDs
 */
async function deleteUnusedImages() {
  const response = await portainerClient.delete(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/images/prune`,
  );
  return response.data;
}

/**
 * Fetch all Docker networks from a specified environment
 * @returns Array of Docker networks
 */
async function fetchNetworks() {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/networks`,
  );
  return response.data;
}

/**
 * Fetch all Docker services from a specified environment
 * @returns Array of Docker services
 */
async function fetchServices() {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/services`,
  );
  return response.data;
}

/**
 * Fetch logs from a Docker service
 * @param serviceId - The ID of the service to fetch logs from
  * @param since - Timestamp to start fetching logs from
 * @param timestamps - Whether to include timestamps
 * @param tail - Number of lines to return from the end of the logs
 * @returns Service logs
 */
async function fetchServiceLog(
  serviceId: string,
  since: number = 100,
  timestamps: boolean = false,
  tail: string = "100",
) {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/services/${serviceId}/logs`,
    {
      params: {
        stdout: true,
        since: since,
        timestamps: timestamps,
        tail: tail,
      },
    },
  );
  return response.data;
}


/**
 * Inspect a Docker service
 * @param serviceId - The ID of the service to inspect
 * @returns Service inspection response
 */
async function inspectService(serviceId: string) {
  const response = await portainerClient.get(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/services/${serviceId}`,
  );
  return response.data;
}


/**
 * Update a Docker service
 * @param serviceId - The ID of the service to update
 * @returns Service update response
 */

async function restartDockerService(serviceId: string) {
  const service = await inspectService(serviceId);
  const version = service.Version.Index;
  const spec = service.Spec;

  const response = await portainerClient.post(
    `/api/endpoints/${PORTAINER_ENV_ID}/docker/services/${serviceId}/update`,
    spec,
    {
      params: {
        version: version,
      },
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
}


export {
  createDockerContainer,
  deleteDockerContainer,
  deleteImageBuildCache,
  deleteUnusedImages,
  fetchContainerLogs,
  fetchDockerContainers,
  fetchImages,
  fetchNetworks,
  fetchServiceLog,
  fetchServices,
  pruneContainer,
  startDockerContainer,
  updateContainerResourceLimits,
  restartDockerService,
  inspectService,
  authenticateUser,
  listUsers,
  createUser,
  listStacks, // Add new function to exports
};

/**
 * Authenticate a user against Portainer API.
 * @param payload - Username and password for authentication.
 * @returns Authentication response with JWT token.
 */
async function authenticateUser(
  payload: { username?: string; password?: string },
): Promise<{ jwt?: string }> {
  const response = await portainerClient.post(
    `/api/auth`,
    payload,
  );
  return response.data;
}

/**
 * Fetch all users from Portainer API.
 * @returns Array of User objects.
 */
async function listUsers(): Promise<User[]> {
  const response = await portainerClient.get(`/api/users`);
  return response.data as User[];
}

/**
 * Create a new user in Portainer.
 * @param payload - User creation data (username, password, role).
 * @returns The created User object.
 */
async function createUser(payload: UserCreatePayload): Promise<User> {
  const response = await portainerClient.post(`/api/users`, payload);
  return response.data as User;
}

/**
 * Fetch all stacks from Portainer API.
 * @returns Array of Stack objects.
 */
async function listStacks(): Promise<Stack[]> {
  // The GET /api/stacks endpoint can accept a 'filters' query parameter (JSON encoded)
  // For this initial implementation, we will not pass any filters.
  const response = await portainerClient.get(`/api/stacks`);
  return response.data as Stack[];
}

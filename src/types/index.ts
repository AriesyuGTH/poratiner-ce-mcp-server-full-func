export interface DockerContainer {
    Id: string;
    Names: string[];
    Image: string;
    ImageID: string;
    Command: string;
    Created: number;
    State: string;
    Status: string;
    Ports: Array<{
        IP?: string;
        PrivatePort: number;
        PublicPort?: number;
        Type: string;
    }>;
    Labels: Record<string, string>;
    NetworkSettings: {
        Networks: Record<string, unknown>;
    };
    Mounts: Array<{
        Type: string;
        Name?: string;
        Source: string;
        Destination: string;
        Driver?: string;
        Mode: string;
        RW: boolean;
        Propagation: string;
    }>;
}

export interface DockerImage {
    Id: string;
    ParentId: string;
    RepoTags: string[];
    RepoDigests: string[];
    Created: number;
    Size: number;
    VirtualSize: number;
    Labels: Record<string, string>;
}

export interface DockerNetwork {
    Id: string;
    Name: string;
    Scope: string;
    Driver: string;
    EnableIPv6: boolean;
    IPAM: {
        Driver: string;
        Options: Record<string, string>;
        Config: Array<{
            Subnet: string;
            Gateway: string;
        }>;
    };
    Internal: boolean;
    Attachable: boolean;
    Ingress: boolean;
    ConfigFrom: {
        Network: string;
    };
    ConfigOnly: boolean;
    Containers: Record<string, unknown>;
    Options: Record<string, string>;
}

export interface DockerService {
    ID: string;
    Version: {
        Index: number;
    };
    CreatedAt: string;
    UpdatedAt: string;
    Spec: {
        Name: string;
        Labels: Record<string, string>;
        TaskTemplate: {
            ContainerSpec: {
                Image: string;
            };
        };
        Mode: {
            Replicated: {
                Replicas: number;
            };
        };
    };
    Endpoint: {
        Spec: {
            Mode: string;
            Ports: Array<{
                Protocol: string;
                TargetPort: number;
                PublishedPort: number;
                PublishMode: string;
            }>;
        };
    };
    UpdateStatus: {
        State: string;
        StartedAt: string;
        CompletedAt: string;
        Message: string;
    };
}

/**
 * Payload for user authentication.
 * Based on `auth.authenticatePayload` from Swagger.
 */
export interface AuthenticatePayload {
    username?: string;
    password?: string;
}

/**
 * Response for user authentication.
 * Based on `auth.authenticateResponse` from Swagger.
 */
export interface AuthenticateResponse {
    jwt?: string;
}

/**
 * Represents user authorizations, mapping permission names to boolean values.
 * Based on `portainer.Authorizations` from Swagger.
 */
export interface Authorizations {
    [key: string]: boolean;
}

/**
 * Represents endpoint-specific authorizations.
 * Maps endpoint identifiers (as strings) to Authorizations objects.
 * Based on `portainer.EndpointAuthorizations` from Swagger.
 */
export interface EndpointAuthorizations {
    [key: string]: Authorizations;
}

/**
 * Represents user theme settings.
 * Based on `portainer.UserThemeSettings` from Swagger.
 */
export interface UserThemeSettings {
    color?: "dark" | "light" | "highcontrast" | "auto";
}

/**
 * Represents a Portainer user.
 * Based on `portainer.User` from Swagger.
 */
export interface User {
    Id?: number;
    Username?: string;
    Role?: number; // 1 for administrator, 2 for regular user
    UserTheme?: string; // Deprecated
    ThemeSettings?: UserThemeSettings;
    TokenIssueAt?: number;
    UseCache?: boolean;
    // Deprecated fields, but included for completeness if API still returns them
    endpointAuthorizations?: EndpointAuthorizations; // Deprecated
    portainerAuthorizations?: Authorizations; // Deprecated
}

/**
 * Payload for creating a new user.
 * Based on `users.userCreatePayload` from Swagger.
 */
export interface UserCreatePayload {
    username: string;
    password: string;
    role: number; // 1 for administrator, 2 for regular user
}

/**
 * Represents a key-value pair.
 * Based on `portainer.Pair` from Swagger.
 */
export interface Pair {
    name?: string;
    value?: string;
}

/**
 * Settings for GitOps auto-update.
 * Based on `portainer.AutoUpdateSettings` from Swagger.
 */
export interface AutoUpdateSettings {
    forcePullImage?: boolean;
    forceUpdate?: boolean;
    interval?: string;
    jobID?: string;
    webhook?: string;
}

/**
 * Options for a stack.
 * Based on `portainer.StackOption` from Swagger.
 */
export interface StackOption {
    prune?: boolean;
}

/**
 * Git authentication details.
 * Based on `gittypes.GitAuthentication` from Swagger.
 */
export interface GitAuthentication {
    gitCredentialID?: number;
    password?: string;
    username?: string;
}

/**
 * Git repository configuration.
 * Based on `gittypes.RepoConfig` from Swagger.
 */
export interface GitRepoConfig {
    authentication?: GitAuthentication;
    configFilePath?: string;
    configHash?: string;
    referenceName?: string;
    tlsskipVerify?: boolean;
    url?: string;
}

/**
 * Access details for a team on a resource.
 * Based on `portainer.TeamResourceAccess` from Swagger.
 */
export interface TeamResourceAccess {
    AccessLevel?: number;
    TeamId?: number;
}

/**
 * Access details for a user on a resource.
 * Based on `portainer.UserResourceAccess` from Swagger.
 */
export interface UserResourceAccess {
    AccessLevel?: number;
    UserId?: number;
}

/**
 * Resource control definition.
 * Based on `portainer.ResourceControl` from Swagger.
 */
export interface ResourceControl {
    AccessLevel?: number;
    AdministratorsOnly?: boolean;
    Id?: number;
    OwnerId?: number; // Deprecated
    Public?: boolean;
    ResourceId?: string;
    SubResourceIds?: string[];
    System?: boolean;
    TeamAccesses?: TeamResourceAccess[];
    UserAccesses?: UserResourceAccess[];
    Type?: number;
}

/**
 * Represents a Portainer stack.
 * Based on `portainer.Stack` from Swagger.
 */
export interface Stack {
    Id?: number;
    Name?: string;
    Type?: number; // 1 for Swarm, 2 for Compose
    EndpointId?: number;
    SwarmId?: string;
    EntryPoint?: string;
    Env?: Pair[];
    Status?: number; // 1 for active, 2 for inactive
    ProjectPath?: string;
    Option?: StackOption;
    ResourceControl?: ResourceControl;
    AdditionalFiles?: string[];
    AutoUpdate?: AutoUpdateSettings;
    fromAppTemplate?: boolean;
    gitConfig?: GitRepoConfig;
    namespace?: string;
    createdBy?: string;
    creationDate?: number;
    updatedBy?: string;
    updateDate?: number;
}

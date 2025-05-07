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

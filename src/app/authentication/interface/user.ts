export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    telephone?: string;
    title?: string;
    imageUrl?: string;
    loginAttempts: number;
    usingMfa: boolean
    isEnabled: boolean;
    isNotLocked: boolean;
    isExpired: boolean;
    roleName: string;
    permissions: string;
    lastLogin?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

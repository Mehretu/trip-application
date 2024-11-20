
export const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    DRIVER: 'driver',
    SERVICE: 'service',
};

export const PERMISSIONS = {
    [ROLES.USER]: ['read'],
    [ROLES.ADMIN]: ['read', 'write', 'delete', 'manage_users'],
    [ROLES.DRIVER]: ['read', 'accept_rides', 'complete_rides'],
    [ROLES.SERVICE]: ['read', 'manage_services'],
};


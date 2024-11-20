import { ROLES, PERMISSIONS } from '../../../../shared/auth'

export const signAccessToken = (userId: string, role: string = ROLES.USER):
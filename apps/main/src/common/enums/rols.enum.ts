export enum RolEnum {
  USER = 1,
  EDITOR = 2,
  ADMIN = 3,
  SUPERADMIN = 4,
}

export const ROL_LABELS: Record<RolEnum, string> = {
  [RolEnum.USER]: 'Usuario',
  [RolEnum.EDITOR]: 'Editor',
  [RolEnum.ADMIN]: 'Administrador',
  [RolEnum.SUPERADMIN]: 'Super Administrador',
};
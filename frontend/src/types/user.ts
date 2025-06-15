// src/types/user.ts
export type UserRol = 'admin' | 'empleado';

export interface CompanyUser {
  _id: string;
  email: string;
  empresa_id: string;
  rol: UserRol;
}

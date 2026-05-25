export type AdminRole = "admin";

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
};

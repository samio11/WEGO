export enum ERole {
  ADMIN = "ADMIN",
  RIDER = "RIDER",
  DRIVER = "DRIVER",
}
export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  profileImage?: string;
  role?: ERole.RIDER;
  isBlocked?: boolean;
};

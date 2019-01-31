export interface IUserData {
  id: string;
  badgeId: string;
}

export interface IUser extends IUserData {
  name: string;
  pin: string;
}

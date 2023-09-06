import { UserRole } from "../common/constants";

export interface IUser {
  _id: string;
  username: string;
  role: UserRole;
  picturePath: string;
  friendList: Array<{ userId: string; username: string }>;
  location: string;
  occupation: string;
}

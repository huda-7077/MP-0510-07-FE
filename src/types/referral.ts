import { User } from "./user";

export interface Referral {
  id: number;
  inviterId: number;
  inviteeId: number;
  createdAt: Date;
  inviter: Pick<User, "fullname">;
  invitee: Pick<User, "fullname">;
}

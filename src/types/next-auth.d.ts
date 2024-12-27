import { type DefaultSession } from "next-auth";
import { User } from "./user";
interface Payload extends User {
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: Payload;
  }
}

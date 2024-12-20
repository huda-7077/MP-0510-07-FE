import { User } from "./user";
import { type DefaultSession } from "next-auth";
interface Payload extends User {
  token: string;
}

declare module "next-auth" {
  interface Session {
    user: Payload;
  }
}

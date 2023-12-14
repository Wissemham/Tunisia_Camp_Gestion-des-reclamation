import { User } from "./user";

export class Claim {
  idClaim!: number;
  creation!: Date;
  title!: string;
  category!: string;
  content!: string;
  state!: boolean;
  sentimentScore!: number;
  admin!: User;
  user!: User;
}

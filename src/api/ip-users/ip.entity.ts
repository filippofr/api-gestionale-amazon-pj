import { Types } from "mongoose";
import { User } from "../user/user.entity";

export interface IpAddress {
    id?: string;
    ipAddress: string;
    date: Date;
    result: string;
}
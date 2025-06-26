import { DataState } from "../emum/data-state";
import {Role} from "./role";
import {User} from "./user";
import {Event} from './event';

export interface LoginState {
  dataState: DataState;
  loginSuccess?: boolean;
  error?: string;
  message?: string;
  isUsingMfa?: boolean;
  telephone?: string;
}

export interface CustomHttpResponse<T> {
  timestamp: Date;
  statusCode: number;
  status: string;
  message: string;
  reason?: string;
  developerMessage?: string;
  data?: T;
}

export interface Profile {
  user: User;
  events?: Event[]
  roles?: Role[];
  access_token?: string;
  refresh_token?: string;
}


import { DataState } from "../emum/data-state";

export interface State<T> {
  dataState: DataState,
  appData?: T;
  error?: string
}
import { createFeatureSelector } from "@ngrx/store";
import { Appstate } from "./appstate";

export const selecAppState = createFeatureSelector<Appstate>("myappstate")  
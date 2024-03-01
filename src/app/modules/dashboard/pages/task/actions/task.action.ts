import { createAction, props } from "@ngrx/store";
import { ITask } from "../models/task";


export const loadTask   = createAction('[Task Component] load task');
export const loadTaskSuccess    = createAction('[Task Component] load task success', props<{list: ITask[]}>());
export const loadTaskFaild  = createAction('[Task Component] load task faild', props<{errormessage: string}>);  
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TaskService } from "../service/task.service";
import { loadTask, loadTaskFaild, loadTaskSuccess } from "../actions/task.action";
import { exhaustMap, map, catchError } from "rxjs";

@Injectable()
export class TaskEffects{
    constructor(private action$: Actions, private service: TaskService){}

    _loadtask = createEffect(()=>
        this.action$.pipe(
            ofType(loadTask),
            exhaustMap((action)=>{
                return this.service.getAll().pipe(
                    map((data)=>{
                        return loadTaskSuccess({ list: data })
                    }),
                    catchError((_error) => of(loadTaskFaild({ errormessage: _error.message })))
                )
            })
        )
    )
}
import { TaskModel } from "../models/task";

export const TaskState: TaskModel={
    list: [],
    taskobj: {
        name: "",
        description: "",
        statusTask: "",
        tags: [],
        startDate: undefined,
        endDate: undefined,
        user: undefined
    },
    errorMessage: ""
}
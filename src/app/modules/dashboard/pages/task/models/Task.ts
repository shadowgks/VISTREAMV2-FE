import { IUser } from "../../user/models/User";

export interface ITask{
    name:           string;
    description:    string;
    statusTask:     string;
    tags:           string[];
    startDate:      Date | undefined;
    endDate:        Date | undefined;
    user:           IUser | undefined;
    assignedToUser?: IUser;
}

export interface TaskModel{
    list: ITask[],
    taskobj: ITask,
    errorMessage: string
}
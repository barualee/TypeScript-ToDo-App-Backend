import { ITaskDescription } from "./ITaskDescription";
import { ITaskHeader } from "./ITaskHeader";
import { ITaskFooter } from "./ITaskFooter";

export interface ITask extends ITaskFooter, ITaskDescription, ITaskHeader {
    priority?: string;
}
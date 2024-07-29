import React from "react";
import { Interface } from "readline";

export interface ITaskFooter{
    status?: string;
    id: string;
    
    onStatusChange?: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    onClick?: (e: | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>, id: string) => void;
};
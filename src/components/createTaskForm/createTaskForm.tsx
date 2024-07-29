import React, { FC, ReactElement, useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import { Box, Typography, Stack, LinearProgress, Alert, AlertTitle, Button } from '@mui/material';

import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskSelectField } from './_taskSelectField';
import { TaskDateField } from './_taskDateField';
import { Priority } from './enums/Priority';
import { Status } from './enums/Status';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';
import { TaskStatusChangedContext } from '../../context';

export const CreateTaskForm: FC = (): ReactElement => {
    
    //declare component states
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(undefined);
    const [date, setDate] = useState<Date | null>(new Date());
    const [status, setStatus] = useState<string>(Status.todo);
    const [priority, setPriority] = useState<string>(Priority.normal);

    const [showSuccess, setShowSuccess] = useState<boolean>(false);

    const tasksUpdatedContext = useContext(TaskStatusChangedContext);
    
    //create task mutation
    const createTaskMutation = useMutation((data:ICreateTask) =>
        sendApiRequest(
            'http://localhost:3200/tasks',
            'POST',
            data
        ),
    );

    function createTaskhandler() {
        if(!title || !description || !date) {
            return;
        }

        const task: ICreateTask = {
            title,
            description,
            date: date.toString(),
            status,
            priority
        };

        createTaskMutation.mutate(task);
    }

    useEffect(() => {
        if (createTaskMutation.isSuccess) {
            setShowSuccess(true);

            setTitle('');
            setStatus(Status.todo);
            setPriority(Priority.normal);
            setDate(new Date());
            setDescription('');

            tasksUpdatedContext.toggle();
        }
        //shows for 7 seconds
        const successTimeout = setTimeout(() => {
            setShowSuccess(false);
        }, 7000);
        
        //this helps to avoid firing every 7 seconds.
        return () => {
            clearTimeout(successTimeout);
        };
    }, [createTaskMutation.isSuccess]);

    return(
        <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
        px={4}
        my={6}
        >
            {showSuccess && (<Alert severity='success' sx={{width:'100%' , marginBottom: '16px'}}>
                <AlertTitle>Success</AlertTitle>
            The Task has been created successfully
            </Alert>)}

            <Typography mb={2} component="h2" variant="h6">
                Create a Task
            </Typography>
            <Stack sx={{width: '100%'}} spacing={2}>
                <TaskTitleField 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDescriptionField 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={createTaskMutation.isLoading}
                />
                <TaskDateField 
                    value={date}
                    onChange={(date) => setDate(date)}
                    disabled={createTaskMutation.isLoading}
                />
                <Stack 
                sx={{width: '100%'}}
                direction="row"
                spacing={2}
                >
                    <TaskSelectField 
                    label="Status"
                    name="status"
                    disabled={createTaskMutation.isLoading}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as string)}
                    items={[
                        {
                            value: Status.todo,
                            label: Status.todo.toUpperCase(),
                        },
                        {
                            value: Status.inProgress,
                            label: Status.inProgress.toUpperCase(),
                        },
                    ]}
                    />
                    <TaskSelectField 
                    label="Priority"
                    name="priority"
                    disabled={createTaskMutation.isLoading}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as string)}
                    items={[
                        {
                            value: Priority.low,
                            label: Priority.low.toUpperCase(),
                        },
                        {
                            value: Priority.normal,
                            label: Priority.normal.toUpperCase(),
                        },
                        {
                            value: Priority.high,
                            label: Priority.high.toUpperCase(),
                        },
                    ]}
                    />
                </Stack>
                {createTaskMutation.isLoading && <LinearProgress />}
                <Button 
                    disabled={!title || !description || !status || !date || !priority}
                    onClick={createTaskhandler} variant="contained" size="large" fullWidth>
                    Create a Task
                </Button>
            </Stack>
        </Box>
    );
};
import { Box, Grid, Alert, LinearProgress } from '@mui/material';
import React, { FC, ReactElement, useContext, useEffect } from 'react';
import { format } from 'date-fns';

import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useQuery, useMutation } from 'react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';
import { countTasks } from './helpers/countTasks';
import { TaskStatusChangedContext } from '../../context';

export const TaskArea: FC = (): ReactElement => {
    
    const tasksUpdatedContext = useContext(TaskStatusChangedContext);

    const {error, isLoading, data, refetch} = useQuery(
        'tasks',
        async() => {
            return await sendApiRequest<ITaskApi[]>(
                'http://localhost:3200/tasks',
                'GET'
            );
        },
    );

    //update task mutation
    const updateTaskMutation = useMutation((data: IUpdateTask) => sendApiRequest(
        'http://localhost:3200/tasks',
        'PUT',
        data
    ));

    useEffect(() => {refetch()}, [tasksUpdatedContext.updated])

    useEffect(() => {
        if(updateTaskMutation.isSuccess) {
            tasksUpdatedContext.toggle();
        }
    },[updateTaskMutation.isSuccess]);

    function onStatusChangeHandler (
        e: React.ChangeEvent<HTMLInputElement>,
        id:string,
    ) {
        updateTaskMutation.mutate({
            id,
            status: e.target.checked ? Status.inProgress : Status.todo
        })
    }

    function markCompleteHandler (
        e: | React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>,
        id: string,
    ) {
        updateTaskMutation.mutate({id, status:Status.completed})
    }   

    return(
        <Grid item md={8} px={4}>
            <Box mb={8} px={4}>
                <h2>Status of your tasks as on{' '}
                    {format(new Date(), 'PPPP')}
                </h2>
            </Box>
            <Grid
            container
            display="flex"
            justifyContent="center"
            >
                <Grid 
                item
                display="flex"
                justifyContent="space-around"
                flexDirection="row"
                alignItems="center"
                md={10}
                xs={12}
                mb={8}>
                    <TaskCounter 
                    count={
                        data ? countTasks(data, Status.todo): undefined
                    }
                    status={Status.todo}/>
                    <TaskCounter 
                    count={
                        data ? countTasks(data, Status.inProgress): undefined
                    }
                    status={Status.inProgress}/>
                    <TaskCounter 
                    count={
                        data ? countTasks(data, Status.completed): undefined
                    }
                    status={Status.completed}/>
                </Grid>
                
                <Grid 
                item
                display="flex"
                flexDirection="column"
                md={8}
                xs={10}>
                    <>
                    {error && (<Alert severity='error'>Error fetching tasks</Alert>)}

                    {!error && Array.isArray(data) && data.length === 0 && 
                    (<Alert severity="warning">No tasks created yet</Alert>)}

                    {isLoading ? (<LinearProgress/>) : 
                    (
                    Array.isArray(data) && data.length > 0 &&
                    data.map((each,index) => { 
                        
                        return each.status === Status.todo || each.status ===Status.inProgress ? (
                        <Task 
                            key={index + each.priority}
                            id={each.id}
                            title={each.title}
                            date={new Date(each.date)}
                            description={each.description}
                            status={each.status}
                            priority={each.priority}
                            onStatusChange={onStatusChangeHandler}
                            onClick={markCompleteHandler}
                        />) : (false);
                    })
                    )}
                    </>
                </Grid>
            </Grid>
        </Grid>
    );
};
import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TaskHeader } from './_taskHeader';
import { TaskDescription } from './_taskDescription';
import { TaskFooter } from './_taskFooter';
import { Status } from '../createTaskForm/enums/Status';
import { Priority } from '../createTaskForm/enums/Priority';

import { RenderPriorityColorBorder  } from './helpers/renderPriorityColorBorder';

import { ITask } from './interfaces/ITask';

import PropTypes from 'prop-types';

export const Task: FC<ITask> = (props): ReactElement => {
    
    const {
        title='Title',
        date = new Date(),
        description = 'text one two three',
        priority = Priority.high,
        status = Status.completed,
        onStatusChange = (e) => console.log(e),
        onClick = (e) => console.log(e),
        id,
    } = props;
    
    return(
        <Box
        display="flex"
        width="100%"
        justifyContent="flex-start"
        flexDirection="column"
        mb={4}
        p={2}
        sx={{
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: RenderPriorityColorBorder(priority)
        }}>
            <TaskHeader title={title} date={date} />
            <TaskDescription description={description} /> 
            <TaskFooter 
                onClick={onClick} 
                onStatusChange={onStatusChange}
                id={id}
                status={status}
            />
        </Box>
    )
};

Task.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    onStatusChange: PropTypes.func,
    onClick: PropTypes.func,
    priority: PropTypes.string,
    status: PropTypes.string,
}
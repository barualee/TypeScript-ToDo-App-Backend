import React, { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';
import  PropTypes  from 'prop-types';

export const TaskDescriptionField: FC<ITextField> = (props): ReactElement => {
        //destrucutre props
        const { onChange = (e) => console.log(e), disabled=false, value} = props;
    
    return(
        <TextField
        id="description"
        label="Description"
        placeholder='Description'
        variant='outlined'
        size='small'
        name='description'
        multiline
        rows={4}
        fullWidth
        disabled={disabled}
        onChange={onChange}
        value={value}
        />
    )
};

TaskDescriptionField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};
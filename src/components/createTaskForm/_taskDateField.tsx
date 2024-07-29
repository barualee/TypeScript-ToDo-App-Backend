import React, { FC, ReactElement } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { TextField } from '@mui/material';

import  PropTypes  from 'prop-types';

import { IDateField } from './interfaces/IDateField';

export const TaskDateField: FC<IDateField> = (props): ReactElement => {
    
    const {value = new Date(), disabled = false, onChange = (date) => console.log(date)} = props;
    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                label="Task Date"
                format="dd/MM/yyyy"
                value={value}
                onChange={onChange}
                disabled={disabled}
                />
            </LocalizationProvider>
        </>
    );
};

TaskDateField.propTypes = {
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    value: PropTypes.instanceOf(Date),
};
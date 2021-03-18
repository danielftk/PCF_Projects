import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { IInputs } from '../../generated/ManifestTypes';

export interface Iprops {
    pcfContext: ComponentFramework.Context<IInputs>,
    onChange: (newValue: Date) => void
}

export const datetimePickerComponent: React.FunctionComponent<Iprops> = (props) => {
    let _pcfContext = props.pcfContext;
    let _parameters = _pcfContext.parameters;
    let _value: Date | null | string = _parameters.datetimeValue.raw;
    let _label = "Input value: " + _value + ". Is not in the correct ISO datetime format: YYYY-MM-DDTHH:mm.";
    let _error = true;
    try {
        _value = (_parameters.datetimeValue.raw! as Date).toISOString().slice(0, 16);
        _error = false;
    }
    catch (error) {
        console.error("Error on parsing the input value as ISO datetime value: YYYY-MM-DDTHH:mm");
        console.error(error);
    }
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                width: '100%'
            },
            textField: {
                minWidth: 250,
                width: '100%'
            },
        }),
    );
    const classes = useStyles();
    
    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        try {
            let _newValue: Date = new Date(event.target.value!)
            props.onChange(_newValue);
        } catch (error) {
            console.error("Error on parsing the input value Date value");
            console.error(error);
        }
    }


    return (
        <div>
            {_error == true ?
                <span
                    style={{ color: 'red' }}
                >
                    {_label}
                </span> :
                null
            }
            <form className={classes.container} noValidate>
                <TextField
                    id="datetime-local"
                    type="datetime-local"
                    value={_value}
                    error={_error}
                    onChange={(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        _onChange(ev);
                    }}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
            </form>
        </div>


    );
};






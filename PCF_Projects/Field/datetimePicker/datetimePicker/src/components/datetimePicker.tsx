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
    let _value: Date | null | string = "";
    let _label = _pcfContext.resources.getString("datetimePicker_label_error_datetimeFormat");
    let _error: undefined | boolean;

    try {
        let _datetimeValue = _pcfContext.parameters.datetimeValue.raw!;
        _value = _datetimeValue.toISOString().slice(0, 23);
        _error = false;
    }
    catch (error) {
        _error = true
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
                width: '100%',
                height: 400
            },
        }),
    );
    const classes = useStyles();

    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        try {
            let _newValue: Date = new Date((event.target as any).valueAsNumber);
            props.onChange(_newValue);
        } catch (error) {
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






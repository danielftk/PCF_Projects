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
    let _parameters = _pcfContext.parameters
    let _label = _parameters.controlLabel.raw!;
    let _value = (_parameters.datetimeValue.raw! as Date).toISOString().slice(0, 16);
    let _width = _pcfContext.mode.allocatedWidth;

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
                width: _width,
            },
            textField: {
                minWidth: 250,
                width: _width,
            },
        }),
    );

    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        props.onChange((event.target.value! as any ))
    }

    const classes = useStyles();
    return (
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue={_value}
                label={_label}
                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                    _onChange(ev);
                }}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true
                }}
            />
        </form>
    );
};






import * as React from 'react';
import { IInputs } from "../generated/ManifestTypes";
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import { useConstCallback } from '@uifabric/react-hooks';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { ColorPicker, IColor, Stack, IStackItemStyles, DefaultPalette } from 'office-ui-fabric-react/lib';

export interface Iprops {
    pcfContext: ComponentFramework.Context<IInputs>,
    color: string,
    updateColor: (_color: string) => void
}

export const SelectColorButton: React.FC<Iprops> = (props) => {

    const [color, setcolor] = React.useState(props.color);
    const [isEditable, setisEditable] = React.useState(props.pcfContext.parameters.codigoColor.security?.editable);
    const [isOpen, setIsOpen] = React.useState(false);

    const openPanel = useConstCallback(() => setIsOpen(true));
    const dismissPanel = useConstCallback(() => setIsOpen(false));
    const _updateColor = useConstCallback((ev: any, colorObj: IColor) => setcolor(colorObj.str));
    const onRenderFooterContent = React.useCallback(() => (
        <div>
            <PrimaryButton
                onClick={() => {
                    props.updateColor(color);
                    dismissPanel();
                }}
                styles={buttonStyles}>
                Seleccionar Color
                    </PrimaryButton>
            <DefaultButton
                onClick={() => {
                    setcolor(props.color);
                    dismissPanel();
                }}>
                Cancelar
                    </DefaultButton>
        </div>
        ), [color]);

    const buttonStyles = { root: { marginRight: 8 } };
    const classNames = mergeStyleSets({
        wrapper: {
            display: 'flex'
        },
        preview: {
            "margin": "auto",
            "width": "150px",
            "background-color": color,
            "height": "150px"
        },
        previewsmall: {
            "margin": "auto",
            "width": "2.1em",
            "height": "2.1em",
            "background-color": color
        }
    });
    const stackItemStyles: IStackItemStyles = {
        root: {
            color: DefaultPalette.white,
            padding: 5,
        },
    };


    return (
        <div>
            <Stack horizontal disableShrink horizontalAlign="center">
                <Stack.Item align="center" >
                    <span>{color.toUpperCase()}</span>
                </Stack.Item>
                <Stack.Item align="center" styles={stackItemStyles}>
                    <div className={classNames.previewsmall} />
                </Stack.Item>
                <Stack.Item align="center" styles={stackItemStyles}>
                    <PrimaryButton
                        text="Seleccionar Color"
                        onClick={openPanel}
                        allowDisabledFocus
                        disabled={!isEditable} />
                </Stack.Item>
            </Stack>
            <div>
                <Panel
                    isOpen={isOpen}
                    onDismiss={dismissPanel}
                    headerText="Seleccionar Color"
                    closeButtonAriaLabel="Cerrar"
                    onRenderFooterContent={onRenderFooterContent}
                    isFooterAtBottom={true}
                    type={1}
                >
                    <div className={classNames.wrapper}>
                        <ColorPicker
                            color={color}
                            alphaType="none"
                            onChange={_updateColor}
                        />
                    </div>
                    <div className={classNames.preview}/>
                </Panel>
            </div>
        </div>
    );
};
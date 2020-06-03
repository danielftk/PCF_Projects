import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { SelectColorButton, Iprops } from "./controls/SelectColorButton"
import { getColorFromString, IColor } from 'office-ui-fabric-react/lib';

export class colorPicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _color: 				string;
	private _notifyOutputChanged: 	() => void;
	private _context: 				ComponentFramework.Context<IInputs>;
	private _container: 			HTMLDivElement;	
	private _props: 				Iprops;

	private _updateColor(_color: string) {
		this._color = _color.toUpperCase();
		this._notifyOutputChanged();
	}
	
	constructor() {

	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._context = context;
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this._color = "#FFFFFF";
	}
	
	public updateView(context: ComponentFramework.Context<IInputs>): void {
		this._context = context;
		if (context.parameters.codigoColor.raw! != "val" || "") {
			if (getColorFromString(context.parameters.codigoColor.raw!)) {
				this._color = context.parameters.codigoColor.raw!;
			}
		}
		this._props = {
			color: this._color,
			pcfContext:this._context,
			updateColor: this._updateColor.bind(this)
		}
		ReactDOM.render(
			React.createElement(SelectColorButton, this._props),
			this._container,
		)
	}

	public getOutputs(): IOutputs {
		return {
			codigoColor: this._color
		}
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container)
	}

}
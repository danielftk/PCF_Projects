import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { BoundedDatePicker, Iprops } from "./controls/boundedDatePicker";

export class boundedDatePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _date: Date | undefined;
	private _notifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _props: Iprops;
	private _updateDate(_newDate: Date | undefined) {
		this._date = _newDate;
		this._notifyOutputChanged();
	}

	constructor() {
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		console.log("Init");
		this._container = container;
		this._notifyOutputChanged = notifyOutputChanged;
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		console.log("UpdateView");
		this._props = {
			pcfContext: context,
			updateDate: this._updateDate.bind(this),
			date: context.parameters.date.raw || undefined
		}
		ReactDOM.render(
			React.createElement(BoundedDatePicker, this._props),
			this._container,
		)
	}

	public getOutputs(): IOutputs {
		return {
			date: this._date
		};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container)
	}
}
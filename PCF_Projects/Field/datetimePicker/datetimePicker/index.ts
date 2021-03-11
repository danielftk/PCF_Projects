import React = require("react");
import ReactDOM = require("react-dom");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { datetimePickerComponent, Iprops } from './src/components/datetimePicker';

export class datetimePicker implements ComponentFramework.StandardControl<IInputs, IOutputs> {
	private _container: HTMLDivElement;
	private _datetimeValue: Date;
	private _context: ComponentFramework.Context<IInputs>;
	private _notifyOutputChanged: () => void;

	constructor() {
	}

	private updateValue(v: Date) {
		this._datetimeValue = v;
		this._notifyOutputChanged();
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
		this._container = container;
		this._context = context
		this._notifyOutputChanged = notifyOutputChanged;
	}

	public updateView(context: ComponentFramework.Context<IInputs>): void {
		let _props: Iprops = {
			pcfContext: this._context,
			onChange: this.updateValue.bind(this)
		}

		ReactDOM.render(
			React.createElement(datetimePickerComponent, _props),
			this._container
		)
	}
	public getOutputs(): IOutputs {
		return {
			datetimeValue: this._datetimeValue
		};
	}

	public destroy(): void {
		ReactDOM.unmountComponentAtNode(this._container);
	}
}
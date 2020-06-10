import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack, IconButton, IIconProps } from 'office-ui-fabric-react/lib';
import { IInputs } from "../generated/ManifestTypes";
initializeIcons();

const controlClass = mergeStyleSets({
  datePicker: {
    margin: '5px',
    maxWidth: '600px',
  },
  iconButton: {
    margin: '5px 0px 5px 0px',
  },
});
const emojiIcon: IIconProps = { iconName: 'Delete' };
export interface Iprops {
  pcfContext: ComponentFramework.Context<IInputs>,
  date: Date | undefined,
  updateDate: (_selectedDate: Date | undefined) => void
}

export const BoundedDatePicker: React.FC<Iprops> = (props) => {
  const _pcfContext = props.pcfContext;
  const _resources = props.pcfContext.resources;
  const _pcfParameters = props.pcfContext.parameters;

  let _minDate: Date | undefined = undefined;
  debugger;
  if (_pcfParameters.restrictMinimunDate.raw) {
    if (_pcfParameters.minDate.type == "SingleLine.Text") {
      if (_pcfParameters.minDate.raw == "TODAY") {
        _minDate = new Date(Date.now());
      }
      else {
        console.log("BoundedDatePicker PCF -- MinimunDate input parameter has no supported value");
      }
    }
    else {
      _minDate = _pcfParameters.minDate.raw!
    }
  }
  let _maxDate: Date | undefined;
  if (_pcfParameters.restrictMaximunDate.raw) {
    if (_pcfParameters.maxDate.type == "SingleLine.Text") {
      if (_pcfParameters.maxDate.raw == "TODAY") {
        _maxDate = new Date(Date.now());
      }
      else {
        console.log("BoundedDatePicker PCF -- MinimunDate input parameter has no supported value");
      }
    }
    else {
      _maxDate = _pcfParameters.maxDate.raw!
    }
  }

  const _months: string[] = [];
  const _shortMonths: string[] = [];
  const _days: string[] = [];
  const _shortdays: string[] = [];

  const firstDayOfWeek = DayOfWeek.Monday;
  for (let index = 1; index <= 12; index++) {
    _months[index - 1] = _resources.getString("boundedDatePicker_labels_month_" + index + "_name").trim();
    _shortMonths[index - 1] = _resources.getString("boundedDatePicker_labels_month_" + index + "_shortname").trim();
  }
  for (let index = 1; index <= 7; index++) {
    _days[index - 1] = _resources.getString("boundedDatePicker_labels_day_" + index + "_name").trim();
    _shortdays[index - 1] = _resources.getString("boundedDatePicker_labels_day_" + index + "_shortname").trim();
  }

  const DayPickerStrings: IDatePickerStrings = {
    months: _months,
    shortMonths: _shortMonths,
    days: _days,
    shortDays: _shortdays,
    goToToday: _resources.getString("boundedDatePicker_labels_goToToday").trim(),
    prevMonthAriaLabel: _resources.getString("boundedDatePicker_labels_prevMonthAriaLabel").trim(),
    nextMonthAriaLabel: _resources.getString("boundedDatePicker_labels_nextMonthAriaLabel").trim(),
    prevYearAriaLabel: _resources.getString("boundedDatePicker_labels_prevYearAriaLabel").trim(),
    nextYearAriaLabel: _resources.getString("boundedDatePicker_labels_nextYearAriaLabel").trim(),
    closeButtonAriaLabel: _resources.getString("boundedDatePicker_labels_closeButtonAriaLabel").trim(),
    isRequiredErrorMessage: _resources.getString("boundedDatePicker_labels_isRequiredErrorMessage").trim(),
    invalidInputErrorMessage: _resources.getString("boundedDatePicker_labels_invalidInputErrorMessage").trim(),
    isOutOfBoundsErrorMessage: _resources.getString("boundedDatePicker_labels_isOutOfBoundsErrorMessage").trim() + ` ${_minDate == undefined ? _resources.getString("boundedDatePicker_labels_noLimitDate").trim() : _minDate!?.toLocaleDateString()} - ${_maxDate == undefined ? _resources.getString("boundedDatePicker_labels_noLimitDate").trim() : _maxDate!?.toLocaleDateString()}`,
  };

  const [showWeekNumbers, setshowWeekNumbers] = React.useState(_pcfParameters.showWeekNumbers.raw);
  React.useEffect(() => {
    setshowWeekNumbers(_pcfParameters.showWeekNumbers.raw);
  }, [_pcfParameters.showWeekNumbers])

  const [isReadOnly, setisReadOnly] = React.useState(_pcfContext.mode.isControlDisabled);
  React.useEffect(() => {
    setisDisabled(_pcfContext.mode.isControlDisabled);
  }, [_pcfContext.mode.isControlDisabled])

  const [date, setDate] = React.useState(props.date);
  React.useEffect(() => {
    setDate(_pcfParameters.date.raw!);
  }, [_pcfParameters.date])

  const [isDisabled, setisDisabled] = React.useState(_pcfParameters.showWeekNumbers.raw!);
  React.useEffect(() => {
    setisDisabled(_pcfParameters.showWeekNumbers.raw!);
  }, [_pcfParameters.showWeekNumbers])

  return (
    <Stack horizontal horizontalAlign="center">
      <Stack.Item>
        <DatePicker
          initialPickerDate={date}
          value={date}
          className={controlClass.datePicker}
          isRequired={false}
          firstDayOfWeek={firstDayOfWeek}
          strings={DayPickerStrings}
          placeholder={_resources.getString("boundedDatePicker_labels_placeholder").trim()}
          ariaLabel={_resources.getString("boundedDatePicker_labels_ariaplaceholder").trim()}
          minDate={_minDate}
          maxDate={_maxDate}
          allowTextInput={false}
          disabled={isReadOnly}
          showWeekNumbers={showWeekNumbers}
          onSelectDate={(date) => { setDate(date!); }}
        />
      </Stack.Item>
      <Stack.Item>
        <IconButton
          iconProps={emojiIcon}
          className={controlClass.iconButton}
          title={_resources.getString("boundedDatePicker_labels_clearDate").trim()}
          ariaLabel={_resources.getString("boundedDatePicker_labels_clearDate").trim()}
          disabled={date?.toString() == undefined ? true : false}
          onClick={() => { props.updateDate(undefined); }}
          checked={false} />
      </Stack.Item>
    </Stack>
  )
}
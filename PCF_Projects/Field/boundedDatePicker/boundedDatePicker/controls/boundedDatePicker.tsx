import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { addDays } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib';
import { IInputs } from "../generated/ManifestTypes";
initializeIcons();

const controlClass = mergeStyleSets({
  control: {
    margin: '5px',
    maxWidth: '600px',
    'width':'600px'
  },
});
export interface Iprops {
  pcfContext: ComponentFramework.Context<IInputs>,
  date: Date,
  updateDate?: (_selectedDate: Date) => void
  inputDateChanged?: (newValue: Date) => void;
}

export const BoundedDatePicker: React.FC<Iprops> = (props) => {
  const _resources  = props.pcfContext.resources;
  const _pcfContext = props.pcfContext;
  const _minutes = _pcfContext.userSettings.getTimeZoneOffsetMinutes(new Date(Date.now())) * -1;

  const _minDate: Date | undefined = (_pcfContext.parameters.restrictMinimunDate.raw as boolean) ? (_pcfContext.parameters.minDate.raw!) : undefined;
  const _maxDate: Date | undefined = (_pcfContext.parameters.restrictMaximunDate.raw as boolean) ? (_pcfContext.parameters.maxDate.raw!) : undefined;

  
  const _months:      string[] = [];
  const _shortMonths: string[] = [];
  const _days:        string[] = [];
  const _shortdays:   string[] = [];

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
    isOutOfBoundsErrorMessage: _resources.getString("boundedDatePicker_labels_isOutOfBoundsErrorMessage").trim() + ` ${_minDate!?.toLocaleDateString()} - ${_maxDate!?.toLocaleDateString()}`,
  };


  const [showWeekNumbers, setshowWeekNumbers] = React.useState(_pcfContext.parameters.showWeekNumbers.raw);
  React.useEffect(() => {
    setshowWeekNumbers(_pcfContext.parameters.showWeekNumbers.raw);
  }, [_pcfContext.parameters.showWeekNumbers])

  const [isReadOnly, setisReadOnly] = React.useState(_pcfContext.mode.isControlDisabled);
  React.useEffect(() => {
    setisDisabled(_pcfContext.mode.isControlDisabled);
  }, [_pcfContext.mode.isControlDisabled])


  const [date, setDate] = React.useState(props.date);
  React.useEffect(() => {
    setDate(_pcfContext.parameters.date.raw!);
  }, [_pcfContext.parameters.date.raw])

  const [isDisabled, setisDisabled] = React.useState(_pcfContext.parameters.showWeekNumbers.raw!);
  React.useEffect(() => {
    setisDisabled(_pcfContext.parameters.showWeekNumbers.raw!);
  }, [_pcfContext.parameters.showWeekNumbers.raw])
  return (
    <Stack horizontal horizontalAlign="center">
      <Stack.Item align="center" >
        <DatePicker
          initialPickerDate={date}
          value={date}
          className={controlClass.control}
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
        />
      </Stack.Item>
    </Stack>
  )
}
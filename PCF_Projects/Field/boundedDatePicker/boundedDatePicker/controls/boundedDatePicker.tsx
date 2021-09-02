import * as React from 'react';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack, IconButton, IIconProps } from 'office-ui-fabric-react/lib';
import { addDays } from 'office-ui-fabric-react/lib/utilities/dateMath/DateMath';
import { IInputs } from "../generated/ManifestTypes";
initializeIcons();

const controlClass = mergeStyleSets({
  datePicker: {
    margin: '5px',
    maxWidth: '600px',
    "width": "100%"
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
  const _pcfParameters = props.pcfContext.parameters;
  const _dateStrings = props.pcfContext.userSettings.dateFormattingInfo;
  const firstDayOfWeek = DayOfWeek.Monday;

  const [date, setDate] = React.useState(props.date);
  React.useEffect(() => {
    setDate(_pcfParameters.date.raw!);
  }, [_pcfParameters.date])

  const [showWeekNumbers, setshowWeekNumbers] = React.useState(_pcfParameters.showWeekNumbers.raw! == "true" ? true : false);
  React.useEffect(() => {
    setshowWeekNumbers(_pcfParameters.showWeekNumbers.raw! == "true" ? true : false);
  }, [_pcfParameters.showWeekNumbers])

  const [restrictMinimunDate, setrestrictMinimunDate] = React.useState(_pcfParameters.restrictMinimunDate.raw! == "true" ? true : false);
  React.useEffect(() => {
    setrestrictMinimunDate(_pcfParameters.restrictMinimunDate.raw! == "true" ? true : false);
  }, [_pcfParameters.restrictMinimunDate])

  const [restrictMaximunDate, setrestrictMaximunDate] = React.useState(_pcfParameters.restrictMaximunDate.raw! == "true" ? true : false);
  React.useEffect(() => {
    setrestrictMaximunDate(_pcfParameters.restrictMaximunDate.raw! == "true" ? true : false);
  }, [_pcfParameters.restrictMaximunDate])

  const [isDisabled, setisDisabled] = React.useState(_pcfContext.mode.isControlDisabled);
  React.useEffect(() => {
    setisDisabled(_pcfContext.mode.isControlDisabled);
  }, [_pcfContext.mode.isControlDisabled])

  let _minDate: Date | undefined = undefined;
  if (restrictMinimunDate) {
    if (_pcfParameters.minDate.type == "Whole.None") {
      _minDate = addDays(new Date(Date.now()), _pcfParameters.minDate.raw!);
    }
    else {
      _minDate = _pcfParameters.minDate.raw!
    }
  }
  let _maxDate: Date | undefined = undefined;
  if (restrictMaximunDate) {
    if (_pcfParameters.maxDate.type == "Whole.None") {
      _maxDate = addDays(new Date(Date.now()), _pcfParameters.maxDate.raw!);
    }
    else {
      _maxDate = _pcfParameters.maxDate.raw!
    }
  }

  const DayPickerStrings: IDatePickerStrings = {
    months: _dateStrings.monthGenitiveNames,
    shortMonths: _dateStrings.abbreviatedMonthGenitiveNames,
    days: _dateStrings.dayNames,
    shortDays: _dateStrings.shortestDayNames,
    goToToday: "Go to today",//_resources.getString("boundedDatePicker_labels_goToToday").trim(),
    prevMonthAriaLabel: "Go to previous month",// _resources.getString("boundedDatePicker_labels_prevMonthAriaLabel").trim(),
    nextMonthAriaLabel: "Go to next month",//_resources.getString("boundedDatePicker_labels_nextMonthAriaLabel").trim(),
    prevYearAriaLabel: "Go to previous year",//_resources.getString("boundedDatePicker_labels_prevYearAriaLabel").trim(),
    nextYearAriaLabel: "Go to next year",//_resources.getString("boundedDatePicker_labels_nextYearAriaLabel").trim(),
    closeButtonAriaLabel: "Close date picker",// _resources.getString("boundedDatePicker_labels_closeButtonAriaLabel").trim(),
    isRequiredErrorMessage: "Field is required.",//_resources.getString("boundedDatePicker_labels_isRequiredErrorMessage").trim(),
    invalidInputErrorMessage: "Invalid date format.",//_resources.getString("boundedDatePicker_labels_invalidInputErrorMessage").trim(),
    isOutOfBoundsErrorMessage: `Select a valid date between  ${_minDate == undefined ? "No limit" : _minDate!?.toLocaleDateString()} - ${_maxDate == undefined ? "No limit" : _maxDate!?.toLocaleDateString()}`,
  };

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
          placeholder={"Select a date..."/*_resources.getString("boundedDatePicker_labels_placeholder").trim()*/}
          ariaLabel={"Select a date"/*_resources.getString("boundedDatePicker_labels_ariaplaceholder").trim()*/}
          minDate={_minDate}
          maxDate={_maxDate}
          allowTextInput={false}
          disabled={isDisabled}
          showWeekNumbers={showWeekNumbers}
          onSelectDate={(_date) => { props.updateDate(_date!); }}
          formatDate={date =>
            `${date?.toLocaleDateString(
              navigator.languages && navigator.languages[0]
            )}`
          }
        />
      </Stack.Item>
      <Stack.Item>
        <IconButton
          iconProps={emojiIcon}
          className={controlClass.iconButton}
          title={"Clear date"/*_resources.getString("boundedDatePicker_labels_clearDate").trim()*/}
          ariaLabel={"Clear date"/*_resources.getString("boundedDatePicker_labels_clearDate").trim()*/}
          disabled={date?.toString() == undefined ? true : false}
          onClick={() => { props.updateDate(undefined); }}
          checked={false} />
      </Stack.Item>
    </Stack>
  )
}
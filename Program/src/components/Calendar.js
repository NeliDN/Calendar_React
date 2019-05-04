import * as React from 'react';

import CalendarHeader from './CalendarHeader';
import CalendarSchedule from './CalendarSchedule';
import CalendarEvents from './CalendarEvents';

import './Calendar.css';

export const EActiveMode = {
  MONTH_VIEW: 0,
  WEEK_VIEW: 1
};

class Calendar extends React.PureComponent {

  state = {
    activeMode: EActiveMode.MONTH_VIEW
  };

  onActiveModeChange = (mode) => {
    this.setState({ activeMode: mode });
  };

  onMoveNext = () => {

    const { onDateChange, date } = this.props;
    const { activeMode } = this.state;

    if (activeMode === EActiveMode.MONTH_VIEW) {
      onDateChange(date.clone().add(1, 'month'));
    }
  };

  onMoveBack = () => {

    const { onDateChange, date } = this.props;
    const { activeMode } = this.state;

    if (activeMode === EActiveMode.MONTH_VIEW) {
      onDateChange(date.clone().subtract(1, 'month'));
    }
  };

  render() {
    const { events, date, onDateChange } = this.props;
    const { activeMode } = this.state;

    return (
      <div className={'calendar'}>

        <CalendarHeader
          date={date.clone()}
          mode={activeMode}
          onNext={this.onMoveNext}
          onPrevious={this.onMoveBack}
          onActiveModeChange={this.onActiveModeChange}
          onSelectDay={onDateChange}
        />
        <CalendarSchedule
          date={date.clone()}
          mode={activeMode}
          events={events}
          onSelectDay={onDateChange}
          onActiveModeChange={this.onActiveModeChange}
          />
          { (activeMode === 1) && <CalendarEvents
            date={date.clone()}
            events={events}
            />}
      </div>
    )
  }

}

export default Calendar;

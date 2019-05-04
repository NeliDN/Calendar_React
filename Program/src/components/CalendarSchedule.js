import * as React from 'react';
import moment from 'moment';

import { EActiveMode } from './Calendar';

import './CalendarSchedule.css';

class CalendarSchedule extends React.PureComponent {

  static TODAY = moment();

  onActiveModeChange = (mode) => {

    const { onActiveModeChange } = this.props;

    this.setState({ isChangingMode: false });

    onActiveModeChange(mode);
  };

  render() {

    const { mode } = this.props;
    return (
      <div className={'calendar-schedule'}>

        <div className={'calendar-schedule-days'}>
          { mode === EActiveMode.WEEK_VIEW ? this.renderWeekDays() : this.renderMonthDays() }
        </div>
      </div>
    )
  }

  renderWeekDays() {

    const { events, date, onSelectDay } = this.props;

    const days = [];
    const weekday = date.clone().startOf('week');

    for (let it = 0; it < weekday.format('d'); it ++) {
      days.push(<div key={`empty-${it}`} className={'calendar-schedule-day'}/>);
    }

    for (let it = 0; it < 7; it ++) {

      const currentDay = weekday.clone();
      const dayEvents = events.find((it) => moment(it.date, 'MM/DD/YYYY', true).isSame(currentDay));

      days.push(
        <div
          key={currentDay.dayOfYear()}
          className={(currentDay.weekday() === 0 || currentDay.weekday() === 6) ? 'calendar-schedule-weekend' : 'calendar-schedule-day'}
        >

          { CalendarSchedule.TODAY.isSame(currentDay, 'day') ? <div className={'point'}>.</div> : null }

          <span
            className={dayEvents ? 'calendar-schedule-with-events' : undefined}
            onClick={() => {onSelectDay(currentDay)}}
          >
            { currentDay.format('D') }
          </span>

        </div>
      );

      weekday.add(1, 'day');
    }

    return days;
  }

  renderMonthDays() {

    const { events, date, onSelectDay } = this.props;
    const days = [];
    const monthday = date.clone().startOf('month');
    const daysCount = date.daysInMonth();

    for (let it = 0; it < monthday.format('d'); it ++) {
      days.push(<div key={`empty-${it}`} className={'calendar-schedule-day'}/>);
    }

    for (let it = 0; it < daysCount; it ++) {

      const currentDay = monthday.clone();
      const dayEvents = events.find((it) => moment(it.date, 'MM/DD/YYYY', true).isSame(currentDay));
      days.push(
        <div
          key={currentDay.dayOfYear()}
          className={(currentDay.weekday() === 0 || currentDay.weekday() === 6) ? 'calendar-schedule-weekend' : 'calendar-schedule-day'}
        >

          { CalendarSchedule.TODAY.isSame(currentDay, 'day') ? <div className={'point'}>.</div> : null }

          <span
            className={dayEvents ? 'calendar-schedule-with-events' : undefined}
            onClick={() => {onSelectDay(currentDay)
                            this.onActiveModeChange(EActiveMode.WEEK_VIEW)}}
          >
            { currentDay.format('D') }
          </span>

        </div>
      );

      monthday.add(1, 'day');
    }


    return days;
  }

}

export default CalendarSchedule;

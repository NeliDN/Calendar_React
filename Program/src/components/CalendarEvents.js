import * as React from 'react';
import moment from 'moment';

import './CalendarEvents.css';

class CalendarEvents extends React.Component {

  render() {

    const { date } = this.props;
    return (
      <div className={'calendar-events'}>

        <div className={'calendar-events-heading'}>
          { date.format('dddd, D MMMM') }
        </div>

        <div>
          { this.renderTasks() }
        </div>

      </div>
    )
  }

  renderTasks() {

    const { date, events } = this.props;

    const dayEvents = events.find((it) => moment(it.date, 'MM/DD/YYYY', true).isSame(date));

    if (!dayEvents) {
      return (
        <div className={'calendar-no-events'}>
        {"No events."}
        </div>
      );
    } else {
      return dayEvents.events.map((it, idx) => (
        <div key={idx + it.name} className={'calendar-events-event'}>

          <div className={'calendar-events-event-heading'}>
            <div> { it.name } </div>
            <div> { it.time } </div>
          </div>

          <div className={'calendar-events-event-body'}>
            { it.body }
          </div>

        </div>
      ));
    }
  }

}

export default CalendarEvents;

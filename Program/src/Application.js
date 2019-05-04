import * as React from 'react';
import moment from 'moment';

import Calendar from './components/Calendar';

class Application extends React.Component {

  state = {
    date: moment(),
    events: [
      {
        date: '05/03/2019',
        events: [
          { name: 'Driving test', time: '10:00', body: 'Some details' },
          { name: 'Interview Megan', time: '15:00', body: 'Some details' },
          { name: 'Send results', time: '18:30', body: 'Some details' }
        ]
      },
      {
        date: '05/06/2019',
        events: [
          { name: 'B-day party', time: '16:00', body: 'Some details' },
        ]
      },
      {
        date: '05/15/2019',
        events: [
          { name: 'Programming courses', time: '17:00', body: 'Some details' },
        ]
      },
      {
        date: '06/11/2019',
        events: [
          { name: 'HMI project', time: '01:00', body: 'Some details' },
        ]
      }
    ]
  };

  onDateChange = (date) => this.setState({ date });

  render() {

    const { date, events } = this.state;

    return (
      <Calendar date={date} events={events} onDateChange={this.onDateChange}/>
    );
  }

}

export default Application;

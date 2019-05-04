import * as React from 'react';
import moment from 'moment';

import { EActiveMode } from './Calendar';

import './CalendarHeader.css';

class CalendarHeader extends React.Component {

  state = {
    isChangingMode: false
  };

  onToggleViewChange = () => {
    this.setState({ isChangingMode: !this.state.isChangingMode });
  };

  onActiveModeChange = (mode) => {

    const { onActiveModeChange } = this.props;

    this.setState({ isChangingMode: false });

    onActiveModeChange(mode);
  };

  onNextClicked = () => {
    this.props.onNext();
  };

  onPreviousClicked = () => {
    this.props.onPrevious();
  };


  render() {

    const { mode } = this.props;
    const { isChangingMode } = this.state;

    return (
      <div className={'calendar-header'}>

        <div className={'calendar-header-controls'}>
          { mode === EActiveMode.MONTH_VIEW ? this.renderMonthControls() : this.renderWeekControls() }
        </div>

        { isChangingMode ? this.renderModeChange() : null }
        { this.renderWeekDays() }
      </div>
    )
  }

  renderWeekControls() {

    const { date } = this.props;
    const { isChangingMode } = this.state;

    return (
      <>
        <div></div>
        <div onClick={this.onToggleViewChange}>
          <div className={'calendar-header-month-arrow'}>
            <div className={'calendar-header-month'}>{ date.format('MMMM') } </div>
          < div className={'calendar-header-arrow'}>{ isChangingMode ? '▲' : '▼' }</div>
          </div>
        </div>
        <div></div>

      </>
    )
  }

  renderWeekDays(){
    return (
      <div className={'calendar-header-weekdays'}>
        {  moment.weekdaysShort().map((it) => {
            return (
              <div key={it} className={(it === 'Sun' || it === 'Sat') ? "calendar-header-weekend" : ""}> { it } </div>
            );
          }) }
      </div>
    );
  }

  renderMonthControls() {

    const { date } = this.props;
    const { isChangingMode } = this.state;
    return (
      <>

        <div onClick={this.onPreviousClicked}>
          { "Prev" }
        </div>

        <div onClick={this.onToggleViewChange}>
          <div className={'calendar-header-month-arrow'}>
            <div className={'calendar-header-month'}>{ date.format('MMMM') } </div>
            <div className={'calendar-header-arrow'}>{ isChangingMode ? '▲' : '▼' }</div>
          </div>
          <div className={'calendar-header-year'}>{ this.state.isChangingMode ? "" : date.format('YYYY') }</div>
        </div>

        <div onClick={this.onNextClicked}>
          { "Next" }
        </div>

      </>
    )
  }

  renderModeChange() {
    const { onSelectDay } = this.props;
    return (
      <div className={'calendar-header-switchers'}>

        <div onClick={() => {this.onActiveModeChange(EActiveMode.WEEK_VIEW)
                              onSelectDay(moment())}}>
          { "This Week" }
        </div>

        <div onClick={() => {this.onActiveModeChange(EActiveMode.MONTH_VIEW)
                              onSelectDay(moment())}}>
          { "This Month" }
        </div>

      </div>
    );
  }

}

export default CalendarHeader;

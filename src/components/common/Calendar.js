import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { ICONS } from '../../constants';

class Calendar extends Component {

    clickOutside = () => {
        this.calendar.cancelFocusInput();
        this.calendar.setOpen(false);
    }

    _onClickImage = () => {
        this.calendar.setOpen(true);
    }

    render() {
        const minYear = 2010;
        return(
            <div className="form-group">
                    <DatePicker
                      selected={ this.props.startDate }
                      name={ this.props.name }
                      onChange={ this.props.onDateChange }
                      onChangeRaw={ this.props.onDateChangeRaw }
                      dateFormat="MM/DD/YYYY"
                      onClickOutside={ this.clickOutside }
                      placeholderText={ this.props.placeholder ? this.props.placeholder : 'MM/DD/YYYY' }
                      ref={ r => this.calendar = r } // eslint-disable-line
                      className={ this.props.className }
                      disabled={ this.props.disabled }
                      shouldCloseOnSelect={ true }
                      maxDate={ this.props.maxDate }
                      minDate={ this.props.minDate }
                      showMonthDropdown
                      showYearDropdown
                      //dropdownMode="select"
                      value={ this.props.date }
                      onBlur={ this.props.onBlur }
                      minYear={ minYear }
                    />
                    <img src={ ICONS.CALENDAR } className="product-date" onClick={ this._onClickImage }  width="18" height="20" alt="" />
            </div>
        );
    }
}

Calendar.propTypes = {
    startDate: PropTypes.string,
    name: PropTypes.string,
    onDateChange: PropTypes.func,
    onDateChangeRaw: PropTypes.func,
    className: PropTypes.string
};

export default Calendar;
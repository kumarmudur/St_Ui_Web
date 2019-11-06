
import React, { Component } from 'react';
//import { PropTypes } from 'prop-types';
import { camelCaseToSentenceCase } from '../../utils/camelCaseToSentenceCase';
import { sentenceCaseToCamelCase } from '../../utils/sentenceCaseToCamelCase';
import { loadData } from '../../utils/storage';

class Filter extends Component {
  constructor(props) {
    super(props);
    let selectAllCheckStatus = false;
    let preSelectedFilter =  loadData(props.page);
    preSelectedFilter = preSelectedFilter ? preSelectedFilter.data : [];
    if(preSelectedFilter && props.allColumns && preSelectedFilter.length === props.allColumns.length) {
      selectAllCheckStatus = true;
    }
    this.state = {
      mode:1,
      allChecked: false,
      allColumns: props.allColumns, 
      _filterBoxToggle: props._filterBoxToggle,
      preSelectedFilter: preSelectedFilter || [],
      boxes:[],
      selectAllCheckStatus,
    };
    this._prepareCheckboxes();
  }
 
  _prepareCheckboxes = () => {
    let { boxes, allColumns, preSelectedFilter } = this.state;
    if(boxes && boxes.length<=0 ){
      
      allColumns && allColumns.map( (col, i) => {
      let checked = false;
      if(preSelectedFilter && preSelectedFilter.length>0 && preSelectedFilter.indexOf(col)!== -1) {
        checked = true;
      }
      boxes.push({ 
        col, 
        checked,
        position: i,
       });
    });
    }
    this.setState({
      boxes
    });
  }

  _checkboxChange = e => {
    let { boxes, selectAllCheckStatus } = this.state;
    const { id, checked } = e.target;
    const name = e.target.getAttribute('name');

    if(id === 'selectAll'){
      let { boxes } = this.state;
  
      boxes && boxes.map( (item, i) => { 
        boxes[i].checked = checked;
      });

    this.setState({
      mode:2,
      allChecked: checked,
      boxes,
      selectAllCheckStatus: !selectAllCheckStatus
    });  
    //console.log('boxes in _checkboxChange : ', boxes);
    } else {
      //single check / uncheck
      boxes[name].checked = checked;
      this.setState({
        mode:1,
        allChecked: false,
        boxes
      });
    }

    
  }
  _submitFilter = () => {
    let { boxes } = this.state;
    let filteredCols = boxes && boxes.map( item => {
      if(item && item!== undefined  &&  item !== null  &&  item.checked === true) { 
        return sentenceCaseToCamelCase(item.col); } 
    });

    filteredCols = filteredCols.filter(function( element ) {
      return element !== undefined;
   });

   this.props._filter( filteredCols );
   this.setState({
     mode:1,
     allChecked: false
   });
  }

    render() {
      const { boxes, mode, _filterBoxToggle, selectAllCheckStatus } = this.state;

      //console.log('boxes : ', boxes, mode, allChecked);

      const checkboxesTemplate = boxes && boxes.map( (item, i) => {
        
        let checkboxHTML='';
        if (mode === 1) {
          checkboxHTML=  <input
            id={ item.col }
            name= { i }
            type='checkbox'
            className='filter-checkboxes'
            checked = { item.checked }
            onChange={ this._checkboxChange }
                         />;
        } else if (mode === 2) {
          checkboxHTML =  <input
            id={ item.col }
            name= { i }
            type='checkbox'
            className='filter-checkboxes'
            checked = { item.checked }
            onChange={ this._checkboxChange }
                          />; 
        }

          return <div> 
            <label>
              { checkboxHTML }
              { camelCaseToSentenceCase(item.col) }
            </label>
            </div>;
       });

      return(
          <div className='filterUsersBox'>
              <span className='notch' />
              <div>
              <label>
                <input type='checkbox' name='ALL' id='selectAll' defaultChecked={ selectAllCheckStatus } onChange={ this._checkboxChange } /> <b>Select All</b> 
              </label>
              </div>
              { checkboxesTemplate }
              <div className="filter-btn-wrapper">
                <button className='cancel-button filterButton roundedCorner' name="Cancel" onClick={ _filterBoxToggle }> Cancel </button>
                <button className='apply-button filterButton roundedCorner' name="Apply" onClick={ this._submitFilter }> Apply </button>
              </div>
            </div>
      );
    }
}
export default Filter;

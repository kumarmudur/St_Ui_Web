import { extractDateTime } from '../../extractDateTime';
import { camelCaseToSentenceCase } from '../../camelCaseToSentenceCase';
import { save } from '../../storage';

const fallback = ['purchasePlanName', 'projectType', 'proposalType', 'status'];
export const managePurchasePlanTemplate = (data, selectedColumns = fallback) => {
    let head = [];
    let body = [];

    let allColumns = [];

    let allTypesOfColumns = [];
    //if(data && data.length>0) {
      allTypesOfColumns = Object.keys(data[0]);

      allTypesOfColumns && allTypesOfColumns.map( colName => {
          if (colName && typeof(data[0][colName]) && !Array.isArray(data[0][colName]) && typeof(data[0][colName]) !== 'object') {
              // data[0][colName] && typeof(data[0][colName]) && typeof(data[0][colName])!== null && typeof(data[0][colName])!== 'undefined' && 
              allColumns.push(colName);
          }
      });
      let columns = Array.isArray(allColumns) && allColumns.filter(value => -1 !== selectedColumns.indexOf(value));
      save('purchase-plans', selectedColumns);
        // allColumns = Object.keys(data[0]); 
        // let columns = allColumns.filter(value => -1 !== selectedColumns.indexOf(value));
        
        
        data.map( (cols, i)=> {
            let cells = [];
            let className = '';
        
            columns.map( (key) => {
                if( i===0 ) {
                    head.push({ 'value':  camelCaseToSentenceCase(key), 'class': 'grid-cell head-cell'});
                }
                if(i%2 === 0) { className = 'evenRow'; }
                else { className = 'oddRow'; }
                
                let value = cols[key];
                if( (key == 'updatedDateTime') || (key == 'createdDateTime')) {
                    value = extractDateTime(cols[key]); 
                }
                cells.push({ 'value': value, 'class': `grid-cell row ${className}` });
            });
            cells.push({ 'value': '', 'items':[
                { 'label': '', 'name': 'view', 'link': 'VIEW_PURCHASE_PLAN', id: `${cols['purchasePlanId']}` },
                { 'label': '', 'name': 'edit', 'link': 'EDIT_PURCHASE_PLAN', id: `${cols['purchasePlanId']}` },
                { 'label': '', 'name': 'delete', 'link': 'DELETE_PURCHASE_PLAN', id: `${cols['purchasePlanId']}` }
            ],
            'class': `view grid-cell grid-link row ${className}` });
            body.push(cells);   
        });
        
        if(body && body.length>0) {
            head.push({ 'value': 'Actions', 'class': 'grid-cell'});
        }
    return { head, body, allColumns };
};

import { extractDateTime } from './extractDateTime';
import { camelCaseToSentenceCase } from './camelCaseToSentenceCase';

const fallback = ['proposalId', 'address', 'projectType', 'createdDateTime', 'electricCompany', 'customerId', 'initiatedBy', 'userType', 'status'];
import { save } from './storage';


export const viewProposalsTemplate = (data, selectedColumns) => {
  if(!selectedColumns || (Array.isArray(selectedColumns) && selectedColumns.length<=0)) {
    selectedColumns = fallback;
  }
  
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
        save('view-proposals', selectedColumns);

        data.map( (cols, i)=> {
            let cells = [];
            let className = '';
        
            columns.map( (key) => {
                if( i===0 ) {
                    let keyLabel = key;
                    // if(keyLabel ==='userId') {
                    //     keyLabel = 'customerId';
                    // }
                    head.push({ 'value': camelCaseToSentenceCase(keyLabel), 'class': 'grid-cell head-cell'});
                }
                if(i%2 === 0) { className = 'evenRow'; }
                else { className = 'oddRow'; }
                
                let value = cols[key];
                if( (key == 'updatedDateTime') || (key == 'createdDateTime')) {
                    value = extractDateTime(cols[key]); 
                }
                cells.push({ 'value': value, 'class': `grid-cell row ${className}` });
            });

            // done by as per vikas comment
            //if(pageName === 'ViewUsers') {
                // cells.push({ 'value': '', 'items':[
                //     { 'label': '', 'name': 'view', 'link': 'PROPOSAL_DETAILS', id: `${cols['proposalId']}` },
                //    /*  { 'label': '', 'name': 'edit', 'link': 'EDIT_USER', id: `${cols['registerId']}` },
                //     { 'label': '', 'name': 'delete', 'link': 'DELETE_USER', id: `${cols['registerId']}` } */
                // ],
                //      'class': `view grid-cell grid-link row ${className}` });
            //}
            body.push(cells);   
        });

        // done by as per vikas comment
        // if(body && body.length>0) {
        //     head.push({ 'value': 'Actions', 'class': 'grid-cell'});
        // }
        
   // }
    return { head, body, allColumns };
};

import { extractDateTime, gridPhoneFormat } from './extractDateTime';
import { camelCaseToSentenceCase } from './camelCaseToSentenceCase';
import { save } from './storage';

const fallback = ['firstName', 'lastName', 'email', 'phone', 'userType'];
export const viewUsersTemplate = (data, selectedColumns = fallback) => {
    let head = [];
    let body = [];
    let allColumns = [];
    //if(data && data.length>0) {
        /* allColumns = Object.keys(data[0]); 
        let columns = allColumns.filter(value => -1 !== selectedColumns.indexOf(value));
         */
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
      save('view-users', selectedColumns);

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

                if(key === 'phone') {
                    value = gridPhoneFormat(cols[key]);
                }

                if(key === 'alternativePhone') {
                    value = gridPhoneFormat(cols[key]);
                }
                
                if( (key == 'updatedDateTime') || (key == 'createdDateTime')) {
                    value = extractDateTime(cols[key]); 
                }
                cells.push({ 'value': value, 'class': `grid-cell row ${className}` });
            });
            //if(pageName === 'ViewUsers') {
                cells.push({ 'value': '', 'items':[
                    { 'label': '', 'name': 'view', 'link': 'USER_DETAILS', id: `${cols['registerId']}` },
                    { 'label': '', 'name': 'edit', 'link': 'EDIT_USER', id: `${cols['registerId']}` },
                    { 'label': '', 'name': 'delete', 'link': 'DELETE_USER', id: `${cols['registerId']}` }
                ],
                     'class': `view grid-cell grid-link row ${className}` });
            //}
            body.push(cells);   
        });
        
        if(body && body.length>0) {
            head.push({ 'value': 'Actions', 'class': 'grid-cell'});
        }
        
   // }
    return { head, body, allColumns };
};

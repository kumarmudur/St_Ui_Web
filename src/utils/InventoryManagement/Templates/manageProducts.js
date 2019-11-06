import { extractDateTime } from '../../extractDateTime';
import { camelCaseToSentenceCase } from '../../camelCaseToSentenceCase';
import { save } from '../../storage';

const fallback = ['productName', 'modelNumber', 'manufacturer', 'category', 'status'];
export const manageProductsTemplate = (data, selectedColumns = fallback) => {
    let head = [];
    let body = [];

    let dataColumns = data && data.filter(item => {
        return item.category !== 'Assembly';
    }); 
    let allColumns = [];


    let allTypesOfColumns = [];
      allTypesOfColumns = Object.keys(dataColumns.length > 0 ? dataColumns && dataColumns[0] : data && data[0]);

      allTypesOfColumns && allTypesOfColumns.map( colName => {
          if (colName && typeof(data[0][colName]) && !Array.isArray(data[0][colName]) && typeof(data[0][colName]) !== 'object') {
              allColumns.push(colName);
          }
      });
      let columns = Array.isArray(allColumns) && allColumns.filter(value => -1 !== selectedColumns.indexOf(value));
      save('manage-products', selectedColumns);
    
        // allColumns = Object.keys(dataColumns.length > 0 ? dataColumns && dataColumns[0] : data && data[0]); 
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
                { 'label': '', 'name': 'view', 'link': 'VIEW_PRODUCT', id: `${cols['productId']}` },
                { 'label': '', 'name': 'edit', 'link': 'EDIT_PRODUCT', id: `${cols['productId']}` },
                { 'label': '', 'name': 'delete', 'link': 'DELETE_PRODUCT', id: `${cols['productId']}` }
            ],
            'class': `view grid-cell grid-link row ${className}` });
            body.push(cells);   
        });
        
        if(body && body.length>0) {
            head.push({ 'value': 'Actions', 'class': 'grid-cell'});
        }
    return { head, body, allColumns };
};
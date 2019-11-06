//import { extractDateTime } from './extractDateTime';
import { camelCaseToSentenceCase } from './camelCaseToSentenceCase';

const fallback = [ 'officeName', 'departments', 'subDepartments']; //departments'];  
//'city', 'country', 
//import { extractDateTime } from './extractDateTime';
//let subdeps = [];

const getDepartments = items => {
   const result = items.map( item => {
    //item.subDepartments
    //subdeps = item.subDepartments && item.subDepartments.lenght > 0 ? item.subDepartments : [];
    return { 
        'label': item.departmentName, 
        'name': 'view', 
        'id': item.departmentName,
        'subDept': item.subDepartments,
    };
    });
    return result;
};

const getSubDepartments = items => {
    let result = items.map( item => {
        return item.subDept.map( subItem => {
            return {
                'label': subItem.subDepartmentName, 
                'name': 'view', 
                'id': subItem.subDepartmentName 
            };
        });
    });
    result = result.flat();

    return { result, subDepartCount: result ? result.length: 0 };
};

export const viewOrganizationTemplate = (data, selectedColumns = fallback) => {
    let head = [];
    let body = [];
    let allColumns = [];
    head.push({ 'value': '', 'style': { 'width': '10px' }, 'class': 'grid-cell',
    'items':[
        //{ 'label': '', 'name': 'view', 'link': 'USER_DETAILS', id: `${cols['officeId']}` },
        { 'label': '', 'name': 'checkbox', id: 'selectAll' },
      ]
    });


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


    //if(data && data.length>0) {
        // allColumns = Object.keys(data[0]); 
        // let columns = selectedColumns; //allColumns.filter(value => -1 !== selectedColumns.indexOf(value));
       
        data.map( (cols, i)=> {
            let cells = [];
            let className = '';
            
            let rowspan = 1;
            try {
                let newRowspan = getDepartments(cols['departments']);
                newRowspan = getSubDepartments(newRowspan);
                rowspan = newRowspan.subDepartCount || 1;
            } catch(err) {
                rowspan = cols['departments'].length || 1;
            
            }
            
            //Insert checkbox col from here
            cells.push({ 
                'value': '', 
                'rowspan': rowspan,
                'items':[
                    //{ 'label': '', 'name': 'view', 'link': 'USER_DETAILS', id: `${cols['officeId']}` },
                    { 'label': '', 'name': 'checkbox', id: `chk_${cols['officeId']}` },
                ],
                'class': `view grid-cell grid-link row ${className}` 
            });
            
            columns.map( (key) => {
                if( i===0 ) {
                    head.push({ 'value':  camelCaseToSentenceCase(key), 'class': 'grid-cell head-cell'});
                }
                if(i%2 === 0) { className = 'evenRow'; }
                else { className = 'oddRow'; }
                
                let value = cols[key];
               // cells.push({ 'value': value + ' : ' + rowspan, 'class': `grid-cell row ${className}`, 'rowspan': rowspan });

                if( key == 'departments') {
                    //let subDepartments=[];
                    value = getDepartments(cols['departments']);
                     cells.push({ 
                        'value': '',
                        'rowspan': rowspan,
                        'items': value,
                        'class': `subcell grid-cell row ${className}`
                     });
                    
                } else if( key == 'subDepartments') {
                    //let subDepartments=[];
                    value = getDepartments(cols['departments']); 

                     let subDepartments = getSubDepartments(value);
                     cells.push({ 
                        'value': '',
                        'rowspan': subDepartments.subDepartCount,
                        'items': subDepartments.result,
                        'class': `subcell grid-cell row ${className}`
                     });
                    
                } 
                else {
                    cells.push({ 'value': value, 'class': `grid-cell row ${className}`, 'rowspan': rowspan });
                } 
            });
            
                            
                cells.push({ 
                    'value': '', 
                    'rowspan': rowspan,
                    'items':[
                        { 'label': '', 'name': 'edit', 'link': 'EDIT_OFFICE', id: `${cols['officeId']}` },
                        { 'label': `${cols['departmentName']}`, 'name': 'delete', 'link': 'DELETE_OFFICE', id: `${cols['officeId']}` }
                    ],
                    'class': `view grid-cell grid-link row ${className}` 
                });

            body.push(cells);   
        });
        
        if(body && body.length>0) {
            head.push({ 'value': 'Actions', 'class': 'grid-cell'});
        }

    return { head, body, allColumns };
};

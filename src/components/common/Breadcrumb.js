import React from 'react';

const Breadcrumb = props => {
    const { firstTitle, secondTitle, thirdTitle, changePage } = props;
    return (
        <div className="bread-crumb">
            <span>{ firstTitle} </span> <span className="icon"> > </span> 
            <span className="middle-item" onClick={ changePage }>{ secondTitle }</span> 
            <span className="icon"> > </span> 
            <span className="last-item">{ thirdTitle }</span> 
       </div>
    );
};

export default Breadcrumb;
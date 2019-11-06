import React, { Fragment } from 'react';

const ProductAssemblyPriceComponent = props => {
    const { totalAssemblyResidentialPrice, totalAssemblyCommercialPrice, totalAssemblyNonProfitPrice,
        totalAssemblyIndustrialPrice } = props;
    return (
        <Fragment>
            <p className="title">Assembly Price</p>
            <div className="product-grid">
                <div className="table-heading">
                    <div className="grid-row">
                        <div className="header price-header"></div>
                        <div className="header">Residential</div>
                        <div className="header">Commercial</div>
                        <div className="header">Non Profit</div>
                        <div className="header">Industrial</div>
                    </div>
                    <div className="grid-row total-price-row">
                        <div className="header">Total Assembly Price</div>
                        <div className="header">{ totalAssemblyResidentialPrice }</div>
                        <div className="header">{ totalAssemblyCommercialPrice }</div>
                        <div className="header">{ totalAssemblyNonProfitPrice }</div>
                        <div className="header">{ totalAssemblyIndustrialPrice }</div>
                    </div>
                </div>
               
            </div>
        </Fragment>
    );
};

export default ProductAssemblyPriceComponent;
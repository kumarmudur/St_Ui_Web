import React, { Component, Fragment } from 'react';
//import { TreeView } from '../../contracts/orgTreeData';
import OrgChart from 'react-orgchart';
import 'react-orgchart/index.css';
import TreeNode  from './TreeNode';
import { Input } from '../common';
class ChartView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            treeData: nextProps && nextProps.chartData
        });
    }

    render() {
        const { treeData } = this.state;
        const { organizationName } = this.props;
        const treeview = treeData && treeData.children && treeData.children.map(item => {
            return (
                <ul>
                    <li key={ item.name }>
                        {
                            <Fragment>
                                    { item.name}
                                    <ul>
                                        {
                                            item.children.map(item1 => (
                                                <li key={ item1.name }>
                                                {
                                                    <Fragment>
                                                     { item1.name}
                                                        <ul>
                                                            {
                                                                item1.children.map(item2 => (
                                                                    <li key={ item2.name }>
                                                                        {
                                                                            <Fragment>
                                                                                { item2.name }
                                                                                 <ul>
                                                                                     {
                                                                                         item2.children.map(item3 => (
                                                                                             <li key={ item3.name }>
                                                                                                {
                                                                                                    <Fragment>
                                                                                                        { item3.name}
                                                                                                        <ul>
                                                                                                            {
                                                                                                                item3.children.map(item4 => (
                                                                                                                    <li key={ item4.name }>
                                                                                                                        {
                                                                                                                            <Fragment>
                                                                                                                                { item4.name }
                                                                                                                                <ul>
                                                                                                                                    {
                                                                                                                                        item4.children.map(item5 => (
                                                                                                                                            <li key={ item5.name }>
                                                                                                                                                {
                                                                                                                                                    <Fragment>
                                                                                                                                                        { item5.name }
                                                                                                                                                    </Fragment>
                                                                                                                                                }
                                                                                                                                            </li>
                                                                                                                                        ))
                                                                                                                                    }
                                                                                                                                </ul>
                                                                                                                            </Fragment>
                                                                                                                        }
                                                                                                                    </li>
                                                                                                                ))
                                                                                                            }
                                                                                                        </ul>
                                                                                                    </Fragment>
                                                                                                }
                                                                                             </li>
                                                                                         ))
                                                                                     }
                                                                                 </ul>
                                                                            </Fragment>
                                                                        }
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                    </Fragment>
                                                }
                                                </li>
                                            ))
                                        }
                                    </ul>
                            </Fragment>
                            
                        };

                    </li>
                </ul>
            );
        });
        return (
            <div className="treeview">
                <div className="sidebar">
                    <p>{treeData && treeData.organizationName} </p>
                    { treeview }
                </div>
                <div className="chartview">
                  <div className="wrapper-input">
                    <Input 
                      className="form-input" 
                      placeholder="Company Name" 
                      type="text" 
                      name="companyName"
                      value={ organizationName }
                    />
                     <span className="btn-listview" onClick={ this.props.showListView }>LIST VIEW</span>
                  </div>
                  <div className="chart-tree">
                    <OrgChart tree={ treeData } NodeComponent={ TreeNode } />
                  </div>
                </div>      
            </div>
        );
    }
} 

export default ChartView;
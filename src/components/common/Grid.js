import React from 'react';
//import ReactDOM from 'react-dom';
const h = React.createElement;
//import { NavLink } from 'react-router-dom';
import '../../styles/grid.scss';
import '../../styles/grid-override.scss';

import { ICONS } from '../../constants';
class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: {
                cellId: [],
                cellData: []
            }
        };
        this.init();
        this.calculate();
    }

    componentWillReceiveProps(nextProps) {
        this.props = nextProps;
        this.init();
        this.calculate();
        let target = document.getElementById('grid-box');
        target.scrollTop = 0;
    }

    init() {
        const props = this.props;
        this.dim = {
            wordsPerCell: 18,
            cellHeight: 30,
            defaultColWidth: 200,
            lineThick: 1,
            numCols: props.head.length,
            headerRows: props.head.length,
            numRows: props.head.length + props.body.length,
            cols: props.head,
            rows: props.body
        };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.clusterRender = this.clusterRender.bind(this);

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
    }
    clickHandler = e => {
      this.props.clickHandlerFn(e.target.getAttribute('name'), e.target.id);
    }
    checkHandler = e => {
        const data = {
            title: e.target.title,
            id: e.target.id,
            checked: e.target.checked
        };
        this.props.checkHandlerFn(data);
    }
    sortHandler = e => {
      this.props.sortHandlerFn(e.target.getAttribute('name'), e.target.id);
    }
    checkboxHandler = () => {
    //checkboxHandler = e => {
        //call the props
        //console.log('checkboxHandler called, e : ', e.target.id);
    }
    onMouseDown(e) {
        const type = e.target.getAttribute('data-type');
        if (['hline', 'vline'].indexOf(type) === -1) return;
        const index = +e.target.getAttribute('data-index');

        this.drag = {
            type,
            index,
            startX: e.clientX,
            startY: e.clientY
        };
        this.isDragging = true;
    }

    onMouseUp(e) {
        if (!this.isDragging) return;
        if (!this.drag) return;

        this.isDragging = false;
        const type = this.drag.type;
        const index = this.drag.index;
        //const selector = '.' + type + '-' + index;

        if (type === 'vline') {
            //let style = this.dim.vlines[index];
            let dx = e.clientX - this.drag.startX;
            this.dim.cols[index - 1].width += dx;

         /*    var pixelsAdded = 0;
            if(this.dim.cols[index - 1].width > 200) {
              pixelsAdded = this.dim.defaultColWidth - this.dim.cols[index - 1].width;

              var wordsForThisCell = this.dim.defaultColWidth/this.dim.wordsPerCell;
              wordsForThisCell = wordsForThisCell * pixelsAdded;

            } */

            this.calculate();
            this.setState({ rand: Math.random() }); // trigger re-render
        }
        else if (type === 'hline') {
            //let style = this.dim.hlines[index];
            let dy = e.clientY - this.drag.startY;
            this.dim.rows[index - 1].height += dy;
            this.calculate();
            this.setState({ rand: Math.random() }); // trigger re-render
        }
    }

    onMouseMove(e) {
        if (!this.isDragging) return;

        const type = this.drag.type;
        const index = this.drag.index;
        const selector = '.' + type + '-' + index;

        if (type === 'vline') {
            let style = this.dim.vlines[index];
            let dx = e.clientX - this.drag.startX;

            // vertical lines are duplicated in head (fixed rows) and body panes. move both
            const $lines = this.$box.querySelectorAll(selector);
            Array.from($lines).forEach($line => {
                $line.style.left = (style.left + dx) + 'px';
                $line.style.top = (style.top) + 'px';
            });
        }
        else if (type === 'hline') {
            let style = this.dim.hlines[index];
            let dy = e.clientY - this.drag.startY;

            const $lines = this.$box.querySelectorAll(selector);
            Array.from($lines).forEach($line => {
                $line.style.left = (style.left) + 'px';
                $line.style.top = (style.top + dy) + 'px';
            });
        }
    }
    calculate() {
        const defaultColWidth = this.dim.defaultColWidth;
        const defaultRowHeight = 20;
        const lineThick = this.dim.lineThick;

        this.dim.vlines = [];
        this.dim.totalWidth = 0;
        
        /* const fullScreenWidth = screen.width;
        let availableWidthPercentage = fullScreenWidth/100;
        console.log('availableWidthPercentage : ', availableWidthPercentage);
        availableWidthPercentage = availableWidthPercentage-17.5;

        let availableWidth = (availableWidthPercentage/100)*fullScreenWidth;
        let flexibleWidth = availableWidth / this.dim.numCols;
        console.log('flexibleWidth : ', flexibleWidth, screen.width);
        if(flexibleWidth<200) { flexibleWidth = 200; } */

        for (let i = 0; i < this.dim.numCols; i += 1) {

            let width = defaultColWidth; //flexibleWidth
            if (this.dim.cols[i] && this.dim.cols[i].width) width = this.dim.cols[i].width;

            this.dim.cols[i]['width'] = width;
            this.dim.totalWidth += width + lineThick;
        }

        this.dim.hlines = [];
        this.dim.totalHeight = 0;
        for (let j = 0; j < this.dim.numRows; j += 1) {

            let height = defaultRowHeight;
            if (this.dim.rows[j] && this.dim.rows[j].height) height = this.dim.rows[j].height;
            this.dim.totalHeight += height + lineThick;
        }
    }

    clusterRender = () => {
        const lineThick = this.dim.lineThick;

        const vlines = [];

        const hlinesHead = [];
        const hlinesBody = [];

        let cellsHead = [];
        let cellsBody = [];
        //const gridboxheader = { height: 23 };

        // vertical lines
        let x = 0;
        for (let i = 1; i < (this.dim.numCols); i += 1) {
            x += (this.dim.cols[i - 1].width + lineThick);
            let style = { left: x, top: 0 };
            let key = 'vline-' + i;
            let attrs = {
                'data-index': i,
                'data-type': 'vline',
                key,
                className: ['grid-vline', key].join(' '),
                style,
                onMouseDown: this.onMouseDown
            };
            this.dim.vlines[i] = style;
            let line = h('div', attrs);
            vlines.push(line);
            //(i <= this.dim.numCols) ? vlines.push(line) : vlinesRight.push(line);
        }

        // horizontal lines
        let y = 0;
        for (let i = 1; i < (this.dim.numRows); i += 1) {
            y += (this.dim.numRows + lineThick);
            let style = { left: 0, top: y };
            //let key = 'hline-' + i;
            // let attrs = {
            //     'data-index': i,
            //     'data-type': 'hline',
            //     key,
            //     className: ['grid-hline', key].join(' '),
            //     style,
            //     onMouseDown: this.onMouseDown
            // };
            this.dim.hlines[i] = style;
           //let line = h('div', attrs);
            //(i <= this.dim.numRows) ? hlinesHead.push(line) : hlinesBody.push(line);
        }

        let { head, body } = this.props;
        head = head ? head : [];
        //console.log('head.length in GRID : ', head.length);
        //gridboxheader.width = (this.dim.defaultColWidth * head.length) + x;
        
        // cells - head
        this.dim.rtot = 0;
        let r = 1;
            this.dim.ctot = 0;
            
            /* for( let j=0; j < this.props.head.length; j++) {
                let item = this.props.head[j];
                //let cspan = item && item.hasOwnProperty('colspan') ? item.colspan : 1;

                let cell = this.renderCell(item, r, j, { type: 'head', rowId: r, colIdx: j });
                cellsHead.push(cell);
            } */
            
            head.map( (item, j) => {
                  let cell = this.renderCell(item, r, j, { rowId: r, colIdx: j });
                  cellsHead.push(cell);
          });


            this.dim.rtot += this.dim.rows[r] + lineThick;
            
            //let c = 0;
            
            body = body ? body : [];
            body.map( (row, i) => {
                r++;
                row.map( (cols, j) => {
                    let item = cols;
                    //let cspan = item && item.hasOwnProperty('colspan') ? item.colspan : 1;
                    let cell = this.renderCell(item, i, j, { rowId: i, colIdx: j });
                    cellsBody.push(cell);
                   // c += cspan;
                });
                this.dim.rtot++;
            });
            this.dim.rtot += lineThick;

        const gridboxheader = { height: 45, width: this.dim.totalWidth };
        const bodyHeight = '100%';

        const bodyStyle = { height: bodyHeight, position: 'relative', /* overflow: 'scroll', */ top: 1 };
        //const rightStyle = { height: '100%', width: '100%', position: 'absolute', top: 0 };
        const rightStyle = { height: '100%', width: this.dim.totalWidth, position: 'absolute', top: 4 };
        

        return h('div', { id: 'grid-box', className: 'grid-box', ref: elem => this.$box = elem }, '',
                    h('div', { className: 'grid-box-header', style: gridboxheader },
                        h('div', { style: rightStyle }, hlinesHead, vlines, cellsHead)
                    ),
                    h('div', { id: 'grid-body', className: 'grid-body', style: bodyStyle },
                        h('div', { className: 'grid-body5', style: { position: 'relative', width: this.dim.totalWidth, height: '100%' } }, hlinesBody, vlines, cellsBody)
                    )
                );
    }
    render() {
        return this.clusterRender();
    }


    renderCell(item, r, c, opts = {}) {
        let containerClassName = 'grid-cell-span';
        let lineThick = this.dim.lineThick;
        let cspan = item && item.hasOwnProperty('colspan') ? item.colspan : 1;
        let rspan = item && item.hasOwnProperty('rowspan') ? item.rowspan : 1;
        let cell = null;

        // // rtot and ctot are the running total of row/col position respectively
         let left = this.dim.ctot + 1;
         let top = this.dim.rtot + 1;

        // calculate width including the spanned column
        let width = 0;
        for (let i = 0; i < cspan; i += 1) {
            if (i > 0) width += lineThick;
            width += this.dim.cols[c + i] ? this.dim.cols[c + i].width : 100;
        }
       
        // calculate width including the spanned rows
        let height = 0;
        height = this.dim.cellHeight * rspan; 
        // for (let i = 0; i < rspan; i += 1) {
        //     if (i > 0) height += lineThick;
        //     height += this.dim.rows[r + i] ? this.dim.rows[r + i].height : 0;
        // }

        //if (item && !item.hasOwnProperty('empty')) {
            let key = ['cell', r, c].join('-');
            let className = ['grid-cell', key];
            let style = { left, top, width, 'min-height': height, height };

            // bring the cell above grid line
            // if (cspan > 1 || rspan > 1) {
            //     className.push('grid-cell-above');
            // }
            let links;
            let sortableIcon = false;
            if (item.class) {
                const itemClass = item.class.split(' ');
                let icon = '';
                if (itemClass.indexOf('head-cell')!==-1 ) {
                    sortableIcon = true;
                }

                if (itemClass.indexOf('subcell')!==-1 ) {
                    links = item.items.map( subItem => {
                        return h('div', { value: subItem.label, style: {'display': 'block' }, title: subItem.label, className: 'grid-link' },
                            subItem.label
                        );
                    });
                }

                if( itemClass.indexOf('master-checkbox')!==-1 || itemClass.indexOf('grid-checkbox')!==-1 ) {
                    return h('input', { type: 'checkbox', style: { }, title: '', id: '', className: 'master-checkbox', onClick: this.checkboxHandler }
                    );
                }
                let imgTitle = '';
                if (itemClass.indexOf('grid-link')!==-1 ) {
                    if (itemClass.indexOf('view')!==-1 ) {
                        icon = ICONS.VIEW;
                        imgTitle = 'View Details';
                    }
                    containerClassName = 'grid-cell-span-links';
                    links = item.items.map( actionable => {
                        // h('a', { id: 'grid-body', className: 'grid-body', style: bodyStyle },
                        //     h('div', { className: 'grid-body5', style: { position: 'relative', width: this.dim.totalWidth, height: '100%' } }, hlinesBody, vlines, cellsBody)
                        // )

                            if(actionable.name === 'checkbox') {
                                //style.width = '50px';
                                return h('input', { type: 'checkbox', style: { 'width':'50px'}, title: '', id: `${ actionable.id }`, className: 'grid-link', onClick: this.checkHandler }
                                );
                            } else {
                              
                                if(actionable.name === 'edit') { icon = ICONS.EDIT; imgTitle = 'Edit Record'; }
                                else if(actionable.name === 'delete') { icon = ICONS.DELETE; imgTitle = 'Delete Record'; }
                                
                                return h('img', { src: icon, style: { }, title: imgTitle, name: actionable.link, id: `${ actionable.id }`, className: 'grid-link', onClick: this.clickHandler }
                                );
                            }
                    });
                }
                className.push(item.class);
            }

            let { rowId, colIdx } = opts;
            let attrs = {
                rowId, colIdx,
                key,
                className: className.join(' '),
                style: style
            };
            
            let val;
            let itemValue = links ? links : item.value;
            /* if (typeof (itemValue) == 'string') {
                if(itemValue.length > this.dim.wordsPerCell) {
                  itemValue = itemValue.substring(0, this.dim.wordsPerCell);
                  itemValue += '...';
                } else {
                  itemValue = itemValue.substring(0, this.dim.wordsPerCell);
                }     
            } */

            //     return h('img', { src: ICONS.SORT, style: { }, className: 'head-cell sort', onClick: this.clickHandler }
                //     );

            if(sortableIcon === true) {
                val = h('span', { title: '', className: 'grid-cell-span' }, itemValue,
                    h('img', { src: ICONS.SORT, name: item.value, style: { }, className: 'head-cell sort', onClick: this.sortHandler }
                ));
            } else {
                val = h('span', { title: item.value, name: item.value, className: containerClassName }, itemValue);
            }
            
            cell = h('div', attrs, val);


        return cell;
    }
}
export default Grid;

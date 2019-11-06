import React from 'react';

const TreeNode = ({ node }) => {
    return (
        <div className="tree-node">
            { node.name }
        </div>
    );
};

export default TreeNode;
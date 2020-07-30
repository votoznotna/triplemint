import React from 'react';


const buttonStyle = {
    backgroundColor: '#00d7a0',
    borderColor: '#00d7a0',
    color: '#fff'
}

const Tag = ({tagId, tagTitle, selectorId}) => {

    const deleteTag = () => {

    }

    return (
        <div id={tagId}>
            <button type="button" style={buttonStyle} className="btn">
            {tagTitle} <span className="badge badge-light" onClick={deleteTag}>x</span>
            </button>
        </div>
    );
};

export default Tag;
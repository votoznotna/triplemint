import React from 'react';

const ulStyle = {
    padding: '0 10px',
    margin: '0',
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none'
}

const liStyle = {
    listStyle: 'none',
    margin: '0 10px 10px 0',
    padding: '8px 15px',
    fontSize: '14px',
    backgroundColor: '#00d7a0',
    color: '#fff',
    borderRadius: '3px',
    display: 'inline-block',
}

const aStyle = {
    marginLeft: '5px',
    fontSize: '15px',
    color: '#fff',
    cursor: 'pointer'
}

const hrStyle = {
    margin: '0 0 10px 0',
    borderTop: '1px solid grew'
}

const TagList = ({tags, setTags}) => {

    const deleteTag = (e, tagId) =>  {
        e.preventDefault();
        setTags(prev => prev.filter(item => item[0] !== tagId));
    }

    return (
        <div id="tag-list-component" role="list">
            <ul style={ulStyle}>
                { tags.map(tag => 
                    (<li role="tag" key={`${tag[2]}_${tag[0]}`} style={liStyle}>
                        <span>{tag[1]}</span> 
                        <span onClick={(e) => deleteTag(e, tag[0]) } style={aStyle}>x</span> 
                    </li>)
                )}  
            </ul>
            { tags && !!tags.length && (<hr style={hrStyle}></hr>)}
        </div>
    );
};

export default TagList;

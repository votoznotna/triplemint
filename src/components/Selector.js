import React from 'react';
import bootstrap from 'bootstrap';

const selectorStyle = {
    margin: '0 10px 10px'
}

const Selector = ({selectorId, selectorTitle, selectorTags, tags, setTags, multi = true}) => {

    const selectTag = (e, selector) => {
        e.preventDefault();
        if(!multi) {
            setTags(prev => [...prev.filter(item => item[2] !== selectorId), [selector[0], selector[1], selectorId]]);
        } else {
            setTags(prev => [...prev, [selector[0], selector[1], selectorId]]);
        }
    }
    const noTags = selectorTags.every(selectorTag => !!tags.find(tag => (tag[0] === selectorTag[0])));
    return (
        <div style={selectorStyle} className="dropdown">
            <button className={`btn btn-secondary dropdown-toggle ${noTags && "disabled"}`}
                    type="button" key={selectorId} id={selectorId} 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selectorTitle}
            </button>
            <div className="dropdown-menu" aria-labelledby={selectorId}>
                { selectorTags.map(selectorTag => 
                    (
                        <button style={{display: !!tags.find(tag => tag[0] === selectorTag[0] && tag[2] === selectorId) ? 'none' : 'block' }} 
                                className="dropdown-item" 
                                onClick={(e) => selectTag(e, selectorTag)} 
                                key={selectorTag[0]} type="button">{selectorTag[1]}</button>
                    )
                )}
            </div>
        </div>
    );
};

export default Selector;
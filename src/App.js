import React, { useState, useEffect, useRef } from "react";
import Units from './components/Units';
import TagList from './components/TagList';
import Selector from './components/Selector';
import useFetchReducer from './hooks/useFetchReducer';
import useLocalStorage from './hooks/useLocalStorage';
import triplemint from './assets/triplemint.svg';

const headerStyle = {
  display: 'flex',
  justifyContent: 'start',
  borderBottom: '1px solid grey',
  alignItems: 'center',
  padding: '0 0 10px 0'
}
const showHideOptionsStyle = {
  cursor: 'pointer'
}
const selectorsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
  alignItems: 'center'
}

const controlsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'start',
  alignItems: 'center'
}

const clearButtonStyle = {
  margin: '0 10px 10px'
}

const logoStyle = {
  width: '140px'
}


const logoLinkStyle = {
  marginBottom: '5px',
  marginRight: '10px'
}

const loadingStyle = {
  position: 'fixed',
  width: '100%',
  left: 0,
  right: 0,
  opacity: 0.9,
  marginBottom: 0,
  bottom: 0
}

const mainStyle = {
  overflowY:'auto', 
  height: '100%',
  overflowX:'hidden'
}

const initValues = {
  tags: [],
  params: {skip: 0},
  data: { data: {models: []}, params: {skip: 0}}
}

const App = () => {
    
    const listRef = useRef(null);
    const [storeTags, setStoreTags] = useLocalStorage('triplemintTags', null); 
    const [bizData, setBizData] = useState([]);
    const [tags, setTags] = useState(storeTags || initValues.tags); // array of [tagId, tagTitle, selectorId]
    const [{ data, isLoading, isError }, setParams] = useFetchReducer(initValues.params,
      initValues.data
    );
    const [showHideOptions, setShowHideOptions] = useState(true);

    useEffect(() => {
      const query = tags.reduce((res, tag) => {
        if(res[tag[2]]) {
          const tagValue = res[tag[2]];
          const tagValueArr = tagValue.split(',');
          tagValueArr.push(tag[0]);
          res[tag[2]] = tagValueArr.join(',');
        } else {
          res[tag[2]] = tag[0];
        }
        return res;
      }, {});
      setParams({...query, ...{skip: 0}} );
      setStoreTags(tags);
      setBizData([]);
    }, [tags, setParams, setStoreTags]);

    useEffect(() => {
      setBizData(prev => [...prev.slice(0, data.params.skip), ...data.data.models]);
    }, [data, setBizData]);

    useEffect(() => {
      const handleScroll = () => {
          const scrollElement = listRef.current;
          if (scrollElement.scrollTop + scrollElement.clientHeight < scrollElement.scrollHeight) return;
          setParams(prev => ({...prev, ...{skip: bizData.length}}));
      }
      const scrollElement = listRef.current;
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }, [bizData, setParams]);

    useEffect(() => {
      const handleResize = () => {
        const scrollElement = listRef.current;
        const header = document.querySelector('header');
        const tagListComponent = document.querySelector('#tag-list-component');
        scrollElement.style.height = `${window.innerHeight - header.clientHeight - tagListComponent.clientHeight - 50}px` ;
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => window.removeEventListener('resize', handleResize);
    },[]);

    const clearTags = (e) => {
      e.preventDefault();
      setTags([]);
    }

    return (
      <div id="app" style={{overflow: 'auto'}}>
        <header style={headerStyle} className="column-layout">
          <section id="logo" style={logoLinkStyle} >
            <div style={showHideOptionsStyle} 
              onClick={() => setShowHideOptions(prev => !prev)}>
              <img src={triplemint} style={logoStyle} alt="Logo"></img>
            </div>
          </section>
          {showHideOptions &&
            <section id="selectors" style={selectorsStyle}>
              <Selector selectorId={'building_types'}  
                        selectorTitle={'Property Type'} 
                        selectorTags={[['co-op', 'Coop'], ['condo', 'Condo'], ['single-family', 'Single Family'], ['two family', 'Two Family'], ['condop', 'Condop'], ['multi-family', 'Multi-Family']]}
                        tags={tags}
                        setTags={setTags}
                        ></Selector>   
              <Selector selectorId={'bedrooms'}  
                        selectorTitle={'Bedrooms'} 
                        selectorTags={[['0', 'Studio'],['1', '1 Bed'], ['2', '2 Beds'], ['3', '3 Beds'], ['4', '4 Beds'], ['*5', '5+ Beds']]}
                        tags={tags}
                        setTags={setTags}
                        ></Selector>   
              <Selector selectorId={'min_bathrooms'}  
                        selectorTitle={'Bathrooms'} 
                        selectorTags={[['1', '1+ Bath'],['1.5', '1.5+ Baths'], ['2', '2+ Baths'], ['2.5', '2.5+ Baths'], ['3', '3+ Baths'], ['3.5', '3.5+ Baths'], ['4', '4+ Baths'], ['4.5', '4.5+ Baths']]}
                        tags={tags}
                        setTags={setTags}
                        multi={false}
                        ></Selector>
            </section>}
          {showHideOptions && <section id="controls" style={controlsStyle}>
              {!!tags.length && <button type="button" onClick={clearTags} style={clearButtonStyle} className="btn btn-light">Clear</button>}
            </section>}
        </header>
        {showHideOptions && <TagList tags={tags} setTags={setTags}></TagList>}
        {isError && <div className='alert alert-danger'>Something went wrong ...</div>}
        <main ref={listRef} style={mainStyle}>
          <Units data={bizData}></Units>
        </main> 
        {isLoading && <div style={loadingStyle} className='alert alert-info'>Loading ...</div>}

    </div>
    )
}

export default App;

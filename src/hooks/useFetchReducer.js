import { useReducer, useEffect, useState } from 'react'
import axios from 'axios'

const dataFetchReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_INIT':
        return {
          ...state,
          isLoading: true,
          isError: false
        };
      case 'FETCH_SUCCESS':
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: action.payload,
        };
      case 'FETCH_FAILURE':
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      default:
        throw new Error();
    }
  };
  
  // const CORS_URL = 'https://cors-anywhere.herokuapp.com';
  const BASE_TARGET_URL = 'https://www.triplemint.com/tmapi/service/prisma/listings?listing_type=SALE&locality=ny:nyc&building_types_operator=include&status=active&time_share=false&order=has_photo,listing_listed_date,desc&ui=card&limit=18';
  export default (initialParams, initialData) => {
    const [params, setParams] = useState(initialParams);
  
    const [state, dispatch] = useReducer(dataFetchReducer, {
      isLoading: false,
      isError: false,
      data: initialData,
    });

    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
          const result = await axios(`${BASE_TARGET_URL}`, {
            params: { ...params }
          });
          dispatch({ type: 'FETCH_SUCCESS', payload: { data: result.data, params: params} });
        } catch (error) {
            dispatch({ type: 'FETCH_FAILURE' });
        }
      };
  
      fetchData();

    }, [params]);
  
    return [state, setParams];
  };
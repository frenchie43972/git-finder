import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();

    // URLSearchParams is a built in browser API that provides a way to work with 
    // the query parameters (the key/value pairs after the ? in a URL)
    const params = new URLSearchParams({
      q: text,
    });
    
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    });
    
    const {items} = await response.json();
    
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  };

  const getUser = async (login) => {
    setLoading();
    
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
    
      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  const getUserRepos = async (login) => {
    setLoading();

    // URLSearchParams is a built in browser API that provides a way to work with 
    // the query parameters (the key/value pairs after the ? in a URL)
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 20,
    });

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    });
    
    const data = await response.json();
    
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  };

  const clearUsers = () => dispatch({
    type: 'CLEAR_USERS',
  });

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider value={{
      users: state.users,
      user: state.user,
      loading: state.loading,
      repos: state.repos,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos,
    }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;


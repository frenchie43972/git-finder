import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

// We are using context to share data across multiple
// components in the application. It is related to everything Github
// (users, respositories, etc.) and GithubContext acts as a container
// to share that data

// The useContext hook allows us to use the data contained in the context
const GithubContext = createContext();

// You will have to create a separate .env document to add your own 
// environmental variables
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// GithubProvider will be used to wrap all other components in App.js in a parent
// component tree using the 'children' prop
export const GithubProvider = ({ children }) => {
  // The initial state of the component is set for Gituhub users, individual users, repos and
  // the loading state of the page
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // The 'state' object represents the current state of the component which is updated based
  // on the actions 'dispatched'. The githubReducer function is used to update the state.
  const [state, dispatch] = useReducer(githubReducer, initialState);


  // ----------------------------ACTION CREATORS SECTION----------------------------
  // NOTE: There can be a future refactor to move these action creators to a separate file
  // The following action creators are responsible for creating objects representing actions
  // to be dispatched to the reducer function then updates the state based on the action.
  // These action creators are passed to the child components via the GithubContext.Provider
  // using the 'dispatch' functionon each. 
  // The fetch function uses the hearders object to set an Authorization header to authenticate
  // the request to the Github API.
  // Each action creator name is fairly self evident on what it does, so I will not comment on each.

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
    });
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

  // ---------------------------- END ACTION CREATORS SECTION----------------------------

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  // Returns GithubContext.Provider component. The Provider component is a special component in
  // Rect.Context API that allows us to pass down data to the child components without having 
  // to pass it through each component prop.
  // the 'value' prop contains the 'state' object and trhe action creators which are passed
  // to the child components 
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
      {/*  The 'children' prop allows components to be nested in other components
      I need to learn and experience this more*/}
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;


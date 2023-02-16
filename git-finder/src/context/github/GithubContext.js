import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const searchUsers = async () => {
    setLoading();

    // URLSearchParams is a built in browser API that provides a way to work with 
    // the query parameters (the key/value pairs after the ? in a URL)
    const params = new URLSearchParams({

    });
    
    const response = await fetch(`${GITHUB_URL}/search/users/${}`, {
      headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
    });
    
    const data = await response.json();
    
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  };

  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  return (
    <GithubContext.Provider value={{
      users: state.users,
      loading: state.loading,
      searchUsers,
    }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

// REACT_APP_G
// ITHUB_URL = "https://api.g
// ithub.com"
// REACT_APP_
// GITHUB_TOKEN = "ghp_d4MDTH2pDDOrp
// VI0AH1sfWyUuBQF2D0uKYyj"
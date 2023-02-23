// This reducer function will be used to manage global state changes based on dispatched
// actions.  It is used to fetch GitHub users, individual users and their
// repositiories. The different cases in the switch statement will correspond
// to different actions ('action') that are dispatched to the reducer function

// When the payload form Github context gets dispatched to the 'action' argument
// the funtion uses the state argument to determine the next state of the app
const githubReducer = (state, action) => {
  switch (action.type) {
    // If the action type is "GET_OR_SET", this will return a new state object
    // with the users array set to the action of the payload 
    case 'GET_USERS':
      return {
        ...state, 
        users: action.payload,
        loading: false,
      }
    case 'GET_USER':
      return {
        ...state, 
        user: action.payload,
        loading: false,
      }
    case 'GET_REPOS':
      return {
        ...state, 
        repos: action.payload,
        loading: false,
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    case "CLEAR_USERS": 
      return {
        ...state,
        users: [],
      }
    // If the action type does not match any of the cases, return the current state
    default:
      return state;
  }
};

export default githubReducer;
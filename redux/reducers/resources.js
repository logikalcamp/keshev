const recourcesReducerDefault = {
    isAuthenticated: false
  };
  
  export default (state = recourcesReducerDefault, action) => {
    switch (action.type) {
      case "LANGUAGE_CHANGE":
        return {
          ...state,
          isAuthenticated: action.val.isAuthenticated,
        };
      default:
        return state;
    }
  };
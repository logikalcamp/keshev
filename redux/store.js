import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import calendar from "./reducers/calendar";
// import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
// import auth from "../reducers/auth";
// import translationsObject from '../i18n'
import assignmment from "./reducers/assigment";
import unitTree from "./reducers/unitTree";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      calendar,
      assignmment,
      //   auth: auth,
      //   language:i18nReducer
      unitTree,
    }),
    // composeEnhancers(applyMiddleware(thunk))
  );
  //   syncTranslationWithStore(store)
  //   store.dispatch(loadTranslations(translationsObject));
  //   store.dispatch(setLocale('he'));
  return store;
};

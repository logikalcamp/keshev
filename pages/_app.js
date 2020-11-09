import '../styles/globals.css'
import '../styles/tailwind.css'
import {Provider} from 'react-redux';
import configureStore from "../redux/store";
import { ThemeProvider, theme } from '@chakra-ui/core';

const store = configureStore();
store.subscribe(() => {
  console.log("subscribe info", store.getState());
});


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider >
    </Provider>
  )
  
}

export default MyApp

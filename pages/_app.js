import '../styles/globals.css'
import '../styles/tailwind.css'
import {Provider} from 'react-redux';
import configureStore from "../redux/store";
import { ThemeProvider, theme } from '@chakra-ui/core';
import { useRouter } from 'next/router'
import cx from 'classnames'
import { Checkbox } from '@material-ui/core';

const store = configureStore();
store.subscribe(() => {
  console.log("subscribe info", store.getState());
});


function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider >
      <div className="flex justify-evenly bg-white fixed bottom-0 w-full left-0 ">
        <button onClick={()=>router.push('/search')} className={cx("p-3 rounded-lg m-2 focus:outline-no",{"bg-gray-200":router.pathname =="/search"})}>
          חיפוש מסמכים
        </button>
        <button onClick={()=>router.push('/')} className={cx("p-3 rounded-lg m-2 focus:outline-no",{"bg-gray-200":router.pathname =="/"})}>
          אירועים קרובים
        </button>
        <button onClick={()=>router.push('/past')} className={cx("p-3 rounded-lg m-2 focus:outline-no",{"bg-gray-200":router.pathname =="/past"})}>
          אירועים שעברו
        </button>
      </div>
    </Provider>
  )
  
}

export default MyApp

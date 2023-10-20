import styles from "./App.module.css";
import Customer from "./components/CustomerComponent/Customer";
import Account from "./components/AccountComponent/Account";
import { Provider } from "react-redux";
import store from "./Store/store";

export default function App(){
  return (
    <div className={styles.app}>
      <h1>Redux Project</h1>
      <Provider store={store}>
        <Customer />
        <Account />
      </Provider>
    </div>
  );
}

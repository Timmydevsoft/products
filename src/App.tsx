import { Provider } from "react-redux";
import cartStore from "./store/store";
// import Index from "./component/Index";
import "./index.css";
import ProductList from "./component/ProductList";

export default function App() {
  return (
    <>
      <Provider store={cartStore}>
        <ProductList/>
        {/* <Index /> */}
      </Provider>
    </>
  );
}

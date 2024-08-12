import { Provider } from "react-redux";
import cartStore from "./store/store";
import Index from "./component/Index";
import "./index.css";

export default function App() {
  return (
    <>
      <Provider store={cartStore}>
        <Index />
      </Provider>
    </>
  );
}

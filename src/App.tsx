import { Provider } from "react-redux";
import cartStore from "./store/store";
import "./index.css";
import Index from "./component/Index"

export default function App() {
  return (
    <>
      <Provider store={cartStore}>
        <Index />
      </Provider>
    </>
  );
}

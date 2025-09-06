import { Provider } from "react-redux";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import appStore from "./utils/appStore";
const App = () =>{
  return(
    <Provider store={appStore}>
        <div>
          <Navbar/>
          <Outlet/>
          <Footer/>
        </div>
    </Provider>
  )
}

export default App;
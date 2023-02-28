import "./App.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
// import TimerComponent from './practice/TimerComponent'
import { Route, Routes, BrowserRouter } from "react-router-dom";
//impoert pages
import DonatePage from "./pages/DonatePage/DonatePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupBusiness from "./pages/SignupPage/SignupBusiness";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";
import NGOProfile from "./pages/NGOProfile/NGOProfile";
import SignupNGO from "./pages/SignupPage/SignupNGO";
import { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer/UseReducer";
// import Headerr from "./components/Header/Header";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<Headerr/>}>
//       <Route index element={<WelcomePage/>}>
//       </Route>
//       <Route path="donate" element={<DonatePage/>} />
//       <Route path="blogs" element={<BlogPage/>} />
//       <Route path="sign-in" element={<SigninPage/>} />
//     </Route>
//   )
// )
const userContext = createContext();

const Routing =()=>{
  return (
      <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="sign-in" element={<SigninPage />} />
          <Route path="sign-up-biz" element={<SignupBusiness />} />
          <Route path="sign-up-ngo" element={<SignupNGO />} />
          <Route path="/BusinessProfile/:id" element={<BusinessProfile />}/>
          <Route path="/NGOProfile/:id" element={<NGOProfile />}/>
        </Routes>
        {/* <WelcomePage/> */}
        {/* <RouterProvider router={router} /> */}
      </div>
    </BrowserRouter>
  )
}

function App() {

  const [ state, dispatch ] =  useReducer(reducer, initialState);

  return (
    <>
      <userContext.Provider value={{state, dispatch}}>
        <Routing/>
      </userContext.Provider>
    </>
  );
}

export default App;
export {userContext};
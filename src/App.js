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

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="sign-in" element={<SigninPage />} />
          <Route path="sign-up" element={<SignupBusiness />} />
          <Route path="/BusinessProfile/:id" element={<BusinessProfile />}/>
        </Routes>
        {/* <WelcomePage/> */}
        {/* <RouterProvider router={router} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

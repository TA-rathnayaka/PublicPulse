import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext"; 
import Layout from "./layout"; // Import the Layout component
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Profile from "./pages/profile/Profile";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import Settings from "./pages/settins/Settings"
import ManagePolls from "./pages/managePoll/ManagePolls"
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
        <Route path="login" element={<Login />} />
        </Routes>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="polls" element={<ManagePolls/>}/>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings/>}/>
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New inputs={userInputs} title="Add New User" />} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New inputs={productInputs} title="Add New Product" />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;

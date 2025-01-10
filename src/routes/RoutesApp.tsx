import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../page/home/Home";
import Profile from "../page/profile/Profile";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;

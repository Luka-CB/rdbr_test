import { Route, Routes } from "react-router-dom";
import Layout from "./views/Home/layout/Layout";
import Home from "./views/Home/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import Layout from "./views/layout/Layout";
import Home from "./views/Home/Home";
import CreateTask from "./views/createTask/CreateTask";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateTask />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

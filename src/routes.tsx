import { Route, Routes } from "react-router-dom";
import Layout from "./views/layout/Layout";
import Home from "./views/Home/Home";
import CreateTask from "./views/createTask/CreateTask";
import Details from "./views/details/Details";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/create" element={<CreateTask />} />
        <Route path="/details/:id" element={<Details />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import Layout from "@/Components/Common/Core/Layout";
import ChangePass from "@/Components/Pages/Auth/ForgetPass";
import Login from "@/Pages/Auth/Login";
import Register from "@/Pages/Auth/Register";
import NotFound from "@/Pages/NotFound/index";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { sidebarMenuItems } from "./Routes";
import OpenProject from "@/Pages/OpenProject";

const ImplemetationRoutes = () => {
  const navigate = useNavigate();
  const dashboard = sidebarMenuItems();
  const cookie = Cookies.get("raycloud_token");
  const local = localStorage.getItem("raycloud_token");
  const token = cookie || local;
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      {token ? (
        <Routes>
          {dashboard.map((prop, key) => (
            <Route
              path={`${prop.layout}${prop.path}`}
              element={<Layout>{prop.component}</Layout>}
              key={key}
            >
              {prop.menu &&
                prop.menu.map((item, itemKey) => (
                  <Route
                    path={`${prop.layout}${prop.path}/${item.path}`}
                    element={<Layout>{item.component}</Layout>}
                    key={itemKey}
                  />
                ))}
            </Route>
          ))}
          <Route
            path="/admin/project/projectlist/:id"
            element={
              <Layout>
                <OpenProject />
              </Layout>
            }
          />
          <Route
            path="/*"
            element={<Navigate to="/admin/project/projectlist" />}
          />
          <Route path="/notFound" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/changePassword" element={<ChangePass />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/register" />} />
        </Routes>
      )}
    </>
  );
};

export default ImplemetationRoutes;

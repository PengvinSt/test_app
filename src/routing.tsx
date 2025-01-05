import type { FC } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { useAuth } from "./providers/AuthProvider";
import { HomePage } from "./pages/home";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export const Routing: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<AuthPage />} />
      <Route path="/*" element={<AuthPage />} />
    </Routes>
  </BrowserRouter>
);

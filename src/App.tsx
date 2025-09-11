import * as React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CookiesProvider, useCookies } from "react-cookie"; // <-- import CookiesProvider
import Home from "./Home";
import Panel from "./pages/Panel";
import Login from "./pages/Login";

function ProtectedRoute({ children }: { children: React.JSX.Element }) {
  const [cookies] = useCookies(["token"]);
  const location = useLocation();

  if (!cookies.token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default function App() {
  return (
    <CookiesProvider> {/* <-- add this */}
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/:guestName" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected route */}
          <Route
            path="/panel"
            element={
              <ProtectedRoute>
                <Panel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

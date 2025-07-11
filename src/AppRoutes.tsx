import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import { APP_ROUTES } from "./constants/constants";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EmailConfirmed from "./pages/EmailConfirmed";

function AppRoutes() {

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path={APP_ROUTES.LANDING} element={<Landing />} />
        <Route path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route path={APP_ROUTES.REGISTER} element={<Register />} />
        <Route path={APP_ROUTES.EMAIL_CONFIRMED} element={<EmailConfirmed />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes;

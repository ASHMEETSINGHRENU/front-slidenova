import React from "react";

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Update from "./pages/updated";
import Analysis from "./pages/Analysis";  // ← ADD THIS IMPORT

// Protected Route
const PrivateRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/" />;
};

// Public Route
const PublicRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    return token ? <Navigate to="/home" /> : children;
};

function App() {

    return (
        <Router>

            <Routes>

                {/* PUBLIC HOME PAGE */}
                <Route
                    path="/home"
                    element={<Home />}
                />

                {/* LOGIN */}
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* REGISTER */}
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />

                {/* PROTECTED UPDATE PAGE */}
                <Route
                    path="/update"
                    element={
                        <PrivateRoute>
                            <Update />
                        </PrivateRoute>
                    }
                />

                {/* PROTECTED ANALYSIS PAGE - ADD THIS NEW ROUTE */}
                <Route
                    path="/analysis"
                    element={
                        <PrivateRoute>
                            <Analysis />
                        </PrivateRoute>
                    }
                />

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={<Navigate to="/home" />}
                />

            </Routes>

        </Router>
    );
}

export default App;
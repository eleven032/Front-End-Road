import * as React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Testing from "./pages/Testing";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Home page */}
          <Route path="/" exact element={<Home />} />
          <Route path="/testing" element={<Testing />} />

          {/*404 page*/}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;

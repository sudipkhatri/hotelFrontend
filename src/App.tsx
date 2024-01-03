import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <p>Search</p>
          </Layout>
        }
      />
      <Route path="/register"element={<Layout><Register/></Layout>}/>
      <Route path="/sign-in"element={<Layout><SignIn/></Layout>}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

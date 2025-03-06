import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./page/home/home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login/login";
import MainLayout from "./layout/main-layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;

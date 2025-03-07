import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./page/home/home";
import { Debtor } from "./page/debtor/debtor";
import { DebtorAdd } from "./page/debtor/debtorAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="debtors" element={<Debtor />} />
          <Route path="debtors/add" element={<DebtorAdd />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

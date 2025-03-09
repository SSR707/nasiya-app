import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./page/home/home";
import { Debtor } from "./page/debtor/debtor";
import { DebtorAdd } from "./page/debtor/debtorAdd";
import { DebtorDitiel } from "./page/debtor-ditiel/debtor-ditiel";
import { DebtAdd } from "./page/debt/debtAdd";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="debtors" element={<Debtor />} />
          <Route path="debtors/add" element={<DebtorAdd />} />
          <Route path="debtor/:id" element={<DebtorDitiel />} />
          <Route path="debtor/:id/debt/add" element={<DebtAdd />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

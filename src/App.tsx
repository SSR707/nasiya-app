import { Route, Routes } from "react-router-dom";
import { Login } from "./page/login/login";
import MainLayout from "./layout/main-layout";
import { Home } from "./page/home/home";
import { Debtor } from "./page/debtor/debtor";
import { DebtorAdd } from "./page/debtor/debtorAdd";
import { DebtorDitiel } from "./page/debtor-ditiel/debtor-ditiel";
import { DebtAdd } from "./page/debt/debtAdd";
import { Debt } from "./page/debt/debt";
import { DebtorEdit } from "./page/debtor-ditiel/debtorEdit";
import { DebtEdit } from "./page/debt/debtEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="debtors" element={<Debtor />} />
          <Route path="debtors/add" element={<DebtorAdd />} />
          <Route path="debtors/edit/:id" element={<DebtorEdit />} />
          <Route path="debtor/:id" element={<DebtorDitiel />} />
          <Route path="debtor/:id/debt/add" element={<DebtAdd />} />
          <Route path="debt/edit/:id" element={<DebtEdit />} />
          <Route path="debt/:id" element={<Debt />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

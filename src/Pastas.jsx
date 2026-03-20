import MenuPage from "./MenuPage";
import { clearError, fetchPastas } from "./store/PastasSlice";

function Pastas() {

  return (
    <MenuPage
      title="Pasta Menu"
      fetchAction={fetchPastas}
      selector={(state) => state.pastas}
      clearErrorAction={clearError}
    />
  );

}

export default Pastas;
import MenuPage from "./MenuPage";
import { fetchPastas } from "./store/PastasSlice";

function Pastas() {

  return (
    <MenuPage
      title="Pasta Menu"
      fetchAction={fetchPastas}
      selector={(state) => state.pastas}
    />
  );

}

export default Pastas;
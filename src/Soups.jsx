import MenuPage from "./MenuPage";
import { clearError, fetchSoups } from "./store/SoupsSlice";

function Soups() {

  return (
    <MenuPage
      title="Soups Menu"
      fetchAction={fetchSoups}
      selector={(state) => state.soups}
      clearErrorAction={clearError}
    />
  );

}

export default Soups;
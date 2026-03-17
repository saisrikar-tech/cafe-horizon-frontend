import MenuPage from "./MenuPage";
import { fetchSoups } from "./store/SoupsSlice";

function Soups() {

  return (
    <MenuPage
      title="Soups Menu"
      fetchAction={fetchSoups}
      selector={(state) => state.soups}
    />
  );

}

export default Soups;
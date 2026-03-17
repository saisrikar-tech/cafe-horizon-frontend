import MenuPage from "./MenuPage";
import { fetchMocktails } from "./store/MocktailsSlice";

function Mocktails() {

  return (
    <MenuPage
      title="Mocktails Menu"
      fetchAction={fetchMocktails}
      selector={(state) => state.mocktails}
    />
  );

}

export default Mocktails;
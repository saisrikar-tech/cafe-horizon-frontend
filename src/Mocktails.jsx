import MenuPage from "./MenuPage";
import { clearError, fetchMocktails } from "./store/MocktailsSlice";

function Mocktails() {

  return (
    <MenuPage
      title="Mocktails Menu"
      fetchAction={fetchMocktails}
      selector={(state) => state.mocktails}
      clearErrorAction={clearError}
    />
  );

}

export default Mocktails;
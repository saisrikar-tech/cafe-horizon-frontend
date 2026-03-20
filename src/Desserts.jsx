import MenuPage from "./MenuPage";
import { clearError, fetchDesserts } from "./store/DessertsSlice";

function Desserts() {

  return (
    <MenuPage
      title="Desserts Menu"
      fetchAction={fetchDesserts}
      selector={(state) => state.desserts}
      clearErrorAction={clearError}
    />
  );

}

export default Desserts;
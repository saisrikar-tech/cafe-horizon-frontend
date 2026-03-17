import MenuPage from "./MenuPage";
import { fetchDesserts } from "./store/DessertsSlice";

function Desserts() {

  return (
    <MenuPage
      title="Desserts Menu"
      fetchAction={fetchDesserts}
      selector={(state) => state.desserts}
    />
  );

}

export default Desserts;
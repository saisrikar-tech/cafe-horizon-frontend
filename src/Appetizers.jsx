import MenuPage from "./MenuPage";
import { fetchAppetizers } from "./store/AppetizersSlice";

function Appetizers() {

  return (
    <MenuPage
      title="Appetizers Menu"
      fetchAction={fetchAppetizers}
      selector={(state) => state.appetizers}
    />
  );

}

export default Appetizers;
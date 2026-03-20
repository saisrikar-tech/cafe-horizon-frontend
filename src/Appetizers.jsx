import MenuPage from "./MenuPage";
import { clearError, fetchAppetizers, } from "./store/AppetizersSlice";


function Appetizers() {

  return (
    <MenuPage
      title="Appetizers Menu"
      fetchAction={fetchAppetizers}
      selector={(state) => state.appetizers}
      clearErrorAction={clearError}
    />
  );

}

export default Appetizers;
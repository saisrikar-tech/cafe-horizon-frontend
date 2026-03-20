import MenuPage from "./MenuPage";
import { clearError, fetchShakeProducts } from "./store/ShakesSlice";

function Shakes() {

  return (
    <MenuPage
      title="Thick Shakes"
      fetchAction={fetchShakeProducts}
      selector={(state) => state.shakes}
      clearErrorAction={clearError}
    />
  );

}

export default Shakes;
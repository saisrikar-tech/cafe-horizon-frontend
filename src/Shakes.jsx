import MenuPage from "./MenuPage";
import { fetchShakeProducts } from "./store/ShakesSlice";

function Shakes() {

  return (
    <MenuPage
      title="Thick Shakes"
      fetchAction={fetchShakeProducts}
      selector={(state) => state.shakes}
    />
  );

}

export default Shakes;
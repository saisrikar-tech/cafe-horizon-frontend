import MenuPage from "./MenuPage";
import { fetchHotBeverages } from "./store/HotBeveragesSlice";

function HotBeverages() {

  return (
    <MenuPage
      title="Hot Beverages"
      fetchAction={fetchHotBeverages}
      selector={(state) => state.hotBeverages}
    />
  );

}

export default HotBeverages;
import MenuPage from "./MenuPage";
import {  clearError, fetchHotBeverages, } from "./store/HotBeveragesSlice";

function HotBeverages() {

  return (
    <MenuPage
      title="Hot Beverages"
      fetchAction={fetchHotBeverages}
      selector={(state) => state.hotBeverages}
      clearErrorAction={clearError}
    />
  );

}

export default HotBeverages;
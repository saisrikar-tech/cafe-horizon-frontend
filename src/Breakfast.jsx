import MenuPage from "./MenuPage";
import { fetchBreakfast,clearError } from "./store/BreakfastSlice";

function Breakfast() {

  return (
    <MenuPage
      title="Breakfast Menu"
      fetchAction={fetchBreakfast}
      selector={(state) => state.breakfast}
        clearErrorAction={clearError}
    />
  );

}

export default Breakfast;
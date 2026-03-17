import MenuPage from "./MenuPage";
import { fetchBreakfast } from "./store/BreakfastSlice";

function Breakfast() {

  return (
    <MenuPage
      title="Breakfast Menu"
      fetchAction={fetchBreakfast}
      selector={(state) => state.breakfast}
    />
  );

}

export default Breakfast;
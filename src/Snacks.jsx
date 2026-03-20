import MenuPage from "./MenuPage";
import { clearError, fetchSnacks } from "./store/SnacksSlice";

function Snacks() {

  return (
    <MenuPage
      title="Snacks Menu"
      fetchAction={fetchSnacks}
      selector={(state) => state.snacks}
      clearErrorAction={clearError}
    />
  );

}

export default Snacks;
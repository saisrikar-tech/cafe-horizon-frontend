import MenuPage from "./MenuPage";
import { fetchSnacks } from "./store/SnacksSlice";

function Snacks() {

  return (
    <MenuPage
      title="Snacks Menu"
      fetchAction={fetchSnacks}
      selector={(state) => state.snacks}
    />
  );

}

export default Snacks;
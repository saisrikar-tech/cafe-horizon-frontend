import MenuPage from "./MenuPage";
import { fetchPizzas } from "./store/PizzasSlice";

function Pizzas() {

  return (
    <MenuPage
      title="Pizza Menu"
      fetchAction={fetchPizzas}
      selector={(state) => state.pizzas}
    />
  );

}

export default Pizzas;
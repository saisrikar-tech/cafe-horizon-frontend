import MenuPage from "./MenuPage";
import { clearError, fetchPizzas } from "./store/PizzasSlice";

function Pizzas() {

  return (
    <MenuPage
      title="Pizza Menu"
      fetchAction={fetchPizzas}
      selector={(state) => state.pizzas}
      clearErrorAction={clearError}
    />
  );

}

export default Pizzas;
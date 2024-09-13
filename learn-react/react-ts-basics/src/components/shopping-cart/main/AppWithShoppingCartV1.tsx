import { Provider } from "react-redux";

import { DUMMY_PRODUCTS } from "../common/dummy-products.ts";
import { store } from "../common/store/store.ts";
import Header from "../components/header/Header.tsx";
import Product from "../components/product/Product.tsx";
import Shop from "../components/shop/Shop.tsx";

function AppWithShoppingCartV1() {
  return (
    <Provider store={store}>
      <Header />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </Provider>
  );
}

export default AppWithShoppingCartV1;

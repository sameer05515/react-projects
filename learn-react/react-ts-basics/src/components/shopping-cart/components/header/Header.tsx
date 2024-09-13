import { useState } from "react";

import Cart from "../cart/Cart.tsx";
import { useCartSelector } from "../../common/store/hooks.ts";

export default function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const cartQuantity=useCartSelector((state) =>
    state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  function handleOpenCartClick() {
    setCartIsVisible(true);
  }

  function handleCloseCartClick() {
    setCartIsVisible(false);
  }

  return (
    <>
      {cartIsVisible && <Cart onClose={handleCloseCartClick} />}
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Redux</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
}

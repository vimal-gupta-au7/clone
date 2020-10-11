import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../../reducer";
import { useStateValue } from "../../../StateProvider";
import "./Subtotal.css";

export default function Subtotal() {
	const [{ basket }] = useStateValue();
	// console.log(basket);
	return (
		<div className="subtotal">
			<CurrencyFormat
				renderText={(value) => (
					<>
						<p>
							Subtotal ({basket.length} items):
							<strong>{value}</strong>
						</p>
						<small className="subtotal__gift">
							<input type="checkbox" />
							This order contains a gift
						</small>
					</>
				)}
				decimalScale={2}
				value={getBasketTotal(basket)}
				displayType={"text"}
				thousandSeperator={true}
				prefix={" Rs: "}
			/>
			<button>Proceed to Checkout</button>
		</div>
	);
}

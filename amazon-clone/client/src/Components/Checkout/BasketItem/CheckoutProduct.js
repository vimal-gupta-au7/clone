import React from "react";
import { useStateValue } from "../../../StateProvider";
import "./CheckoutProduct.css";

function CheckoutProduct(props) {
	const [dispatch] = useStateValue();

	const removeFromKart = () => {
		//remove the item from the basket
		dispatch({
			type: "REMOVE_FROM_KART",
			id: props.id,
		});
	};

	return (
		<div className="checkoutProduct">
			<img className="img1" src={props.image} alt="product1" />
			<div className="checkoutProduct__info">
				<p className="checkoutProduct__title">{props.title}</p>
				<p className="checkoutProduct__price">
					<small>Rs: </small>
					<strong>{props.price}</strong>
				</p>
				<div className="checkoutProduct__rating">
					{Array(props.rating)
						.fill()
						.map((_, i) => (
							<p>*</p>
						))}
				</div>
				<button className="checkoutProduct__btn" onClick={removeFromKart}>
					Remove from Kart
				</button>
			</div>
		</div>
	);
}

export default CheckoutProduct;

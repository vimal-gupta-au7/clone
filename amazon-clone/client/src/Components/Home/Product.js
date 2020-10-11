import React from "react";
import { useStateValue } from "../../StateProvider";
import "./Product.css";

// import product_img from "../../images/products/img1.jpg";

export default function Product(props) {
	const [dispatch] = useStateValue();

	const moveToKart = () => {
		dispatch({
			type: "MOVE_TO_KART",
			item: {
				id: props.id,
				title: props.title,
				image: props.image,
				price: props.price,
				rating: props.rating,
			},
		});
	};
	return (
		<div className="product">
			<div className="product__info">
				<p> {props.title}</p>
				<p className="product__price">
					<small>Rs: </small>
					<strong>{props.price}</strong>
				</p>
				<div className="product__rating">
					{Array(props.rating)
						.fill()
						.map((_, i) => (
							<p>{"*"}</p>
						))}
				</div>
			</div>
			<img src={props.image} alt="coming soon.." />
			<button onClick={moveToKart}>Add to Kart</button>
		</div>
	);
}

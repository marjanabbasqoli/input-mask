import { useState, useEffect } from "react";

const Input = () => {
	const [cities, setCities] = useState([]);
	const [input, setInput] = useState("");
	const [hint, setHint] = useState("");
	const [touchStart, setTouchStart] = useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	useEffect(() => {
		fetch("./src/cities.json")
			.then((res) => res.json())
			.then((json) => setCities(json))
			.catch((error) => console.log(error.message));
	}, []);

	useEffect(() => {
		input && setHint(cities.find((city) => city.startsWith(input)));
	}, [input]);

	useEffect(() => {
		const handleTouchChange = () => {
			const distance = touchStart - touchEnd;
			distance < 0 && setInput(hint);
		};

		handleTouchChange();
	}, [touchEnd]);

	const handleChange = (e) => {
		setHint("");
		setInput(e.target.value);
	};

	const handleTouch = (e) => {
		if (!touchStart) setTouchStart(e.targetTouches[0].clientX);
		setTouchEnd(e.targetTouches[0].clientX);
	};

	return (
		<div className="input">
			<label htmlFor="input">{hint}</label>
			<input
				type="text"
				id="input"
				onChange={handleChange}
				value={input}
				onKeyUp={(e) => e.code === "ArrowRight" && hint && setInput(hint)}
				onTouchStart={handleTouch}
			/>
		</div>
	);
};

export default Input;

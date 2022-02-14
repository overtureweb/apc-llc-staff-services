import React from "react";
import loading from "./assets/images/Ripple-1s-200px.svg";

const ProgressSpinner = () => (
	<div className="ocr__loader">
		<div>
			<img alt="just a moment..."
			     height={100}
			     width={100}
			     src={loading}/>
		</div>
	</div>
);

export default ProgressSpinner;

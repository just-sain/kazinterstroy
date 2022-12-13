import { useState } from 'react';

export const useMove = () => {
	const [state, setState] = useState({ x: 0, y: 0 });

	const handleMouseMove = e => {
		e.persist();

		if (e.clientX !== state.x && e.clientY !== state.y) {
			setState(state => ({ ...state, x: e.clientX, y: e.clientY }));
		}
	};

	return {
		x: state.x,
		y: state.y,
		handleMouseMove
	};
};

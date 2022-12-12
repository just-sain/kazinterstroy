import { createContext, useState } from 'react';

export const AppContext = createContext({
	menu: []
});

export const AppContextProvider = ({ menu, children }) => {
	const [menuState, setMenuState] = useState(menu);
	const setMenu = newMenu => {
		setMenuState(newMenu);
	};

	return <AppContext.Provider value={{ menu: menuState, setMenu }}>{children}</AppContext.Provider>;
};

import React from "react";

const LayoutStateContext = React.createContext();
const LayoutDispatchContext = React.createContext();

const layoutReducer = (state, action) => {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, isSidebarOpened: !state.isSidebarOpened };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const LayoutProvider = ({ children }) => {
    let [state, dispatch] = React.useReducer(layoutReducer, {
        isSidebarOpened: true
    });
    return (
        <LayoutStateContext.Provider value={state}>
            <LayoutDispatchContext.Provider value={dispatch}>
                {children}
            </LayoutDispatchContext.Provider>
        </LayoutStateContext.Provider>
    );
}

const useLayoutState = () => {
    let context = React.useContext(LayoutStateContext);
    if (context === undefined) {
        throw new Error("useLayoutState must be used within a LayoutProvider");
    }
    return context;
}

const useLayoutDispatch = () => {
    let context = React.useContext(LayoutDispatchContext);
    if (context === undefined) {
        throw new Error(
            "useLayoutDispatch must be used within a LayoutProvider"
        );
    }
    return context;
}

const toggleSidebar = (dispatch) => {
    dispatch({
        type: "TOGGLE_SIDEBAR"
    });
}

export { LayoutProvider, useLayoutState, useLayoutDispatch, toggleSidebar };




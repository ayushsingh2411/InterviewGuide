import React, {useContext} from 'react';

const AppContext= React.createContext();;

export const useAppContext=()=>{
    return useContext(AppContext);
}

export const AppContextProvider= ({children})=>{

    const value={abc: "Hello"};

    return (
        <AppContext.Provider value={value}>{children} </AppContext.Provider>
    )
}
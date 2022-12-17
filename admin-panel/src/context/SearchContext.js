import React, { useState, createContext, useEffect } from "react";

export const SearchContext = createContext()

export const SearchContextProvider = props => {
    const [search, setSearch] = useState(false)


    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {props.children}
        </SearchContext.Provider>
    )
}
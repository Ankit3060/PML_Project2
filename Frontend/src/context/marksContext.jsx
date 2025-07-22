import React, { createContext, useContext,useState } from 'react'

const marksContext = createContext();

export const MarksProvider = ({children})=>{
    const [totalMarks, setTotalMarks] = useState(0);
    return (
        <marksContext.Provider value={{totalMarks, setTotalMarks}}>
            {children}
        </marksContext.Provider>
    )
}

export const useMarks =()=>useContext(marksContext);

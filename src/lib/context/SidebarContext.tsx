"use client"
import { createContext, useContext, useState } from "react";

interface SidebarContextType {
    isOpen : boolean;
    toggleIsOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const SidebarProvider = ({children} : {children : React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleIsOpen = () => setIsOpen(prev => !prev)

    return (
        <SidebarContext.Provider value={{isOpen, toggleIsOpen}}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSidebarToggle = () => {
    const context = useContext(SidebarContext)
    if(!context){
        throw new Error("useSidebarToggle must be used within SidebarContext")
    }

    return context
}

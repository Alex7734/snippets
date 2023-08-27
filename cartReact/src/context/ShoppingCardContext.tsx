import { createContext, ReactNode, useContext } from "react";
import { useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCardProviderProps = {
    children: ReactNode
}

type ShoppingCardContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increseCardQuantity: (id: number) => void
    decreseCardQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity:  number
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCardContext = createContext({} as ShoppingCardContext)

export function useShoppingCart(){
    return useContext(ShoppingCardContext)
}

export function ShoppingCardProvider({children}: ShoppingCardProviderProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('default-shopping-cart',[])
    const cartQuantity = cartItems.reduce((quantity, item) => {return quantity+item.quantity}, 0)

    const openCart = () => {
        setIsOpen(true)
    }

    const closeCart = () => {
        setIsOpen(false)
    }


    function getItemQuantity(id: number){
        return cartItems.find((item) => item.id === id)?.quantity || 0
    }

    function increseCardQuantity(id: number){
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity:1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) 
                        return {...item, quantity: item.quantity+1}
                    else 
                        return item
                })
            } 
        })
    }
    
    function decreseCardQuantity(id: number){
        setCartItems((currItems) => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id != id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) 
                        return {...item, quantity: item.quantity-1}
                    else 
                        return item
                })
            } 
        })
    }

    function removeFromCart(id: number){
        setCartItems((currItems) => {
            return currItems.filter(item => item.id != id)
        })
    }



    return (
        <ShoppingCardContext.Provider value={{getItemQuantity, increseCardQuantity, decreseCardQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCardContext.Provider>
    )
}
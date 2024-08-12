import React from "react"
import EmptyIcon from "../static/illustration-empty-cart.svg"

const EmptyCart:React.FC = ()=>{
    return(
        <div className="w-full flex flex-col itens-center">
            <img src={EmptyIcon} alt="emty icon"/>
            <p className="text-xm text-[#ad8985] text-center font-semibold">Your added items will appear here</p>
        </div>
    )
}
export default EmptyCart

import React from "react";
import { useSelector } from "react-redux";
import X from "../static/icon-remove-item.svg";
import { Part } from "../store/mode";
import { useDispatch } from "react-redux";
import { orderAction } from "../store/slice";
import Carbon from "../static/icon-carbon-neutral.svg";
import EmptyCart from "./EmptyCart";
import "../index.css";

const Cart: React.FC = () => {
  const globalOrder = useSelector((state: any) => state.cart.orderList);
  const dispatch = useDispatch();

  const handleRemove = (name: string) => {
    dispatch(orderAction.removeFromCart(name));
  };

  const handleOrder = () => {
    dispatch(orderAction.controlModal());
    window.scrollTo(
      {
        top:0,
        behavior: 'smooth'
      }
    )
  };

  return (
    <div className="bg-white p-4 rounded-lg fit-content flex-1">
      <div className="container">
        <h2 className="text-2xl text-redrose font-bold">
          Your Cart ({globalOrder.length})
        </h2>
      </div>
      {globalOrder.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="">
          <div className="flex flex-col justify-center mt-2 w-full">
            {globalOrder.length > 0
              ? globalOrder.map((item: Part, index: number) => (
                  <div
                    key={index}
                    className=" flex w-full items-center justify-between border-b-2 py-4"
                  >
                    <div className=" flex flex-col gap-2">
                      <h3 className="text-burnt-rose font-bold">{item.name}</h3>
                      <div className="flex items-center gap-4">
                        <span className="text-redrose font-semibold">
                          {item.quantity}x
                        </span>
                        <span className="text-[#ad8985] font font-semibold">
                          @{item.price}
                        </span>
                        <span className="text-[#87635a] font-semibold">
                          ${item.totalPrice}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.name)}
                      className="size-4 bg-none border border-[#ad8985] rounded-full flex items-center justify-center"
                    >
                      <img src={X} alt="remove icon" />
                    </button>
                  </div>
                ))
              : null}
          </div>

          <div className="flex item-center justify-between py-4 w-full">
            <span className="text-base text-[#ad8985]">Order total</span>
            <span className="text-2xl text-burnt-rose font-bold">
              $
              {globalOrder.reduce(
                (acummulator: number, currentObject: any) =>
                  acummulator + currentObject.totalPrice,
                0
              )}
            </span>
          </div>
          <div className=" flex items-center justify-center gap-2 bg-[#f4edeb] p-3 rounded-md">
            <img src={Carbon} alt="carbon icon" />
            <p className="text-[#ad8985] font-medium">
              This is a <span className="text-burnt-rose">carbon-neutral</span>{" "}
              delivery
            </p>
          </div>
          <button
            className="bg-redrose border-none rounded-[50px] py-3 text-white w-full my-4"
            onClick={handleOrder}
          >
            Confirm order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

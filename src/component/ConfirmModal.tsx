import React from "react";
import Mark from "../static/icon-order-confirmed.svg";
import { useSelector } from "react-redux";
import { Part } from "../store/mode";
import { useDispatch } from "react-redux";
import { orderAction } from "../store/slice";
const ConfirmModal: React.FC = () => {
  const orderData = useSelector((state: any) => state.cart.orderList);
  const dispatch = useDispatch()
  const  startNewOrder = ()=>{
    dispatch(orderAction.startNewOrder(orderData.length));
  }
  return (
    <div className="absolute left-0 top-0 flex items-center justify-center w-full h-full bg-[#1d2025e6] overflow-y-scroll">
      <div className="bg-white  absolute lg:relative top-24 rounded-xl w-full lg:w-[50%] p-6">
        <img src={Mark} alt="order confirmed icon" />
        <h3 className="text-burnt-rose text-3xl mt-4 font-bold">
          Order Confirmed
        </h3>
        <p className="text-[#ad8985] py-2">We hope you enjoy your food!</p>

        {orderData.length > 0 ? (
          <div className="flex flex-col bg-[#f4edeb] rounded-md p-4">
            {orderData.map((item: Part, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b-2 border-[#c9aea6]"
              >
                <div className="flex items-center gap-4 lg:gap-2">
                  <img
                    src={item.image.thumbnail}
                    alt={item.name}
                    className="rounded-md w-[20%]"
                  />
                  <div className="">
                    <h3 className="text-burnt-rose font-bold">{item.name}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-redrose font-semibold">
                        {item.quantity}x
                      </span>
                      <span className="font-semibold text-[#ad8985]">@ {item.price}</span>
                    </div>
                  </div>
                </div>
                <p className="font-bold text-xl text-burnt-rose">
                  ${item.totalPrice}
                </p>
              </div>
            ))}

            <div className="flex items-center p-4 justify-between">
              <span>Order total</span>
              <span className="text-2xl text-burnt-rose font-bold">
                $
                {orderData.reduce(
                  (acummulator: number, currentValue: Part) =>
                    acummulator + currentValue.totalPrice,
                  0
                )}
              </span>
            </div>
          </div>
        ) : null}

        <button onClick={startNewOrder} className="bg-redrose rounded-[50px] w-full mt-4 py-4 border-none text-base text-white">
          Start new order
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;

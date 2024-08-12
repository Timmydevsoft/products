import React, { useEffect } from "react";
import axios from "axios";
import cart from "../static/icon-add-to-cart.svg";
import { nanoid } from "nanoid";
import increase from "../static/icon-increment-quantity.svg";
import decrease from "../static/icon-decrement-quantity.svg";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../store/slice";
import { Prop, Part } from "../store/mode";

const ProductList: React.FC = () => {
  let initialScreen: number = window.innerWidth;

  const [screeen, setScreen] = React.useState<number>(initialScreen);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);
  const dispatch = useDispatch();
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("/data/data.json");

  //     dispatch(
  //       orderAction.updateStore(
  //         response.data.map((item: Prop) => {
  //           return {
  //             ...item,
  //             totalPrice: item.price,
  //             status: false,
  //             id: nanoid(),
  //             quantity: 1,
  //           };
  //         })
  //       )
  //     );
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setError(true);
  //   }
  // };

  const fetchData = () => {
    // try {
      axios.get("/data/data.json")
      .then((response=>{
        dispatch(
          orderAction.updateStore(
            response.data.map((item: Prop) => {
              return {
                ...item,
                totalPrice: item.price,
                status: false,
                id: nanoid(),
                quantity: 1,
              };
            })
          )
        );
        setLoading(false);
      }))
   .catch (err=>{
    console.log(err);
    setError(err);
   }) 
  };


  useEffect(
    () => () => {
      fetchData();
    },[]
  );

  const dataBase = useSelector((state: any) => state.cart.dataBase);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screen]);

  if (loading) {
    return <div> Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handleIncrement = (id: string) => {
    dispatch(orderAction.increment(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(orderAction.reduceOrderQuantity(id));
  };

  const handleCart = (id: string) => {
    dispatch(orderAction.addOrder(id));
  };

  return (
    <div className="w-[100%] lg:w-[70%] overflow-y-scroll scroll">
      <h1 className="text-black text-3xl font-bold">Desserts</h1>
      {dataBase.length > 0 ? (
      <div className="container w-full">
        <div className="flex flex-col lg:flex-row items-center gap-4 flex-wrap w-[100%]">
          {dataBase.map((item: Part, index: number) => {
            return (
              <div key={index} className="w-[100%] lg:w-[32%]">
                <div className="rounded-md w-[100%] h-[100%] py-4">
                  <img
                    className={`rounded-md w-full ${
                      item.status === true ? "active-product" : ""
                    }`}
                    src={
                      screeen <= 500
                        ? item.image.mobile
                        : screeen <= 768
                        ? item.image.tablet
                        : item.image.desktop
                    }
                    alt={`${item.name} image`}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <div className="relative w-full flex justify-center">
                    {!item.status ? (
                      <button
                        className="absolute -top-10 flex items-center justify-center gap-2 bg-white py-2 px-6 rounded-[50px] border border-burnt-rose text-base text-burnt-rose font-bold w-auto"
                        onClick={() => {
                          handleCart(item.id);
                        }}
                      >
                        {" "}
                        <img src={cart} alt="cart icon" /> {""}Add to cart
                      </button>
                    ) : (
                      <div className="absolute -top-10 flex bg-redrose items-center justify-between px-4 py-2 w-[150px] rounded-full">
                        <button
                          onClick={() => {
                            handleDecrement(item.id);
                          }}
                          className="flex items-center justify-center  bg-redrose font-bold rounded-[50%] w-[20px] h-[20px] border border-rose-50"
                        >
                          <img src={decrease} alt="decrement icon" />
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => {
                            handleIncrement(item.id);
                          }}
                          className="flex items-center justify-center  bg-redrose font-bold rounded-[50%] w-[20px] h-[20px] border border-rose-50"
                        >
                          <img src={increase} alt="increment icon" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 lg:mt-[2.5rem]">
                  <p className="text-base text-[#ad8985] font-medium">
                    {item.category}
                  </p>
                  <p className="text-base text-burnt-rose font-bold">
                    {item.name}
                  </p>
                  <p className="text-base text-redrose font-medium">
                    ${item.price}.00
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      // 
      ) : null} 
    </div>
  );
};

export default ProductList;

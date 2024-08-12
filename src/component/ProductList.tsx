import React, { useEffect } from "react";
import axios from "axios";
// import cart from "../static/icon-add-to-cart.svg";
import { nanoid } from "nanoid";
// import increase from "../static/icon-increment-quantity.svg";
// import decrease from "../static/icon-decrement-quantity.svg";
import "../index.css";
import { useDispatch, useSelector } from "react-redux";
import { orderAction } from "../store/slice";
import { Prop, /*Part*/ } from "../store/mode";

const ProductList: React.FC = () => {
  let initialScreen: number = window.innerWidth;
  const [screeen, setScreen] = React.useState<number>(initialScreen);
  const [error, setError] = React.useState<any>(null);
  const dispatch = useDispatch();
  const dataBase = useSelector((state:any)=> state.cart.dataBase);
  const status = useSelector((state:any)=>state.cart.status);
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

  useEffect(
    () => () => {
      const fetchData = () => {
        dispatch(orderAction.fetchStart());
        axios
          .get("/data/data.json")
          .then((response) => {
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
          })

          .catch((err) => {
            setError(err);
            dispatch(orderAction.fetchFailure())
          });
      };

      fetchData(); 
    },
    [dispatch]
  );

  console.log(dataBase);

  // console.log("working");

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screeen]);
  if(status === "loading"){
    return(
      <div>Loading...</div>
    )
  }

  if(status === "failed"){
    return(
      <div >Failed</div>
    )
  }

  if (error) {
    return <div>{error}</div>;
  }

  // const handleIncrement = (id: string) => {
  //   dispatch(orderAction.increment(id));
  // };

  // const handleDecrement = (id: string) => {
  //   dispatch(orderAction.reduceOrderQuantity(id));
  // };

  // const handleCart = (id: string) => {
  //   dispatch(orderAction.addOrder(id));
  // };

  return (
    <div className="w-[100%] lg:w-[70%] overflow-y-scroll scroll">
      <h1 className="text-black text-3xl font-bold">Desserts</h1>
      <div className="text-red-500 text-3xl">Rendered</div>
      <div className="text-red-500 text-3xl">Rendered</div>
      <div className="text-red-500 text-3xl">Rendered</div>
      <div className="text-red-500 text-3xl">Rendered</div>
      <div className="text-red-500 text-3xl">Rendered</div>
      <div className="text-red-500 text-3xl">Rendered</div>
     

     
     
    </div>
  );
};

export default ProductList;

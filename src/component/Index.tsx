import React from "react";
import ProductList from "./ProductList";
// import Cart from "./Cart";
import "../index.css";
import ConfirmModal from "./ConfirmModal";
import { useSelector } from "react-redux";

const Index: React.FC = () => {
  const openConfirmModal = useSelector((state: any) => state.cart.openModal);
  return (
    <div className="flex flex-col relative lg:flex-row lg:gap-[2%] w-full px-[5%] py-[2rem] h-full lg:overflow-y-hidden">
      <ProductList />
      <div className="w-full lg:w-[30%] h-auto pb-6 lg:h-full lg:overflow-y-scroll scroll">
        {/* <Cart /> */}
      </div>
      {openConfirmModal ? <ConfirmModal /> : null}
    </div>
  );
};

export default Index;

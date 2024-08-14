import { createSlice } from "@reduxjs/toolkit";
import { Part } from "./mode";
import data from "./data.json"
import { nanoid } from "nanoid";

const initialState = {
  dataBase: data.map((item)=>{
    return{
      ...item,
      totalPrice: item.price,
      status: false,
      id: nanoid(),
      quantity: 1,
    }
  }),
  orderList: [] as Part[],
  openModal: false,
  reset: false,
  status: "Idle"
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateStore(state, action) {
      state.dataBase = action.payload;
      state.status = "success"
    },
    fetchStart(state){
      state.status = "loading";
    },
    fetchFailure(state){
      state.status = "failed";
    },
    addOrder(state, action) {
      const newOrder = state.dataBase.find(
        (item) => item.id === action.payload
      );
      if (newOrder) {
        newOrder.status = true;
        state.orderList.push(newOrder);
      }
    },
    increment(state, action) {
      const item = state.orderList.find((item) => item.id === action.payload);
      const globalItem = state.dataBase.find(
        (item) => item.id === action.payload
      );
      if (item && globalItem) {
        globalItem.quantity += 1;
        item.quantity += 1;
        item.totalPrice = item.totalPrice + item.price;
      }
    },
    reduceOrderQuantity(state, action) {
      const item = state.orderList.find((item) => item.id === action.payload);
      const globalItem = state.dataBase.find(
        (item) => item.id === action.payload
      );

      if (item && globalItem) {
        if (item.totalPrice === item.price && globalItem.quantity === 1) {
          globalItem.quantity = 1;
          item.quantity = 1;
          item.totalPrice = item.totalPrice;
        } else {
          globalItem.quantity -= 1;
          item.quantity -= 1;
          item.totalPrice = item.totalPrice - item.price;
        }
      }
    },
    removeFromCart(state, action) {
      const name = action.payload;
      const itemToRemove = state.orderList.find(
        (product) => product.name === name
      );
      const globalItemRemoved = state.dataBase.find(
        (item) => item.name === name
      );
      if (itemToRemove && globalItemRemoved) {
        globalItemRemoved.status = false;
        globalItemRemoved.quantity = 1;
        let index = state.orderList.indexOf(itemToRemove);
        state.orderList.splice(index, 1);
      }
    },
    controlModal(state) {
      state.openModal = !state.openModal;
    },
    startNewOrder(state, action) {
      state.orderList.splice(0, action.payload);
      state.openModal = !state.openModal;
      state.dataBase.map((item) => (item.status = false));
    },
  },
});

export const orderAction = productSlice.actions;
export default productSlice;

import { createSlice, configureStore } from "@reduxjs/toolkit";

async function isLoggedIn() {
  const data = await fetch("/loginState")
  //   .then(function (res) {
  //   return res.json();
  // }).then(async function (json) {
  //   console.log(json);
  // })
  return await data.text();
  // show(finalData);
};

var d;

async function main() {
  const t = await isLoggedIn();
  d = JSON.parse(t);
  console.log(d);
} 

main();

const stateObject = {
  isLoggedIn: false,
};

const loginStateSlice = createSlice({
  name: "isLoggedIn",
  initialState: stateObject,
  reducers: {
    check(state) {
      state.isLoggedIn = d;
    },
  },
});

export const loginStateActions = loginStateSlice.actions;

export default loginStateSlice;

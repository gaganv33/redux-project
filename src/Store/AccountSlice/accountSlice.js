import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   balance: 0,
   loan: 0,
   loanPurpose: "",
   isLoading: false,
};

const accountSlice = createSlice({
   name: "account",
   initialState,
   reducers: {
      deposit(state, action){
         state.balance += action.payload;
         state.isLoading = false;
      },
      withdraw(state, action){
         if(state.balance >= action.payload){
            state.balance -= action.payload;
         }
      },
      requestLoan: {
         prepare(amount, purpose){
            return {
               payload: {
                  amount, purpose,
               },
            };
         },
         reducer(state, action){
            if(state.loan > 0){
               return;
            }
            state.loan += action.payload.amount;
            state.balance += action.payload.amount;
            state.loanPurpose = action.payload.purpose;
         },
      },
      replayLoan(state){
         if(state.loan > state.balance){
            return;
         }
         state.balance -= state.loan;
         state.loan = 0;
         state.loanPurpose = "";
      },
      currencyConverting(state){
         state.isLoading = true;
      },
   },
});

export const { withdraw, requestLoan, replayLoan, currencyConverting } = accountSlice.actions;

export function deposit(amount, currency){
   if(currency === "USD"){
      return { type: "account/deposit", payload: amount };
   }
   
   return async function (dispatch, getState){
      try{
         dispatch({ type: "account/currencyConverting" });
         const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
         const data = await res.json();
         const convertedAmount = data.rates.USD;
         dispatch({ type: "account/deposit", payload: convertedAmount });
      }
      catch(Error){
         dispatch({ type: "account/error", payload: getState.balance });
      }
   }
}

export default  accountSlice.reducer;

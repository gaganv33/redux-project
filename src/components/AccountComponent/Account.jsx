import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Account.module.css";
import { deposit, withdraw, requestLoan, replayLoan } from "../../Store/AccountSlice/accountSlice";

export default function Account(){
   const [state, setState] = useState({
      deposit: 0,
      withdraw: 0,
      currency: "USD",
      loanAmount: 0,
      loanPurpose: "",
   });

   const dispatch = useDispatch();

   const account = useSelector((store) => {
      return store.account;
   });
   const customer = useSelector((store) => {
      return store.customer;
   })
   
   function handleDeposit(){
      if(state.deposit === 0){
         return;
      }
      dispatch(deposit(state.deposit, state.currency));
      setState((state) => {
         return {
            ...state, deposit: 0, currency: "USD",
         };
      });
   }

   function handleWithdraw(){
      if(state.withdraw === 0){
         return;
      }
      dispatch(withdraw(state.withdraw));
      setState((state) => {
         return {
            ...state, withdraw: 0,
         };
      });
   }

   function handleRequestLoan(){
      if(state.loanAmount === 0){
         return;
      }
      dispatch(requestLoan(state.loanAmount));
      setState((state) => {
         return {
            ...state, loanAmount: 0, loanPurpose: ""
         };
      });
   }

   function handleRepayLoan(){
      dispatch(replayLoan());
   }   

   return (
      <>
         {
            customer.fullName !== "" && (
               <div className={styles.account}>
                  <h2>Account Operations</h2>
                  <div className={styles.twoColumn}>
                     <h3>Welcome, {customer.fullName}</h3>
                     <h3>${Math.round(account.balance)}</h3>
                  </div>
                  <div className={styles.fourColumn}>
                     <label>Deposit</label>
                     <input type="text" placeholder="Deposit" value={Number(state.deposit) ? Number(state.deposit) : ""}
                     onChange={(e) => setState((values) => {
                        return {
                           ...values, deposit: Number(e.target.value)
                        }
                     })} disabled={account.isLoading} />
                     <select value={state.currency} onChange={(e) => {
                        setState((values) => {
                           return {
                              ...values, currency: e.target.value,
                           };
                        });
                     }} disabled={account.isLoading}>
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                     </select>
                     <button onClick={() => handleDeposit()} disabled={account.isLoading}>Depsit</button>  
                  </div>
                  <div className={styles.threeColumn}>
                     <label>Withdraw</label>
                     <input type="text" placeholder="Withdraw" value={Number(state.withdraw) ? Number(state.withdraw) : ""} 
                     onChange={(e) => {
                        setState((values) => {
                           return {
                              ...values, withdraw: Number(e.target.value)
                           };
                        });
                     }} />
                     <button onClick={() => handleWithdraw()}>Withdraw</button>
                  </div>
                  <div className={styles.fourColumn}>
                     <label>Request Loan</label>
                     <input type="text" placeholder="Loan Amount" value={Number(state.loanAmount) ? Number(state.loanAmount) : ""} 
                     onChange={(e) => {
                        setState((values) => {
                           return {
                              ...values, loanAmount: Number(e.target.value),
                           };
                        });
                     }} />
                     <input type="text" placeholder="Loan Purpose" value={state.loanPurpose} onChange={(e) => {
                        setState((values) => {
                           return {
                              ...values, loanPurpose: e.target.value,
                           };
                        });
                     }} />
                     <button onClick={() => handleRequestLoan()}>Request Loan</button>
                  </div>
                  {
                     account.loan > 0 && (
                        <div className={styles.twoColumn}>
                           <span>Repay Loan Amount ${account.loan} ${account.loanPurpose}</span>
                           <button onClick={() => handleRepayLoan()}>Repay</button>
                        </div>
                     )
                  }
               </div>
            )
         }
      </>
   );
}

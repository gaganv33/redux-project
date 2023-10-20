import { useState } from "react";
import styles from "./Customer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { createCustomer } from "../../Store/CustomerSlice/customerSlice";

export default function Customer(){
   const [state, setState] = useState({
      fullName: "",
      nationalID: "",
   });

   const customer = useSelector((store) => {
      return store.customer;
   })
   const dispatch = useDispatch();

   function handleOnClick(){
      if(state.fullName === "" || state.nationalID === ""){
         return;
      }
      dispatch(createCustomer(state.fullName, state.nationalID));
      setState((state) => {
         return {
            ...state, fullName: "", nationalID: "",
         };
      });
   }

   return (
         <>
            {
               customer.fullName === "" && (
                  <div className={styles.customer}>
                     <h2>Create a new Customer</h2>
                     <div className={styles.grid}>
                        <label>Customer Full Name</label>
                        <input type="text" placeholder="Enter full name" value={state.fullName} onChange={(e) => {
                           setState((values) => {
                              return {
                                 ...values, fullName: e.target.value,
                              }
                           });
                        }} />
                     </div>
                     <div className={styles.grid}>
                        <label>National ID</label>
                        <input type="text" placeholder="National ID" value={state.nationalID} onChange={(e) => {
                           setState((values) => {
                              return {
                                 ...values, nationalID: e.target.value,
                              }
                           })
                        }} />
                     </div>
                     <button className={styles.button} onClick={() => handleOnClick()}>Create a new customer</button>
                  </div>
               )
            }
         </>
   );
}

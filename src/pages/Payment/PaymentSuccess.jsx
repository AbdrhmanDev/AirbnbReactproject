import { useDispatch } from "react-redux";
import {  useSearchParams } from "react-router-dom";
import { PaymentExecuteThunk } from "../../services/Slice/Payment/ExecutePayment";
import { toast } from "react-toastify";
import IsLogout from "../../components/Payment/IsLogout";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const paymentId = searchParams.get('Paymentid') 
  const orderId = searchParams.get('token') 
  const handelPayment = async () => {
    try {
      if (!paymentId || !orderId) {
        console.error("Payment ID or order ID is missing");
        return;
      } else {
         const response = await dispatch(PaymentExecuteThunk({ orderId,paymentId }));
         console.log(response.payload);
        var logs= localStorage.setItem('statusPayment',response.payload.status)
        console.log(logs);
        
    //  payload   //  {message: 'Payment completed successfully', transactionId: '28H935431T618251S', status: 'completed', bookingStatus: 'completed'}

        if ( paymentId&&orderId) {
          alert("Payment Successful thanks ")
          window.close();
          toast.success('Payment successful');
        }
      }
    } catch (error) {
      console.error("Payment execution failed:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-bg-success mt-3">Payment Success</h1>
      <div className="d-flex flex-column align-items-lg-center">
      <p className="m-2  text-center">
      When you click Confirm Payment, an additional amount will be reserved from the hotel bill.
      </p>
      <button className="mb-3 m-auto text-light w-25 rounded-2 border-0 bg-success mt-3 px-3 py-2" onClick={handelPayment}>Confirm Payment</button>
      </div>
      
    </div>
  );
};

export default PaymentSuccess;
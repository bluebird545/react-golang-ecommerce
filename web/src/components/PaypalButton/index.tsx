import React, {useState, useRef, useEffect} from 'react';
import ReactDOM from "react-dom"


const PaypalButton = () => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState(null);
  const [sdkReady, setSdkReady] = useState(false);

  const paypalRef = useRef();

  const addPaypalSdk = () => {
    const clientID =
      'AVpBFataeQSDTdyD3pLvAN8hkTWU3ykhMx9VzwVh8zzhAl-z9nX2UNSGAQ4NXfdK91DaI6H0hBRtvHIu';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      console.log("here")
      addPaypalSdk();
    }
  }, []);

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  }

  const onApprove = (data: any, actions: any) => {
    setPaid(true);
    return actions.order.capture();
  }

  if (!sdkReady && window.paypal === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  const Paypal = window.paypal.Buttons.driver("react", { React, ReactDOM });

  return(
    <div>
      <Paypal
        createOrder={(data: any, actions: any) => createOrder(data, actions)}
        onApprove={(data: any, actions: any) => onApprove(data, actions)}
        // onError={() => setError()}
      />
    </div>
  );
};
export default PaypalButton;

// class PaypalButton extends React.Component {
//   render() {
//     return(
//       <div></div>
//     );
//   }
// }
import { Button } from "@mantine/core";
import React from "react";

function Complete({ invoiceUrl, selectedPaymentMethod, lng }) {
  return (
    <div className="completed__screen">
      <img src="/images/success.png" alt="success" />
      <h2>Order Successfully Completed!</h2>
      <p>
        Thank you for your order. We appreciate your business and hope you have
        a great experience with our service.
      </p>
      {invoiceUrl && selectedPaymentMethod !== "Cash" && (
        <Button component="a" href={invoiceUrl} size="lg" variant="outline">
          View Order Confirmation
        </Button>
      )}
    </div>
  );
}

export default Complete;

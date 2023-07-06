import { toast } from "react-toastify";
import { sendPostRequest } from "../../helper/sendPostRquest";
import { sendRequest } from "../../helper/sendRequest";

export const validateStep = async (
  active,
  formData,
  setError,
  userDetailsForm,
  setFormData,
  setInvoiceUrl
) => {
  switch (active) {
    case 0:
      if (!formData?.selectedVehicle?.vehicletype) {
        setError("Please select a vehicle");
        return false;
      }
      return true;
      break;
    case 1:
      if (!formData?.selectedPackageId) {
        setError("Please select a package");
        return false;
      }
      return true;
      break;
    case 3:
      if (
        !formData?.scheduledDate?.hour ||
        !formData?.scheduledDate?.fullDate
      ) {
        setError("Please schedule a date and hour");
        return false;
      }
      return true;
      break;
    case 4:
      if (!formData.selectedPaymentMethod) {
        setError("Please select a payment method");
        return false;
      }
      return await new Promise((resolve, reject) =>
        userDetailsForm.onSubmit(
          async (values) => {
            const bookingData = {
              vehicletype: formData.selectedVehicle?.vehicletype,
              packageId: formData.selectedPackageId,
              extraservicesId: formData.extraservicesId,
              firstname: values?.firstName,
              lastname: values?.lastName,
              phonenumber: values?.phoneNumber,
              area: values?.area,
              block: values?.block,
              avenue: values?.avenue,
              street: values?.street,
              house: values?.house,
              bookingDateTime: formData.scheduledDate?.fullDate,
            };

            const response = await sendPostRequest(
              `${process.env.REACT_APP_BASE_URL}/api/booking/bookings`,
              bookingData
            );

            if (!response.success) {
              setError("Booking Failed!, Please try again");
              resolve(false);
            }

            if (
              response.newBooking &&
              formData.selectedPaymentMethod !== "Cash"
            ) {
              const transaction = await sendPostRequest(
                `${process.env.REACT_APP_BASE_URL}/api/transaction/${response?.newBooking?._id}`,
                bookingData
              );

              if (transaction.success) {
                const parsedResponse = JSON.parse(transaction.response);
                setInvoiceUrl(parsedResponse.Data.Do_TxnHdr[0].InvcURl);

                const API_URL = `${process.env.REACT_APP_BASE_URL}/api/booking/${response?.newBooking?._id}`;
                try {
                  await sendRequest({
                    url: API_URL,
                    method: "PUT",
                    body: {
                      agentId: formData?.selectedAgentId,
                    },
                  });
                  resolve(true);
                } catch (error) {
                  toast.error(
                    "Failed Assigning agent to booking!, Please assign it manually from booking page"
                  );
                  setError(
                    "Failed Assigning agent to booking!, Please assign it manually from booking page"
                  );
                  resolve(true);
                }
              } else {
                toast.error("Generating Invoice Failed!");
                setError("Generating Invoice Failed!");
                resolve(false);
              }
            }

            setFormData((prev) => ({ ...prev, userDetails: values }));
            resolve(true);
          },
          () => {
            setError("Please fill all the required fields");
            resolve(false);
          }
        )()
      );

      return false;
      break;
    default:
      return true;
  }
  return true;
};

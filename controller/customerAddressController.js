import CustomerAddress from "../model/customerAddressSchema.js";
import { CustomerNotFoundException } from "../errors/error.js";

export const updateCustomerAddress = async (req, res, next) => {
  try {
    const { unique_id_number } = req.params;
    const { address, pincode, city, state } = req.body;

    if (address && address.length > 25) {
      return res.status(400).json({
        message: "Address should be maximum of 25 characters",
      });
    }

    if (pincode && !/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        message: "Pin should be 6 digit number",
      });
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if ((city && !nameRegex.test(city)) || (state && !nameRegex.test(state))) {
      return res.status(400).json({
        message:
          "City/State should not contain any special characters except space",
      });
    }

    let customerAddress = await CustomerAddress.findOne({ unique_id_number });

    if (!customerAddress) {
      const err = new CustomerNotFoundException("Customer Not Found message");
      err.statusCode = 404;
      throw err;
    }

    if (address) customerAddress.address = address;
    if (pincode) customerAddress.pincode = pincode;
    if (city) customerAddress.city = city;
    if (state) customerAddress.state = state;

    await customerAddress.save();

    return res.status(200).json({
      success: true,
      message: "Customer address updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

import Customer from "../model/customerSchema.js";
import { InvalidEmailException } from "../errors/error.js";

export const validateCustomerPersonalDetails = async (req, res, next) => {
  try {
    const { first_name, last_name, confirm_email } = req.body;

    if (!first_name || !last_name || !confirm_email) {
      return res.status(400).json({
        error: "Firstname, Lastname and confirm email are required",
      });
    }

    const nameRegex = /^[A-Za-z]{1,15}$/;
    if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
      return res.status(400).json({
        error: "Firstname/Lastname should be a maximum of 15 characters",
      });
    }

    const customer = await Customer.findOne({
      first_name,
      last_name,
    });

    if (!customer) {
      return res.status(404).json({
        message: "No customer found for the provided details",
      });
    }

    if (customer.email_address !== confirm_email) {
      const err = new InvalidEmailException("Invalid email details!!");
      err.statusCode = 404;
      throw err;
    }

    // Success
    return res.status(200).json({
      success: true,
      message: "Customer personal details validated successfully",
    });
  } catch (err) {
    next(err);
  }
};

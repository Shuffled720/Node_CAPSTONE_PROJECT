import Customer from "../model/customerSchema.js";
import { DetailsDoesnNotExist } from "../errors/error.js";

export const validateCustomer = async (req, res, next) => {
  try {
    const { email_address, date_of_birth } = req.body;
    const email = email_address;
    const dob = date_of_birth;

    if (!email || !dob) {
      return res.status(400).json({ message: "Email/dob value is required" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return res
        .status(400)
        .json({ error: "Invalid dob format, Please use yyyy-mm-dd" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const customer = await Customer.findOne({
      email_address: email,
      date_of_birth: dob,
    });
    if (!customer) {
      const err = new DetailsDoesnNotExist(
        "Invalid Customer! This Customer doesnot exist"
      );
      err.statusCode = 404;
      throw err;
    }

    return res.status(200).json({
      success: true,
      message: "Customer details validated successfully",
    });
  } catch (err) {
    next(err);
  }
};

import CustomerDetails from "../model/customerSchema.js";
import SimDetails from "../model/simDetailsSchema.js";
import { CustomerNotFoundException } from "../errors/error.js";

export const validateIdProof = async (req, res, next) => {
  try {
    const { aadhar_number, first_name, last_name, dob, unique_id_number } =
      req.body;

    if (!aadhar_number || !first_name || !last_name || !dob) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    if (!/^\d{15}$/.test(aadhar_number)) {
      return res.status(400).json({ message: "Id should be 16 digits" });
    }

    const nameRegex = /^[A-Za-z]{1,15}$/;
    if (
      !nameRegex.test(first_name) ||
      !nameRegex.test(last_name) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dob)
    ) {
      return res.status(400).json({ message: "Invalid details" });
    }

    const customer = await CustomerDetails.findOne({
      unique_id_number: aadhar_number,
    });
    if (!customer) {
      const err = new CustomerNotFoundException("Customer Not Found message");
      err.statusCode = 404;
      throw err;
    }

    const dbDob = new Date(customer.date_of_birth).toISOString().split("T")[0];

    if (
      customer.unique_id_number !== aadhar_number ||
      customer.first_name !== first_name ||
      customer.last_name !== last_name ||
      dbDob !== dob
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid details-Enter the first name and last name, date of birth in yyyy-mm-dd",
        });
    }

    const sim = await SimDetails.findOne({ unique_id_number });
    if (!sim) {
      return res.status(404).json({ message: "SIM record not found" });
    }

    sim.sim_status = "active";
    await sim.save();

    return res.status(200).json({
      success: true,
      message: "Valid Customer! SIM activated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

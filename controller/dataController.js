import SimDetails from "../model/simDetailsSchema.js";
import SimOffer from "../model/simOfferSchema.js";
import CustomerAddress from "../model/customerAddressSchema.js";
import Customer from "../model/customerSchema.js";
import CustomerIdentity from "../model/customerIdentitySchema.js";

export async function addSimDetails(req, res) {
  try {
    const { service_number, sim_number, sim_status } = req.body;

    const newSimDetails = new SimDetails({
      service_number,
      sim_number,
      sim_status,
    });
    const sim = await newSimDetails.save();

    res.status(201).json(sim);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addSimOffer(req, res) {
  try {
    const { call_qty, cost, data_qty, duration, offer_name, sim_id } = req.body;

    const newSimOffer = new SimOffer({
      call_qty,
      cost,
      data_qty,
      duration,
      offer_name,
      sim_id,
    });
    const offer = await newSimOffer.save();

    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addCustomerAddress(req, res) {
  try {
    const { address, city, pincode, state, unique_id_number } = req.body;

    const newCustomerAddress = new CustomerAddress({
      address,
      city,
      pincode,
      state,
      unique_id_number,
    });
    const savedAddress = await newCustomerAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addCustomer(req, res) {
  try {
    const {
      unique_id_number,
      date_of_birth,
      email_address,
      first_name,
      last_name,
      id_type,
      customer_addressid,
      sim_id,
      state,
    } = req.body;

    const newCustomer = new Customer({
      unique_id_number,
      date_of_birth,
      email_address,
      first_name,
      last_name,
      id_type,
      customer_addressid,
      sim_id,
      state,
    });

    const customer = await newCustomer.save();

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function addCustomerIdentity(req, res) {
  try {
    const {
      unique_id_number,
      date_of_birth,
      first_name,
      last_name,
      email_address,
      state,
    } = req.body;

    const newCustomerIdentity = new CustomerIdentity({
      unique_id_number,
      date_of_birth,
      first_name,
      last_name,
      email_address,
      state,
    });

    const identity = await newCustomerIdentity.save();

    res.status(201).json(identity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

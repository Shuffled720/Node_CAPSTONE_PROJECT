import { Router } from "express";
const router = Router();

import {
  addSimDetails,
  addSimOffer,
  addCustomerAddress,
  addCustomer,
  addCustomerIdentity,
} from "./controller/dataController.js";

import { validateSim } from "./controller/simController.js";
import { validateCustomer } from "./controller/customerController.js";
import { validateCustomerPersonalDetails } from "./controller/customerPersonalController.js";
import { updateCustomerAddress } from "./controller/customerAddressController.js";
import { validateIdProof } from "./controller/idProofController.js";
//ading data
router.post("/data/sim-details", addSimDetails);
router.post("/data/sim-offers", addSimOffer);
router.post("/data/customer-address", addCustomerAddress);
router.post("/data/customer", addCustomer);
router.post("/data/customer-identity", addCustomerIdentity);

//1
router.post("/validate-sim", validateSim);

//2
router.post("/validate-customer", validateCustomer);

//3
router.post(
  "/validate-customer-personal-details",
  validateCustomerPersonalDetails
);

//4
router.put("/update-customer-address/:unique_id_number", updateCustomerAddress);

//5
router.post("/validate-id-proof", validateIdProof);

export default router;

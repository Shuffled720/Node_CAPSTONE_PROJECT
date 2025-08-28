import SimDetails from "../model/simDetailsSchema.js";
import SimOffer from "../model/simOfferSchema.js";
import { InvalidDetailsException } from "../errors/error.js";

export const validateSim = async (req, res, next) => {
  try {
    const { sim_number, service_number } = req.body;

    if (!sim_number || !service_number) {
      throw new InvalidDetailsException(
        "SIM number and Service number are required."
      );
    }

    if (!/^\d{12}$/.test(sim_number) || !/^\d{10}$/.test(service_number)) {
      throw new InvalidDetailsException(
        "Invalid details, please check again Subscriber Identity Module (SIM)number/Service number!"
      );
    }

    const sim = await SimDetails.findOne({ sim_number, service_number });
    if (!sim) {
      throw new InvalidDetailsException(
        "Invalid details, please check again Subscriber Identity Module (SIM)number/Service number!"
      );
    }

    if (sim.sim_status === "active") {
      return res
        .status(200)
        .json({ message: "Subscriber Identity Module (SIM) already active" });
    }

    const offers = await SimOffer.findOne({ sim_id: sim.sim_id });
    if (!offers) {
      return res.status(200).json({
        message: "No offers available for this SIM",
      });
    }

    const formattedOffer = `${offers.call_qty} calls + ${offers.data_qty} GB for Rs.${offers.cost}, Validity: ${offers.duration} days.`;

    return res.status(200).json({
      success: true,
      data: formattedOffer,
    });
  } catch (err) {
    next(err);
  }
};

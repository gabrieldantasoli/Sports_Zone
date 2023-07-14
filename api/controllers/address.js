import Address from "../models/user/Address.js";


export const createUSerAddress = async (req, res, next) => {
    try {
  
      const newAddress = new Address({
        ...req.body,
      });
  
      await newAddress.save();
      res.status(200).send("Address has been created.");
    } catch (err) {
      next(err);
    }
};

export const updateUserAddress = async (req, res, next) => {
    try {
        const updateUerAddress = await Address.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        Address.fin
        res.status(200).json(updateUerAddress);
    } catch (err) {
        next(err);
    }
}

export const deleteUserAddress = async (req, res , next) => {
    try {
        await Address.findByIdAndDelete(req.params.id);
        res.status(200).json("Address has been deleted!")
    } catch (err) {
        next(err);
    }
}

export const getUserAddresses = async (req, res, next) => {
    try {
        const addresses = await Address.find({"user": req.params.id}).lean();
        res.status(200).json(addresses);
    } catch (err) {
        next(err);
    }
};

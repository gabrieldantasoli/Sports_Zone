import Shopping from "../models/product/Shoping.js";
import ShoppingProduct from "../models/product/ShoppingProduct.js";


export const createShopping = async (req, res, next) => {
    try {
  
      const newShopping = new Shopping({
        ...req.body,
      });
  
      const savedShopping = await newShopping.save();
      res.status(200).json(savedShopping);
    } catch (err) {
      next(err);
    }
};

export const deleteShopping = async (req, res, next) => {
  try {
    await Shopping.findByIdAndDelete(req.params.id);
    res.status(200).send("Shopping has been deleted!");
  } catch (err) {
    next(err);
  }
};

export const createShoppingProduct = async (req, res, next) => {
    try {
  
      const newShoppingProduct = new ShoppingProduct({
        ...req.body,
      });
  
      await newShoppingProduct.save();
      res.status(200).send("Shopping product has been added in cart.");
    } catch (err) {
      next(err);
    }
};

export const getShoppings = async (req, res, next) => {
    try {
        // const shoppings = await Shopping.find().lean();
        const shoppings = await Shopping.find({"user": req.params.id});
        res.status(200).json(shoppings);
    } catch (err) {
        next(err);
    }
};

export const getShoppingProducts = async (req, res, next) => {
    try {
        const shoppingsProducts = await ShoppingProduct.find({"shopping": req.params.id});
        res.status(200).json(shoppingsProducts);
    } catch (err) {
        next(err);
    }
};
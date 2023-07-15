import CartProduct from "../models/user/CartProduct.js";


export const createCartProduct = async (req, res, next) => {
    try {
  
      const newCartProduct = new CartProduct({
        ...req.body,
      });
  
      await newCartProduct.save();
      res.status(200).send("Product has been added in cart.");
    } catch (err) {
      next(err);
    }
};

export const updateCartProduct = async (req, res, next) => {
    try {
        const updateCartProduct = await CartProduct.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateCartProduct);
    } catch (err) {
        next(err);
    }
}

export const deleteCartProduct = async (req, res , next) => {
    try {
        await CartProduct.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart product has been deleted!")
    } catch (err) {
        next(err);
    }
}

export const getCartProducts = async (req, res, next) => {
    try {
        const cartProducts = await CartProduct.find({"user": req.params.id}).lean();
        res.status(200).json(cartProducts);
    } catch (err) {
        next(err);
    }
};

export const getCartProduct = async (req, res, next) => {
    try {
        const cartProduct = await CartProduct.find({"user": req.params.id, "product_id": req.params.productid});
        res.status(200).json(cartProduct);
    } catch (err) {
        next(err);
    }
};
import Product from "../../models/product/Product.js";

export const updateProduct = async (req, res, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateProduct);
    } catch (err) {
        next(err);
    }
}

export const createProduct = async (req, res, next) => {
    try {
      const newProduct = new Product({
        ...req.body,
      });
      await newProduct.save();
      res.status(200).send("Product has been created.");
    } catch (err) {
      next(err);
    }
};

export const getProducts = async (req, res, next) => {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (err) {
      next(err);
    }
}

export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

export const deleteProduct = async (req, res, next) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted!");
    } catch (err) {
      next(err);
    }
}
import Category from "../../models/product/Category.js";

export const updateCategory = async (req, res, next) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateCategory);
    } catch (err) {
        next(err);
    }
}

export const createCategory = async (req, res, next) => {
    try {
      const newCategory = new Category({
        ...req.body,
      });
      await newCategory.save();
      res.status(200).send("Category has been created.");
    } catch (err) {
      next(err);
    }
};

export const getCategorys = async (req, res, next) => {
    try {
      const categorys = await Category.find();
      res.status(200).send(categorys);
    } catch (err) {
      next(err);
    }
}
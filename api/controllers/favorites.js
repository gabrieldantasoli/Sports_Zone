import Favorite from "../models/user/Favorites.js";


export const createFavoriteProduct = async (req, res, next) => {
    try {
  
      const newFavoriteProduct = new Favorite({
        ...req.body,
      });
  
      await newFavoriteProduct.save();
      res.status(200).send("Product has been Favorited!");
    } catch (err) {
      next(err);
    }
};

export const deleteFavoriteProduct = async (req, res , next) => {
    try {
        await Favorite.findOneAndDelete({"user": req.params.id, "product_id": req.params.pi});
        res.status(200).json("Product has been Unfavorited!")
    } catch (err) {
        next(err);
    }
}

export const getFavoriteProducts = async (req, res, next) => {
    try {
        const cartProducts = await Favorite.find({"user": req.params.id}).lean();
        res.status(200).json(cartProducts);
    } catch (err) {
        next(err);
    }
};
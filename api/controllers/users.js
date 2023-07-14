import User from "../models/user/User.js";
import Views from "../models/user/Views.js";

export const updateUser = async (req, res, next) => {
    try {
        const updateUSer = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUSer);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async (req, res , next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted!")
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

export const getUsers = async (req, res, next) => {
    try {
        const users = User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}


// View Functions

export const updateUserViews = async (req, res, next) => {
    try {
        const updateUSerViews = await Views.updateOne({user: req.params.id},{ $set: req.body },
            { new: true });
        res.status(200).json(updateUSerViews);
    } catch (err) {
        next(err);
    }
}

export const createUSerViews = async (req, res, next) => {
    try {
      const newView = new Views({
        ...req.body,
      });
  
      await newView.save();
      res.status(200).send("User views has been created.");
    } catch (err) {
      next(err);
    }
};

export const getUserViews = async (req, res, next) => {
    try {
        const views = await Views.find({user: req.params.id});
        res.status(200).json(views);
    } catch (err) {
        next(err);
    }
}
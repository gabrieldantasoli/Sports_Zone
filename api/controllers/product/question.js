import Question from "../../models/product/Question.js";

export const createQuestion = async (req, res, next) => {
    try {
    const newQuestion = new Question({
        ...req.body,
      });
      await newQuestion.save();
      res.status(200).send("Question has been created.");
    } catch (err) {
      next(err);
    }
};

export const getQuestions = async (req, res, next) => {
    try {
      const questions = await Question.find({ product_id: req.params.id});
      res.status(200).send(questions);
    } catch (err) {
      next(err);
    }
}

export const getQuestionsRegex = async (req, res, next) => {
  try {
    const { substring, id } = req.params;
    const questions = await Question.find({ message: { $regex: substring }, product_id: id});
    res.status(200).send(questions);
  } catch (err) {
    next(err);
  }
}

// db.collection.find({ seuCampo: { $regex: searchTerm } });
import Answer from "../../models/product/Answer.js";

export const createAnswer = async (req, res, next) => {
    try {
        const newAnswer = new Answer({
        ...req.body,
      });
      await newAnswer.save();
      res.status(200).send("Question has been created.");
    } catch (err) {
      next(err);
    }
};

export const getAnswers = async (req, res, next) => {
    try {
      const answers = await Answer.find({ question_id: req.params.id});
      res.status(200).send(answers);
    } catch (err) {
      next(err);
    }
}

  
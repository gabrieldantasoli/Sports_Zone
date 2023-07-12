import Assessment from "../../models/product/Assessment.js";

export const createAssessment = async (req, res, next) => {
    try {
        const newAssessment = new Assessment({
        ...req.body,
      });
      await newAssessment.save();
      res.status(200).send("Assessment has been created.");
    } catch (err) {
      next(err);
    }
};

export const getAssessments = async (req, res, next) => {
    try {
      const assessments = await Assessment.find({ product_id: req.params.id});
      res.status(200).send(assessments);
    } catch (err) {
      next(err);
    }
}

  
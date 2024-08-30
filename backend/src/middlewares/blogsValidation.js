import Joi from "joi";

const blogsValidation = (req, res, next) => {
  const schema = Joi.object({
    uid: Joi.string().required(),
    title: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(10).max(10000).required(),
    thumbnail: Joi.string().optional(), 
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Validation Error", error: error.details[0].message });
  }
  next();
};

export default blogsValidation;

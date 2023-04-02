import { validationResult } from "express-validator";

export function checkValidationErrors (req, res, next) {
   const error = validationResult(req)
   if (!error.isEmpty()) {
      return res.status(400).json(error.array())
   }
   next()
}
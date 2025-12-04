import { body } from "express-validator";

export const registerUserValidator = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First name is required"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last name is required"),

  body("email")
    .trim()
    .isEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  
    
];

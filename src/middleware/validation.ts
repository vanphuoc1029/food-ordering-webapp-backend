import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Address Line 1 must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName")
    .isString()
    .notEmpty()
    .withMessage("Restaurant name must be a string"),

  body("city").isString().notEmpty().withMessage("City must be a string"),

  body("country").isString().notEmpty().withMessage("Country must be a string"),

  body("deliveryPrice")
    .isInt({ min: 0 })
    .notEmpty()
    .withMessage("Delivery price must be a positive number"),

  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .notEmpty()
    .withMessage("Estimate delivery time must be a postive number"),

  body("cuisines")
    .isArray()
    .withMessage("Cuisine must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisine array cannot be empty"),

  body("menuItems").isArray().withMessage("Menu items must be an array"),

  body("menuItems.*.name")
    .notEmpty()
    .withMessage("Menu item name cannot be empty"),
  body("menuItems.*.price")
    .isInt({ min: 0 })
    .withMessage("Item's price is required and must be a positive number"),
  handleValidationErrors,
];

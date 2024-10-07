const express = require('express');
const {store} = require('../repositories/business-repository');
const router = express.Router();
const { validateBusinessData } = require('../validators/business-validator'); 
// const db = require('../models');
// const Business = db.Business;
const responseFormatter = require("../utils/responser");
const {createBusiness} = require("../dtos/business");

router.post("/business", validateBusinessData, async (req, res) => {
  try {

    const user = await store(createBusiness(req.body));
    return responseFormatter(
      res,
      true,
      "Your business has been added successfully!",
      200
    )
    // const { uuid, name, abn, business_type, phone_number, personal_phone_number, address, suburb, state, pay_period, week_start, postcode, user_id } = req.body;

    // const newBusiness = await Business.create({
    //   uuid,
    //   name,
    //   abn,
    //   business_type,
    //   phone_number,
    //   personal_phone_number,
    //   address,
    //   suburb,
    //   state,
    //   pay_period,
    //   week_start,
    //   postcode,
    //   user_id
    // });

    // return res.status(201).json(newBusiness);
  } catch (error) {
    return responseFormatter(
      res,
      false,
      error?.message ?? "An error occurred while saving the business info.",
      "Internal server error !!",
      error?.code ?? 500,
      [error?.message] ?? ["An error occurred while saving the business info. "]
    );
  }
});

module.exports = router;

import request from "request";
import _ from "lodash";

import User from "../models/user.js";
import { paystack } from "../utils/paystack.js";

const { initializePayment, verifyPayment } = paystack(request);

export const paystack_init_payment = (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "fullName"]);

  form.metadata = {
    fullName: form.fullName,
  };
  form.amount *= 100;

  initializePayment(form, (error, body) => {
    if (error) {
      return res.redirect("error");
    } 
    const response = JSON.parse(body);

    if (response.status === false) {
      console.log(response);
      return res.status(400).redirect("error");
    } else {
      return res.status(200).redirect(`${response.data.authorization_url}?reference=${response.data.reference}`);
    }
  });
};

export const paystack_verify_payment = (req, res) => {
  const ref = req.params.id;
  // const email = req.query.email;
  try {
      
    verifyPayment(ref, async (error, body) => {
      if (error) {
        return res.redirect("error");
      }
      
      const response = JSON.parse(body);
      
      const email = response.data.customer.email;
      const student_data = await User.findOne({ email });
      
      if (response.status === false) {
        return res.status(400).send("error");
      } else {
        student_data.hasPaid = true;
        student_data.payment_ref = ref;
        await student_data.save();
        return res.status(200).send("paid");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const get_payment_receipt = (req, res) => {
  const id = req.params.id;

  Donor.findById(id)
    .then((donor) => {
      if (!donor) {
        res.redirect("error");
      }
      res.render("success", { donor });
    })
    .catch((e) => {
      res.redirect("error");
    });
};

export const paymentRequest = (req, res) => {};

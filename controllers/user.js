import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";

import User from '../models/user.js';
import BootcampUser from '../models/bootcamp.js';

const img_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "_" + file.originalname);
    // cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: img_storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("avatar");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    // errorCb("Invalid file type");
    // cb(null, false);
    cb(false);
  }
}


export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      dob,
      contact,
      address,
      password,
      confirm_password,
      academic_qualification,
      course_studied,
      school_studied,
      reason_for_apply,
      career_progression
    } = req.body;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errors = [];

    const existingUser = await User.findOne({ email });

    // Check required fields
    if (
      !first_name ||
      !last_name ||
      !email ||
      !address ||
      !dob ||
      !contact ||
      !password ||
      !confirm_password ||
      !course_studied ||
      !school_studied ||
      !reason_for_apply ||
      !career_progression
      
    ) {
      errors.push("Please fill in all fields");
    }

    if (academic_qualification === "none") {
      errors.push("Select an academic qualification");
    }

    // Check email
    if (!email.match(validRegex)) {
      errors.push("Use a valid Email address");
    }
    // Check password match
    if (password !== confirm_password) {
      errors.push("Password does not match");
    }
    // Check password length
    if (password.length < 6) {
      errors.push("Password should be at least 6 character");
    }
    // Check if email already exists
    if (existingUser) {
      errors.push("A User with this email already exists");
    }

    if (errors.length > 0) {
      req.flash("error", errors);
      req.flash("formData", { first_name, last_name, email, address, dob, password, confirm_password, contact, course_studied, school_studied, reason_for_apply, career_progression });
      res.redirect("/register");
    } else {
      upload(req, res, async (err) => {
        const maxSize = 1000000; // 1MB
        if (!req.file){
          // Handle error if req.file does not exist
          req.flash("error", "Upload an image");
          req.flash("formData", { first_name, last_name, email, address, dob, password, confirm_password, contact, course_studied, school_studied, reason_for_apply, career_progression });
          res.redirect("/register");
        } else if (req.file.size > maxSize) {
          // A Multer error occurred when uploading
          req.flash("error", "Image size exceeds 1mb");
          req.flash("formData", { first_name, last_name, email, address, dob, password, confirm_password, contact, course_studied, school_studied, reason_for_apply, career_progression });
          res.redirect("/register");
        } else if (err instanceof multer.MulterError && err.code === "Invalid file type") {
          // A Multer error occurred when uploading
          req.flash("error", "Image");
          req.flash("formData", { first_name, last_name, email, address, dob, password, confirm_password, contact, course_studied, school_studied, reason_for_apply, career_progression });
          res.redirect("/register");
        } else {
          // No errors occurred when uploading
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.create({
            name: `${first_name} ${last_name}`,
            email,
            password: hashedPassword,
            contact,
            date_of_birth: dob,
            address,
            profile_pic: req.file.filename,
            academic_qualification,
            course_studied,
            institution_of_study: school_studied,
            reasons_for_data_analysis_study: reason_for_apply,
            career_progression
          });
          req.flash("success_msg", "You are now registered and can log in");
          req.flash("formData", { email });
          res.redirect("/login");
        }
      });
    }
  } catch (error) {
    // Handle database error
    console.error(error);
    req.flash("error", "An error occurred while registering");
    req.flash("formData", { first_name, last_name, email, address, dob, password, confirm_password, contact, course_studied, school_studied, reason_for_apply, career_progression });
    res.redirect("/register");
  }
};

export const signin = async (req, res) => {
    const { email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    const errors = [];
    try {
      // Check required fields
      if (!email || !password ) {
        errors.push("Please fill in all fields");
      }
      if (!existingUser) {
        errors.push("User does not exist");
      }

      if (errors.length > 0) {
        req.flash("error", errors);
        req.flash("formData", { email });
        res.redirect("/login");
      } else {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          existingUser.password
        );
    
        if (!isPasswordCorrect) {
          errors.push("Password is not correct");
        }
    
        const token = jwt.sign({ existingUser }, "edobiz", { expiresIn: "1hr" });
        const student_data = existingUser

        req.session.user = student_data;
        req.session.token = token;
        res.status(200).redirect("/dashboard");
      }
  } catch (error) {
    req.flash("error", "An error occurred while registering");
    req.flash("formData", { email });
    res.redirect("/login");
  }
};

export const logout = (req, res) => {
  if (req.session) {
    req.session?.destroy();
  }
  res.redirect("/");
}

export const bootcamp_reg = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    contact,
    gender,
    dob,
    location,
    professional_background,
    why_join_camp
  } = req.body;

  try {
    const existingUser = await BootcampUser.findOne({ email });
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const errors = [];

    if (!first_name || !last_name || !email || !contact || !dob, !location, !professional_background, !why_join_camp ) {
      errors.push("Please fill in all fields");
    }

    if (!gender) {
      errors.push("Please select gender");
    }

    if (!email.match(validRegex)) {
      errors.push("Use a valid Email address");
    }

    // Check if email already exists
    if (existingUser) {
      errors.push("A User with this email already exists");
    }

    if (errors.length > 0) {
      req.flash("error", errors);
      req.flash("formData", { first_name, last_name, email, contact, dob, gender, location, professional_background, why_join_camp });
      res.redirect("/form");
    } else {
      await BootcampUser.create({
        name: `${first_name} ${last_name}`,
        email,
        date_of_birth: dob,
        contact,
        gender,
        location,
        professional_background,
        why_join_camp,
      });
      req.flash("success_msg", `${last_name} Congratulations! you are now registered`);
      res.redirect("/form");
    }
  } catch (error) {
     // Handle database error
    console.error(error);
    req.flash("error", "An error occurred while registering");
    req.flash("formData", {  first_name, last_name, email, contact, dob, gender, location, professional_background, why_join_camp });
    res.redirect("/form");
  }
}
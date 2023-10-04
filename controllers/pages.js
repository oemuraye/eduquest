import { paystack_verify_payment } from "./payment.js";

export const homePage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('index', { title: "Home", student_data, token });
}

export const aboutPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('program', { title: "about" , student_data, token})
}


export const blogSinglePage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('blog-single', { title: "Blog_Single" , student_data, token})
}

export const blogPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('blog', { title: "Blog" , student_data, token})
}

export const contactPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('contact', { title: "Contact" , student_data, token})
}

export const detailPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('detail', { title: "Detail" , student_data, token})
}

export const faqPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('faq', { title: "FAQ" , student_data, token})
}

export const innerPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('inner-page', { title: "Inner_Page" , student_data, token})
}

export const portfolioDetailsPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('portfolio-details', { title: "Portfolio_Details" , student_data, token})
}

export const programPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('about', { title: "Program" , student_data, token})
}

export const programOfferedPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('programOffer', { title: "EBS Programs" , student_data, token})
}

export const programmePage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('programme', { title: "Programme" , student_data, token})
}

export const successPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render("success", { title: "Success" , student_data, token});
}
export const errorPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render("error", { title: "Error" , student_data, token});
}

export const teamPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('team', {title: "Team", student_data, token})
}

export const galleryPage = (req, res) => {
    const student_data = req.session.user;
    const token = req.session.token;
    res.render('gallery', {title: "Photo Speaks", student_data, token})
}

export const student_dashboard = (req, res) => {
  const student_data = req.session.user;
  const token = req.session.token;
  const query = req.query.reference;

  if (!token) {
    res.render("login");
  } else {
    res.render("student_dashboard", {
      title: "Dashboard",
      student_data,
      token,
      query
    });
  }
}

export const bootcampForm = (req, res) => {
  const errors = req.flash("error");
  const success_msg = req.flash("success_msg");
  const formData = req.flash("formData")[0];
  res.render("register_bootcamp", { title: "Form", errors, formData, success_msg });
};



export const registerPage = (req, res) => {
    const errors = req.flash("error");
    const formData = req.flash("formData")[0];
    res.render("register", { title: "Application", errors, formData });
}

export const loginPage = (req, res) => {
    const errors = req.flash("error");
    const success_msg = req.flash("success_msg");
    const formData = req.flash("formData")[0];
    res.render("login", { title: "Application", errors, formData, success_msg });
}
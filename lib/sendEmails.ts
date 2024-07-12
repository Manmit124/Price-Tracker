import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string,htmlContent:string) => {
  const transporter = nodemailer.createTransport({
    service:"gmail",
    host: process.env.EMAIL_SERVER,
    port: 587,
    secure:false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html:htmlContent,
  });
};

export default sendEmail;

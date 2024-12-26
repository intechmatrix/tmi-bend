import nodemailer from 'nodemailer';
import { config } from "dotenv";
config();


const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Replace with your admin email
    pass: process.env.EMAIL_PASS   // Use an app-specific password for Gmail
  }
});


export const sendEmailToAdmin = async (type, data) => {
  try {
    let mailOptions;

    if (type === 'contact') {

     mailOptions = {
      from: data.email, // User's email
      to: 'techmatrixinnovation@gmail.com', // Admin's email (Replace with your admin email)
      subject: 'New Contact Form Submission',
      text: `
        You have received a new contact form submission.

        Full Name: ${data.fullName}
  Email: ${data.email}
  Phone Number: ${data.phoneNumber ? data.phoneNumber : 'Not Provided'}
  Institution/Organization: ${data.institution ? data.institution : 'Not Provided'}
  Message: ${data.message ? data.message : 'No message'}

        
        Please review this submission for further action.
      `
    };
  }

  else if (type === 'subscription') {
    mailOptions = {
      from: process.env.EMAIL_USER, // Admin's email
      to: 'himalbhattarai27@gmail.com', // Admin's email
      subject: 'New Subscription Alert',
      text: `
        A new user has subscribed.

        Email: ${data.email}

        Please review and take necessary action.
      `
    };
  } else {
    throw new Error('Invalid email type specified');
  }

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};



// export const sendEmailToSubscribers = async (subject, text, subscribers) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,  // Sender address
//     subject: subject,  // Subject of the email
//     text: text,  // Plain text body
//   };

//   try {
//     // Send email to each subscriber
//     for (const subscriber of subscribers) {
//       await transporter.sendMail({
//         ...mailOptions,
//         to: subscriber.email,  // Send email to each subscriber's email
//       });
//     }
//     console.log('News sent to all subscribers');
//   } catch (error) {
//     console.error('Error sending email to subscribers:', error);
//     throw new Error('Failed to send email to all subscribers');
//   }
// };

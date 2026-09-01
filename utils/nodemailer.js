import nodemailer from 'nodemailer';
import { config } from "dotenv";
config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmailToAdmin = async (type, data) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn('⚠️ [Nodemailer] EMAIL_USER or EMAIL_PASS is not configured in .env. Email notification skipped.');
      return;
    }

    let mailOptions;

    if (type === 'contact') {
      mailOptions = {
        from: `"Tech Matrix Innovations" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'techmatrixinnovation@gmail.com',
        replyTo: data.email,
        subject: `New Project Inquiry / Contact: ${data.fullName}`,
        text: `
You have received a new contact / project brief submission.

Full Name: ${data.fullName}
Email: ${data.email}
Phone Number: ${data.phoneNumber ? data.phoneNumber : 'Not Provided'}
Institution/Organization: ${data.institution ? data.institution : 'Not Provided'}
Discipline/Service: ${data.service ? data.service : 'Not Provided'}
Estimated Budget: ${data.budget ? data.budget : 'Not Provided'}
Message:
${data.message ? data.message : 'No message'}

--------------------------------------------------
Reply directly to this email to respond to ${data.fullName} (${data.email}).
        `
      };
    } else if (type === 'subscription') {
      mailOptions = {
        from: `"Tech Matrix Innovations" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL || 'techmatrixinnovation@gmail.com',
        replyTo: data.email,
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
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully! MessageId:', info.messageId);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
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

import nodemailer from 'nodemailer';

const sendMessage = async (recipients, message, subject_message) => {
    // Create a Nodemailer transporter

    const MAIL = process.env.NODE_EMAIL;
    const PASS = process.env.NODE_PASSWORD;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: MAIL,
          pass: PASS,
        },
      });
    

    // Email options
    const mailOptions = {
        from: MAIL,
        to: recipients.join(','),
        subject: subject_message,
        text: message,
    };

    // Send the email to all recipients
    try {
        const info  = await transporter.sendMail(mailOptions);
        if (info) return true
    } catch (error) {
        console.log(error)
        return false
    }
}
export default  sendMessage
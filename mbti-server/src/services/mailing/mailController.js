import sgMail from "@sendgrid/mail";
import config from "../../config";

sgMail.setApiKey(config.sendGridApiKey);
const mail = {
  sendToOne(to, subject, text) {
    const msg = {
      to,
      from: config.emails.notificationMail, // Use the email address or domain you verified above
      subject,
      text,
      html: `<strong>${text}</strong>`,
    };

    return sgMail
      .send(msg)
      .then((resp) => resp)
      .catch((err) => err);
  },
};

export default mail;

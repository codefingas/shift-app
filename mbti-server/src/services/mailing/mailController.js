import config from "../../config";

const mail = {
  async send() {
    return fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.sendGridApiKey}`,
      },
      data: {
        personalizations: [
          {
            to: [{ email: "udohezekiel34@yahoo.com", name: "John Doe" }],
            subject: "Doro testing Hello, World!",
          },
        ],
        content: [{ type: "text/plain", value: "Heya! -  this is doro testing" }],
        from: { email: "udohezekiel34@yahoo.com", name: "Sam Smith" },
        reply_to: { email: "udohezekiel34@yahoo.com", name: "Sam Smith" },
      },
    }).json().then(res => res).then(res => res).then(res => res).catch(err => new Error(err));
  },
};

export default mail;

/*
curl --request POST \
--url https://api.sendgrid.com/v3/mail/send \
--header 'authorization: Bearer <<YOUR_API_KEY>>' \
--header 'content-type: application/json' \
--data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'
*/

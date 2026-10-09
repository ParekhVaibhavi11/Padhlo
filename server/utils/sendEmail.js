const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : "";
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, "") : "";

  if (smtpUser && smtpPass) {
    try {
      let transporter;

      if (smtpHost.includes("gmail") || smtpUser.includes("@gmail.com")) {
        transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
      } else {
        transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });
      }

      const message = {
        from: `"${process.env.FROM_NAME || "Padhlo"}" <${process.env.FROM_EMAIL || smtpUser}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const info = await transporter.sendMail(message);
      console.log("------------------------------------------------------------------");
      console.log("[Padhlo Mailer Success] Reset email sent to Gmail: %s", options.to);
      console.log("[Message ID]: %s", info.messageId);
      console.log("------------------------------------------------------------------");
      return { configured: true, messageId: info.messageId };
    } catch (smtpError) {
      console.log("------------------------------------------------------------------");
      console.log("[Padhlo Mailer Warning] SMTP Delivery Failed (%s)", smtpError.message);
      console.log("Reason: Gmail rejected credentials (535 Password not accepted).");
      console.log("Tip: Ensure 2-Step Verification is enabled and use a 16-character App Password.");
      if (options.resetUrl) {
        console.log(" ");
        console.log(`[DEV FALLBACK RESET LINK for ${options.to}]:`);
        console.log(`${options.resetUrl}`);
      }
      console.log("------------------------------------------------------------------");
      return { configured: false, error: smtpError.message };
    }
  } else {
    console.log("------------------------------------------------------------------");
    console.log("[Padhlo Mailer Notice] SMTP credentials not fully configured in server/.env");
    if (options.resetUrl) {
      console.log(`[DEV FALLBACK RESET LINK for ${options.to}]:`);
      console.log(`${options.resetUrl}`);
    }
    console.log("------------------------------------------------------------------");
    return { configured: false, error: "SMTP credentials missing" };
  }
};

module.exports = sendEmail;

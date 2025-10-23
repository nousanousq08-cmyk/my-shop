import fetch from "node-fetch";

fetch("https://api.resend.com/emails", {
  method: "POST",
  headers: {
    "Authorization": "re_RpvEDDvH_EioaXdpR2L6qnCTvdihEamph",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    from: "onboarding@resend.dev",
    to: "nousamahboulista08@gmail.com",
    subject: "Test Email",
    html: "<h1>Test Email Sent!</h1>"
  })
})
.then(res => res.text())
.then(console.log)
.catch(console.error);

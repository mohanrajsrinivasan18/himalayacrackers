
import axios from "axios";
export default async function handler(req, res) {
  const { html } = req.body;
  const response = await axios.post("https://api.pdfshift.io/v3/convert/pdf", {
    source: html
  }, {
    auth: { username: "api", password: process.env.PDFSHIFT_API_KEY }
  });
  res.status(200).json({ pdf: response.data.url });
}

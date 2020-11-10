import hmacSHA512 from "crypto-js/hmac-sha512";
import Base64 from "crypto-js/enc-base64";

/** Generates signature to validate requests */
const generateSignature = (request: {
  method: string;
  url: string;
  body: any;
}) => {
  const { method, url, body } = request;
  const privateKey = process.env.PRIVATE_KEY || "";

  const stringifiedRequest = method
    .toLowerCase()
    .trim()
    .concat(
      url.toLowerCase().trim(),
      JSON.stringify(body).toLowerCase().trim().replace(/['"]+/g, "")
    );

  /** Generate timestamp */
  const utcDate = new Date().toUTCString();
  const utcMillDate = new Date(utcDate).getTime();
  const timestamp = utcMillDate;

  /** Generate Hash */
  const hashedRequest = hmacSHA512(
    stringifiedRequest.concat(timestamp.toString()),
    privateKey
  );

  /** Encode */
  const signature = Base64.stringify(hashedRequest);

  return { timestamp, signature };
};

export { generateSignature };

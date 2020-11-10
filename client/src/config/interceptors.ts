import axios from "axios";

import { generateSignature } from "&utils/signature";

axios.interceptors.request.use(
  /** Signing patch and post requests */
  (req) => {
    const { method: originalMethod, url, data } = req;
    const method = originalMethod?.toLowerCase().trim();

    if (method === "post" || method === "patch") {
      const request = {
        method,
        url: url || "",
        body: data || {},
      };

      /** Generate timestamp and signature */
      const { timestamp, signature } = generateSignature(request);

      req.headers.timestamp = timestamp;
      req.headers.signature = signature;
    }
    return req;
  }
);

export default axios;

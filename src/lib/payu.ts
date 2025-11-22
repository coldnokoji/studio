"use client";

import crypto from "crypto";

// This function dynamically creates and submits a form to redirect to PayU
export const submitPayuForm = (data: { [key: string]: string }) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = data.action;

  Object.keys(data).forEach((key) => {
    if (key !== "action") {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
};

/**
 * Verifies the PayU hash string (SERVER-SIDE ONLY).
 */
export const verifyPayUHash = (
  data: Record<string, string>,
  receivedHash: string,
): boolean => {
  const PAYU_SALT = process.env.PAYU_SALT;
  if (!PAYU_SALT) {
    console.error("PAYU_SALT is not defined for hash verification.");
    return false;
  }

  // The order for the *response* hash is:
  // salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
  const hashStringParts = [
    PAYU_SALT,
    data.status || "",
    "", "", "", "", "", // udf10, udf9, udf8, udf7, udf6
    data.udf5 || "",
    data.udf4 || "",
    data.udf3 || "",
    data.udf2 || "", // pan
    data.udf1 || "", // address
    data.email || "",
    data.firstname || "",
    data.productinfo || "",
    data.amount || "",
    data.txnid || "",
    data.key || "",
  ];

  const hashString = hashStringParts.join("|");
  const calculatedHash = crypto
    .createHash("sha512")
    .update(hashString)
    .digest("hex");

  if (calculatedHash !== receivedHash) {
    console.log("PayU Hash Mismatch Details:");
    console.log("Received Hash:", receivedHash);
    console.log("Calculated Hash:", calculatedHash);
    console.log("Hash String Used:", hashString.replace(PAYU_SALT, "SALT_HIDDEN")); // Hide salt in logs
  }

  return calculatedHash === receivedHash;
};
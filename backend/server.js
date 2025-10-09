import express from "express";
import Redsys from "node-redsys-api";

const app = express();
app.use(express.json());

const MERCHANT_CODE = process.env.REDSYS_MERCHANT_CODE;
const TERMINAL = process.env.REDSYS_TERMINAL || "1";
const SECRET_KEY = process.env.REDSYS_SECRET;
const CURRENCY = "978";
const ENV = process.env.REDSYS_ENV || "test";
const BACKEND_PUBLIC_URL = process.env.BACKEND_PUBLIC_URL || "http://localhost:3001";
const FRONTEND_PUBLIC_URL = process.env.FRONTEND_PUBLIC_URL || "http://localhost:5173";

const REDSYS_URL = ENV === "live"
  ? "https://sis.redsys.es/sis/realizarPago"
  : "https://sis-t.redsys.es:25443/sis/realizarPago";

const redsys = new Redsys();

app.post("/api/pay", (req, res) => {
  const { amountCents, orderId, description, urlOk, urlKo } = req.body;
  if (!amountCents || !orderId) return res.status(400).json({ error: "amountCents e orderId richiesti" });
  if (!/^\d{4,12}$/.test(String(orderId))) return res.status(400).json({ error: "orderId deve essere numerico 4-12 cifre" });

  const params = {
    DS_MERCHANT_AMOUNT: String(amountCents),
    DS_MERCHANT_ORDER: String(orderId),
    DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
    DS_MERCHANT_CURRENCY: CURRENCY,
    DS_MERCHANT_TRANSACTIONTYPE: "0",
    DS_MERCHANT_TERMINAL: TERMINAL,
    DS_MERCHANT_MERCHANTURL: `${BACKEND_PUBLIC_URL}/api/redsys/notify`,
    DS_MERCHANT_URLOK: urlOk || `${FRONTEND_PUBLIC_URL}/success`,
    DS_MERCHANT_URLKO: urlKo || `${FRONTEND_PUBLIC_URL}/failure`,
    DS_MERCHANT_PRODUCTDESCRIPTION: description || "Ordine",
  };

  const Ds_MerchantParameters = redsys.createMerchantParameters(params);
  const Ds_Signature = redsys.createMerchantSignature(SECRET_KEY, params);

  res.json({
    url: REDSYS_URL,
    Ds_SignatureVersion: "HMAC_SHA256_V1",
    Ds_MerchantParameters,
    Ds_Signature,
  });
});

app.use("/api/redsys/notify", express.urlencoded({ extended: true }));
app.post("/api/redsys/notify", (req, res) => {
  const { Ds_SignatureVersion, Ds_MerchantParameters, Ds_Signature } = req.body || {};
  try {
    const decoded = redsys.decodeMerchantParameters(Ds_MerchantParameters);
    const calc = redsys.createMerchantSignatureNotif(SECRET_KEY, Ds_MerchantParameters);
    const valid = calc === Ds_Signature;
    console.log("NOTIFY decoded:", decoded, "valid:", valid);
  } catch (e) {
    console.error("Errore notify:", e);
  }
  res.status(200).send("OK");
});

app.listen(3001, () => console.log("Backend avviato su :3001"));

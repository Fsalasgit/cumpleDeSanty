import express from "express";
import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import FormData from "form-data";

const app = express();
const upload = multer({ dest: "uploads/" });

// 👉 Servir la carpeta uploads como estática
app.use("/uploads", express.static("uploads"));

// ===================
// Rutas
// ===================
app.post("/api/convert-avatar", upload.single("photo"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const { originalname, path } = req.file;

    // Construir el FormData para enviar a la API externa
    const form = new FormData();
    form.append("image", fs.createReadStream(path), originalname);
    form.append(
      "prompt",
      "Full body Roblox-style child avatar in 99 Nights in the Forest, vibrant blocky 3D world, cinematic lighting, cute and playful."
    );
    form.append(
      "negative_prompt",
      "realistic human face, extra limbs, watermark, text"
    );

    const apiRes = await fetch("https://api.example.com/convert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.IMAGE_API_KEY}`,
      },
      body: form,
    });

    if (!apiRes.ok) {
      const text = await apiRes.text();
      fs.unlink(path, () => {});
      return res.status(500).send(`Image API error: ${text}`);
    }

    // 🔑 Convertir binario a Base64
    const buffer = await apiRes.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const mimeType = apiRes.headers.get("content-type") || "image/png";

    fs.unlink(path, () => {}); // Eliminar archivo temporal

    return res.json({
      success: true,
      avatarUrl: `data:${mimeType};base64,${base64Image}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Roblox-tízate server running on port ${PORT}`);
});

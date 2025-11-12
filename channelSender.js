import axios from "axios";

export default async function channelSender(message, client, texts, num) {
  const remoteJid = message.key.remoteJid;

  // --- Ton image Catbox (tu peux en mettre plusieurs si tu veux aléatoirement après) ---
  const imageUrl = `https://files.catbox.moe/x7fi39.jpg`; // 🔗 Ton image distante

  // --- Téléchargement du thumbnail pour le préchargement WhatsApp (optionnel) ---
  let thumbBuffer;
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    thumbBuffer = Buffer.from(response.data, "binary");
  } catch (err) {
    console.error("❌ Impossible de charger le thumbnail :", err.message);
    thumbBuffer = null; // fallback
  }

  // --- Envoi du message avec image et aperçu enrichi ---
  await client.sendMessage(remoteJid, {
    image: { url: imageUrl },
    caption: `> ${texts}`,
    contextInfo: {
      externalAdReply: {
        title: "",//titre de thumbnail
        body: "??",//description 
        mediaType: 1,
        thumbnail: thumbBuffer,
        renderLargerThumbnail: false,
        mediaUrl: imageUrl,
        sourceUrl: "https://whatsapp.com/channel/0029Vb65HSyHwXbEQbQjQV26",//source url (optimel)
        thumbnailUrl: imageUrl
      }
    }
  });
}
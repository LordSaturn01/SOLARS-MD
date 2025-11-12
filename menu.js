// commands/menu.js
import config from "../config.js"

export default async function menuCommand(message, client) {
  try {
    const remoteJid = message.key.remoteJid;

    // --- Texte du menu ---
    const menuText = `
╔════════════════════
║  𝐒𝚯𝐋𝚫𝚪𝐒 𝐌𝐄𝐍𝐔
╠════════════════════
║ • .ping - Test de latence
║ • .hello - Dire bonjour
║ • .sticker - Créer un sticker
║ • .play - Jouer un audio
║ • .menu - Afficher ce menu
╚════════════════════
> ${config.nameCreator}
`;

    // --- Envoyer l'image ---
    await client.sendMessage(remoteJid, {
      image: { url: "https://files.catbox.moe/x7fi39.jpg" }, // link for image
      caption: menuText
    });

    // --- Envoyer l'audio depuis un lien ---
    const audioUrl = "https://files.catbox.moe/k3u0g1.mp3"; // link for audio
    const ptt = true ; // true = PTT / false = audio normal

    await client.sendMessage(remoteJid, {
      audio: { url: audioUrl },
      mimetype: "audio/mp3",
      ptt: ptt
    });

  } catch (err) {
    console.error("Erreur dans menuCommand:", err);
  }
}
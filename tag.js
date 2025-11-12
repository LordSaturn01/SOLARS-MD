export default async function tagCommand(message, client) {
  try {
    const remoteJid = message.key.remoteJid;

    // Vérifier si c’est dans un groupe
    const metadata = await client.groupMetadata(remoteJid).catch(() => null);
    if (!metadata) return client.sendMessage(remoteJid, { text: "❌ Cette commande ne fonctionne que dans un groupe." });

    const participants = metadata.participants.map(p => p.id);
    const text = message.message?.conversation?.split(" ").slice(1).join(" ")
      || message.message?.extendedTextMessage?.text?.split(" ").slice(1).join(" ")
      || message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation
      || "👋 Salut tout le monde !";

    await client.sendMessage(remoteJid, {
      text,
      mentions: participants
    });

  } catch (err) {
    console.error("Erreur dans tagCommand:", err);
    await client.sendMessage(message.key.remoteJid, { text: "⚠️ Erreur lors du tag." });
  }
}
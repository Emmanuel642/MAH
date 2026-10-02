import { Resend } from 'resend';

// Définition de l'interface des données reçues depuis le frontend
interface IncomingPayload {
  name?: string;
  email?: string;
  phone?: string;
  project_type?: string;
  message?: string;
  company_website?: string; // Champ honeypot anti-spam
}

// Fonction utilitaire d'échappement HTML pour prévenir toute injection
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req: any, res: any) {
  // 1. Autoriser uniquement la méthode POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Méthode non autorisée. Seul POST est accepté.',
    });
  }

  try {
    // Gestion défensive du corps de la requête (support string et object)
    let body: IncomingPayload = req.body || {};
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Format JSON invalide.',
        });
      }
    }

    // 2. Vérification Honeypot (sécurité anti-robots)
    // Si un bot a rempli le champ invisible "company_website", rejet silencieux avec réponse neutre
    if (body.company_website && typeof body.company_website === 'string' && body.company_website.trim().length > 0) {
      console.warn('[MHA Contact API] Honeypot déclenché. Soumission ignorée sans appel Resend.');
      return res.status(200).json({ success: true });
    }

    // 3. Extraction et assainissement des données
    const name = (body.name || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const phone = (body.phone || '').trim();
    const projectType = (body.project_type || '').trim();
    const message = (body.message || '').trim();

    // 4. Validations strictes côté serveur
    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Le nom est obligatoire (entre 2 et 100 caractères).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Une adresse email valide est obligatoire.',
      });
    }

    if (phone && phone.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Le numéro de téléphone est trop long.',
      });
    }

    if (!projectType || projectType.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Le type de projet est obligatoire.',
      });
    }

    if (!message || message.length < 5 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        error: 'Le message est obligatoire (entre 5 et 5000 caractères).',
      });
    }

    // 5. Lecture des variables d'environnement serveur
    const resendApiKey = process.env.RESEND_API_KEY;
    const mhaContactEmail = process.env.MHA_CONTACT_EMAIL || 'contact@mha-rdc.com';
    const mhaFromEmail =
      process.env.MHA_FROM_EMAIL || 'Modern Home Architecture <onboarding@resend.dev>';

    // Si la clé API est absente : ERREUR 500 stricte (jamais de faux succès)
    if (!resendApiKey || resendApiKey.trim() === '') {
      console.error('[MHA Contact API] Erreur critique : RESEND_API_KEY est manquante dans les variables d\'environnement.');
      return res.status(500).json({
        success: false,
        error: 'Configuration serveur incomplète.',
      });
    }

    // Horodatage formaté (Heure de Lubumbashi / RDC)
    const submittedDate = new Date().toLocaleString('fr-FR', {
      timeZone: 'Africa/Lubumbashi',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Échappement HTML des variables pour affichage sécurisé dans le client mail
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : 'Non renseigné';
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    // 6. Initialisation du SDK Resend
    const resend = new Resend(resendApiKey);

    // 7. Template HTML soigné pour l'équipe MHA
    const mhaNotificationHtml = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="utf-8">
        <title>Nouvelle demande de contact MHA</title>
      </head>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 32px 16px; color: #1a1c1a;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border: 1px solid #e3e2e0; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <tr>
            <td style="padding: 28px 36px; background-color: #000000; border-bottom: 2px solid #765935;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">MHA</h1>
              <p style="margin: 4px 0 0 0; color: #cbc6bd; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase;">Modern Home Architecture</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 36px 12px 36px;">
              <span style="font-size: 11px; font-weight: bold; letter-spacing: 1.2px; text-transform: uppercase; color: #765935; display: block; margin-bottom: 6px;">Demande entrante</span>
              <h2 style="margin: 0; font-size: 22px; color: #1a1c1a; font-weight: 500;">Nouveau contact depuis le site vitrine</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #747878;">Reçue le ${submittedDate}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f3f1; border-left: 3px solid #765935; padding: 18px 20px;">
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #747878; display: block; margin-bottom: 2px;">Client</strong>
                    <span style="font-size: 15px; color: #000000; font-weight: 600;">${safeName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #747878; display: block; margin-bottom: 2px;">Email</strong>
                    <a href="mailto:${safeEmail}" style="font-size: 14px; color: #000000; text-decoration: underline;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px;">
                    <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #747878; display: block; margin-bottom: 2px;">Téléphone</strong>
                    <span style="font-size: 14px; color: #000000;">${safePhone}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #747878; display: block; margin-bottom: 2px;">Pôle / Type de projet</strong>
                    <span style="font-size: 14px; color: #765935; font-weight: bold;">${safeProjectType}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 36px;">
              <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #747878; display: block; margin-bottom: 8px;">Message</strong>
              <div style="background-color: #faf9f6; border: 1px solid #e3e2e0; padding: 18px; font-size: 14px; line-height: 1.6; color: #1a1c1a;">
                ${safeMessage}
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 36px 28px 36px;">
              <a href="mailto:${safeEmail}?subject=Re:%20Votre%20demande%20de%20projet%20%E2%80%94%20Modern%20Home%20Architecture"
                 style="display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 12px 24px; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
                Répondre directement à ${safeName}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 18px 36px; background-color: #f4f3f1; border-top: 1px solid #e3e2e0; font-size: 11px; color: #747878; line-height: 1.5;">
              Message transmis via le formulaire de contact officiel de <strong>MHA</strong> (<a href="https://mha-rdc.com" style="color: #765935; text-decoration: none;">mha-rdc.com</a>).<br />
              Lubumbashi (Luano City) &bull; Kinshasa (Gombe)
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const mhaNotificationText = `
MODERN HOME ARCHITECTURE — NOUVELLE DEMANDE DE CONTACT
------------------------------------------------------
Reçue le : ${submittedDate}

INFORMATIONS DU CLIENT :
- Nom : ${name}
- Email : ${email}
- Téléphone : ${phone || 'Non renseigné'}
- Type de projet : ${projectType}

MESSAGE :
${message}

------------------------------------------------------
Répondre directement à : ${email}
Site web : https://mha-rdc.com
    `.trim();

    // 8. Envoi de l'email vers l'adresse MHA avec replyTo = email du client
    const mhaSendResult = await resend.emails.send({
      from: mhaFromEmail,
      to: [mhaContactEmail],
      replyTo: email,
      subject: `MHA — Nouvelle demande : ${safeProjectType} (${safeName})`,
      html: mhaNotificationHtml,
      text: mhaNotificationText,
    });

    if (mhaSendResult.error) {
      console.error('[MHA Contact API] Erreur envoi Resend vers MHA :', mhaSendResult.error);
      return res.status(500).json({
        success: false,
        error: "Impossible d'envoyer votre demande.",
      });
    }

    // 9. Envoi d'un email de confirmation au client (optionnel, sans bloquer si domaine non vérifié)
    try {
      const clientConfirmationHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="utf-8">
          <title>Confirmation de votre demande — MHA</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #faf9f6; margin: 0; padding: 32px 16px; color: #1a1c1a;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e3e2e0;">
            <tr>
              <td style="padding: 24px 32px; background-color: #000000; border-bottom: 2px solid #765935;">
                <h1 style="margin: 0; color: #ffffff; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">MHA</h1>
                <p style="margin: 2px 0 0 0; color: #cbc6bd; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;">Modern Home Architecture</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <h2 style="margin: 0 0 16px 0; font-size: 18px; color: #1a1c1a; font-weight: 500;">
                  Bonjour ${safeName},
                </h2>
                <p style="font-size: 14px; line-height: 1.6; color: #444748; margin: 0 0 16px 0;">
                  Nous accusons bonne réception de votre demande concernant votre projet de <strong>${safeProjectType}</strong>.
                </p>
                <p style="font-size: 14px; line-height: 1.6; color: #444748; margin: 0 0 16px 0;">
                  Nos équipes d'ingénieurs et d'architectes étudient attentivement vos informations. Un chargé d'affaires prendra contact avec vous dans les meilleurs délais.
                </p>
                <div style="background-color: #f4f3f1; border-left: 3px solid #765935; padding: 14px 18px; margin: 24px 0;">
                  <strong style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #765935; display: block; margin-bottom: 4px;">Rappel de votre message</strong>
                  <p style="font-size: 13px; color: #444748; margin: 0; line-height: 1.5; font-style: italic;">
                    &laquo; ${safeMessage} &raquo;
                  </p>
                </div>
                <p style="font-size: 14px; line-height: 1.6; color: #444748; margin: 0;">
                  Cordialement,<br />
                  <strong>L’équipe Modern Home Architecture (MHA)</strong><br />
                  <span style="font-size: 12px; color: #747878;">Société de Construction, d’Architecture & de Fourniture de Matériaux</span>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 32px; background-color: #f4f3f1; border-top: 1px solid #e3e2e0; font-size: 11px; color: #747878; line-height: 1.5;">
                Lubumbashi (Siège Luano City) : +243 991 999 901 &bull; Kinshasa (Gombe) : +243 850 001 001<br />
                E-mail : <a href="mailto:contact@mha-rdc.com" style="color: #765935; text-decoration: none;">contact@mha-rdc.com</a>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      const clientConfirmationText = `
Bonjour ${name},

Nous accusons bonne réception de votre demande relative à votre projet de ${projectType}.

Nos équipes d'ingénieurs et d'architectes étudient attentivement vos éléments. Un chargé d'affaires prendra contact avec vous dans les meilleurs délais.

Rappel de votre message :
"${message}"

Cordialement,
L’équipe Modern Home Architecture (MHA)
Lubumbashi (Luano City) | Kinshasa (Gombe)
Téléphones : +243 991 999 901 | +243 850 001 001
Email : contact@mha-rdc.com
      `.trim();

      await resend.emails.send({
        from: mhaFromEmail,
        to: [email],
        subject: 'MHA — Confirmation de votre demande',
        html: clientConfirmationHtml,
        text: clientConfirmationText,
      });
    } catch (clientErr) {
      console.warn('[MHA Contact API] Note : Accusé de réception client non délivré (restriction domaine de test Resend) :', clientErr);
    }

    // 10. Réponse HTTP 200 en cas de succès confirmé de Resend
    return res.status(200).json({
      success: true,
    });
  } catch (err: any) {
    console.error('[MHA Contact API] Erreur inattendue serveur :', err);
    return res.status(500).json({
      success: false,
      error: "Impossible d'envoyer votre demande.",
    });
  }
}

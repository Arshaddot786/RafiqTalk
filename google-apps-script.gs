/*
  RafiqTalk — Contact Form → Google Sheet logger
  ================================================
  SETUP (do this once):

  1. Create a new Google Sheet (sheets.new). Name it "RafiqTalk Inquiries".
  2. In Row 1, paste these exact column headers (one per cell, A1 to L1):
     Timestamp | Name | Contact | Reason | Listener Preference | Preferred Day | Preferred Time | Message | Referral Code | Session Type | Requested Rafiq | Secret Check
     (that is 12 columns, A to L)

  3. In the Sheet, go to Extensions → Apps Script. Delete any placeholder
     code in the editor and paste this entire file in its place.

  4. Change the SHARED_SECRET value below to any password-like string of
     your own choosing (letters/numbers, no spaces). This stops random
     bots on the internet from writing junk rows into your sheet — it is
     NOT shown to your website visitors, only used internally.

  5. Click Deploy → New deployment → gear icon → "Web app".
       - Description: "RafiqTalk contact form"
       - Execute as: Me
       - Who has access: Anyone
     Click Deploy. Google will ask you to authorize — approve it (it's
     your own script, running on your own Sheet).

  6. Copy the Web App URL it gives you (ends in /exec). Send that URL
     back so it can be wired into the website's contact form.

  7. Anytime you edit this script later, you must go to Deploy → Manage
     deployments → edit (pencil) → New version → Deploy, otherwise your
     changes won't take effect on the live URL.
*/

var SHARED_SECRET = "CHANGE-THIS-TO-YOUR-OWN-SECRET-123";

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = e.parameter;

    // Reject requests that don't carry the correct secret
    if (data.secret !== SHARED_SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.contact || "",
      data.reason || "",
      data.listener_preference || "",
      data.preferred_day || "",
      data.preferred_time || "",
      data.message || "",
      data.referral_code || "",
      data.session_type || "",
      data.requested_rafiq || "",
      "OK"
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

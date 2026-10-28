/**
 * BHS Baseball Sponsorships — storage backend.
 *
 * Paste this into Extensions > Apps Script of the Google Sheet that should
 * collect sponsors (see SETUP.md). Each submission:
 *   - saves the ORIGINAL logo file, untouched, to a Google Drive folder
 *   - adds one row to the "Sponsors" tab with the contact info and a link to the logo
 */

var SHEET_NAME = 'Sponsors';
var FOLDER_NAME = 'BHS Baseball Sponsor Logos';
var MAX_BYTES = 25 * 1024 * 1024;
var HEADERS = [
  'Submitted', 'Business Name', 'Contact Name (Sign/Ad Approval)', 'Contact Phone',
  'Additional Notes', 'Logo File', 'Logo Link', 'Logo Size', 'Logo Dimensions (px)'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    var data = JSON.parse(e.postData.contents);

    var businessName = clean_(data.businessName, 150);
    var contactName = clean_(data.contactName, 150);
    var contactPhone = clean_(data.contactPhone, 30);
    var notes = clean_(data.notes, 2000);
    if (!businessName || !contactName || !contactPhone || !data.fileData) {
      return json_({ ok: false, error: 'Missing required fields' });
    }

    var bytes = Utilities.base64Decode(data.fileData);
    if (bytes.length > MAX_BYTES) return json_({ ok: false, error: 'File is larger than 25 MB' });

    var ext = (String(data.fileName || '').match(/\.[A-Za-z0-9]{1,5}$/) || [''])[0].toLowerCase();
    var stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
    var safeName = businessName.replace(/[\\\/:*?"<>|]/g, '').slice(0, 80);
    var fileName = safeName + ' - logo (' + stamp + ')' + ext;

    var blob = Utilities.newBlob(bytes, String(data.mimeType || 'application/octet-stream'), fileName);
    var file = getFolder_().createFile(blob);

    var dims = data.width && data.height ? data.width + ' x ' + data.height : 'Vector / n/a';
    getSheet_().appendRow([
      new Date(), safe_(businessName), safe_(contactName), safe_(contactPhone), safe_(notes),
      safe_(fileName), file.getUrl(), formatBytes_(bytes.length), dims
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, message: 'BHS Baseball Sponsorships backend is running.' });
}

/** Run once from the editor to create the sheet tab and Drive folder (and grant permissions). */
function setup() {
  getSheet_();
  var folder = getFolder_();
  Logger.log('Logos will be saved to: ' + folder.getUrl());
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#000000').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.setColumnWidths(1, HEADERS.length, 180);
  }
  return sheet;
}

function getFolder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('FOLDER_ID');
  if (id) {
    try { return DriveApp.getFolderById(id); } catch (e) { /* deleted: recreate below */ }
  }
  var folder = DriveApp.createFolder(FOLDER_NAME);
  props.setProperty('FOLDER_ID', folder.getId());
  return folder;
}

function clean_(value, maxLen) {
  return String(value == null ? '' : value).trim().slice(0, maxLen);
}

// Stops text like "=HYPERLINK(...)" or "+1 228..." from being treated as a formula.
function safe_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function formatBytes_(n) {
  return n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB';
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

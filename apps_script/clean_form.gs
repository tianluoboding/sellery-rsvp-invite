// RSVP Form Creator - Clean Version
// 完全干净的版本，无语法错误

// CONFIGURATION VARIABLES
var EVENT_NAME = "Friends Gathering · 一周年小聚";
var DATE_TEXT = "Sat, Oct 12, 2025 · 5:00–8:30 PM";
var VENUE_NAME = "Riverside Park Lawn";
var ADDRESS = "123 Riverside Dr, New York, NY";
var RSVP_DEADLINE = "Oct 5, 2025";
var ORGANIZER_EMAIL = "your-email@example.com";
var BANNER_IMAGE_FILE_ID = "YOUR_BANNER_FILE_ID";

// MAIN FUNCTION
function main() {
  console.log("Creating RSVP form...");
  
  var form = FormApp.create(EVENT_NAME + " — RSVP");
  
  var descriptionZH = "时间：" + DATE_TEXT + "\n地点：" + VENUE_NAME + "（" + ADDRESS + "）\n请在 " + RSVP_DEADLINE + " 前完成填写，感谢！";
  var descriptionEN = "Time: " + DATE_TEXT + "\nVenue: " + VENUE_NAME + " (" + ADDRESS + ")\nPlease RSVP by " + RSVP_DEADLINE + ". Thank you!";
  form.setDescription(descriptionZH + "\n\n" + descriptionEN);
  
  form.setCollectEmail(true);
  form.setLimitOneResponsePerUser(true);
  form.setAllowResponseEdits(true);
  form.setProgressBar(true);
  
  var confirmationZH = "收到啦！我们会在活动前一两天再提醒你～";
  var confirmationEN = "Got it! We'll remind you 1–2 days before the event.";
  form.setConfirmationMessage(confirmationZH + "\n\n" + confirmationEN);
  
  addQuestions(form);
  
  var spreadsheet = createSpreadsheet(form);
  setupTrigger(form);
  
  var formUrl = form.getPublishedUrl();
  var embedUrl = formUrl.replace('/viewform', '/viewform?embedded=true');
  
  console.log("Form URL: " + formUrl);
  console.log("Embed URL: " + embedUrl);
  console.log("Spreadsheet: " + spreadsheet.getUrl());
  
  return {
    formUrl: formUrl,
    embedUrl: embedUrl,
    spreadsheetUrl: spreadsheet.getUrl()
  };
}

function addQuestions(form) {
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle("Are you attending? / 你会参加吗？")
    .setRequired(true)
    .setChoices([
      q1.createChoice("Yes / 是的"),
      q1.createChoice("Maybe / 可能"),
      q1.createChoice("No / 不参加")
    ]);
  
  var q2 = form.addTextItem();
  q2.setTitle("Your full name / 您的姓名")
    .setRequired(true);
  
  var q3 = form.addTextItem();
  q3.setTitle("Number of guests (including you) / 参加人数（包括您）")
    .setRequired(false);
  
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle("Dietary preference / 饮食偏好")
    .setRequired(false)
    .setChoices([
      q4.createChoice("No preference / 无特殊要求"),
      q4.createChoice("Vegetarian / 素食"),
      q4.createChoice("Vegan / 纯素食"),
      q4.createChoice("Halal / 清真"),
      q4.createChoice("Other / 其他")
    ]);
  
  var q5 = form.addTextItem();
  q5.setTitle("Contact method / 联系方式")
    .setRequired(true);
  
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle("Arrival time / 到达时间")
    .setRequired(false)
    .setChoices([
      q6.createChoice("On time / 准时到达"),
      q6.createChoice("A bit late / 会晚一点"),
      q6.createChoice("Not sure / 不确定")
    ]);
  
  var q7 = form.addParagraphTextItem();
  q7.setTitle("Song request / 点歌")
    .setRequired(false);
  
  var q8 = form.addParagraphTextItem();
  q8.setTitle("Notes / 留言")
    .setRequired(false);
}

function createSpreadsheet(form) {
  var spreadsheet = SpreadsheetApp.create(EVENT_NAME + " Responses");
  var sheet = spreadsheet.getActiveSheet();
  
  var headers = ["Timestamp", "Email", "Attending", "Name", "Guests", "Dietary", "Contact", "Arrival", "Song", "Notes"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  return spreadsheet;
}

function setupTrigger(form) {
  ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();
}

function onFormSubmit(e) {
  var responses = e.response;
  var itemResponses = responses.getItemResponses();
  
  var data = {
    name: itemResponses[1].getResponse(),
    email: responses.getRespondentEmail(),
    attending: itemResponses[0].getResponse()
  };
  
  var subject = "New RSVP Submission - " + EVENT_NAME;
  var body = "Name: " + data.name + "\nEmail: " + data.email + "\nAttending: " + data.attending;
  
  GmailApp.sendEmail(ORGANIZER_EMAIL, subject, body);
}

function testConfig() {
  if (ORGANIZER_EMAIL === "your-email@example.com") {
    throw new Error("Please update ORGANIZER_EMAIL variable");
  }
  console.log("Configuration OK");
}

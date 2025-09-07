// Google Apps Script to create RSVP Form
// 创建RSVP表单的Google Apps Script

// CONFIGURATION - Update these variables
// 配置变量 - 请更新以下变量

// Event Details / 活动详情
var EVENT_NAME = "🎉 Join Sellery NYC's Anniversary Celebration! 🎉";
var DATE_TEXT = "Fri, Sep 12, 2025 · 6:00–11:00 PM";
var ADDRESS = "265 West 37th Street Suite 203";
var RSVP_DEADLINE = "Sep 5, 2025";

// Organizer Email (for notifications) / 组织者邮箱（用于通知）
var ORGANIZER_EMAIL = "tianluoboding@gmail.com";

// Banner Image Configuration / 横幅图片配置
// Upload banner.jpg to Google Drive and get the file ID
// 将banner.jpg上传到Google Drive并获取文件ID
var BANNER_IMAGE_FILE_ID = "1HMBSybQoPP4e2p1vo5MVFRK5SXtSApMg"; // Company Logo/Banner
var COMPANY_LOGO_FILE_ID = "19TOW85VgWCxMQyWPl7Q8PXYhbT-fHxlO"; // Company Logo

// MAIN FUNCTION
function main() {
  try {
    console.log("开始创建RSVP表单...");
    console.log("Starting RSVP form creation...");
    
    // Create the form
    var form = FormApp.create(EVENT_NAME + " — RSVP");
    
    // Set form description - simplified format
    var description = "Time: " + DATE_TEXT + "\nAddress: " + ADDRESS + "\n✨ Dress Code: Dressy Attire ✨\nDon't forget to stop by our Photo Booth! 📸\n\nPlease join us for a dinner celebration on September 12th. We want to show our appreciation for your dedication and invite you to celebrate the exciting journey ahead. We look forward to sharing a memorable evening with you!\n\nPlease RSVP by " + RSVP_DEADLINE + ". Thank you!";
    form.setDescription(description);
    
    // Configure form settings
    form.setCollectEmail(false);
    form.setLimitOneResponsePerUser(false);
    form.setAllowResponseEdits(true);
    form.setProgressBar(true);
    form.setShowLinkToRespondAgain(false);
    
    // Set confirmation message
    var confirmation = "Got it! We'll remind you 1–2 days before the event.";
    form.setConfirmationMessage(confirmation);
    
    // Add company logo first (smaller, at top)
    if (COMPANY_LOGO_FILE_ID && COMPANY_LOGO_FILE_ID !== "YOUR_COMPANY_LOGO_FILE_ID") {
      try {
        var logoItem = form.addImageItem();
        var logoFile = DriveApp.getFileById(COMPANY_LOGO_FILE_ID);
        logoItem.setImage(logoFile.getBlob());
        logoItem.setTitle("Sellery NYC Logo");
      } catch (error) {
        console.warn("Could not set company logo:", error);
      }
    }
    
    // Add background/banner image (larger, as background effect)
    if (BANNER_IMAGE_FILE_ID && BANNER_IMAGE_FILE_ID !== "YOUR_BANNER_FILE_ID") {
      try {
        var bannerItem = form.addImageItem();
        var bannerFile = DriveApp.getFileById(BANNER_IMAGE_FILE_ID);
        bannerItem.setImage(bannerFile.getBlob());
        bannerItem.setTitle("Sellery NYC Event Background");
      } catch (error) {
        console.warn("Could not set banner image:", error);
      }
    }
    
    // Add form questions
    addFormQuestions(form);
    
    // Create linked spreadsheet
    var spreadsheet = createLinkedSpreadsheet(form);
    
    // Set up form submission trigger
    setupFormTrigger(form);
    
    // Get URLs
    var formUrl = form.getPublishedUrl();
    var embedUrl = form.getPublishedUrl().replace('/viewform', '/viewform?embedded=true');
    
    console.log("✅ 表单创建成功！Form created successfully!");
    console.log("📋 表单URL / Form URL:", formUrl);
    console.log("🔗 嵌入URL / Embed URL:", embedUrl);
    console.log("📊 响应表格 / Responses Sheet:", spreadsheet.getUrl());
    
    // Send test notification
    sendNotificationEmail("RSVP Form Created Successfully", formUrl, embedUrl);
    
    return {
      formUrl: formUrl,
      embedUrl: embedUrl,
      spreadsheetUrl: spreadsheet.getUrl()
    };
    
  } catch (error) {
    console.error("❌ 创建表单时出错 / Error creating form:", error);
    throw error;
  }
}

function addFormQuestions(form) {
  // Question 1: Full name
  var nameItem = form.addTextItem();
  nameItem.setTitle("Your full name")
    .setRequired(true);
  
  // Question 2: Are you attending?
  var attendanceItem = form.addMultipleChoiceItem();
  attendanceItem.setTitle("Are you attending?")
    .setRequired(true)
    .setChoices([
      attendanceItem.createChoice("Yes"),
      attendanceItem.createChoice("Maybe"),
      attendanceItem.createChoice("No")
    ]);
  
  // Question 3: Dietary preference
  var dietaryItem = form.addTextItem();
  dietaryItem.setTitle("Dietary preference")
    .setRequired(false);
  
  // Question 4: Allergies
  var allergyItem = form.addTextItem();
  allergyItem.setTitle("Allergies")
    .setRequired(false);
  
  // Question 5: Contact method
  var contactItem = form.addTextItem();
  contactItem.setTitle("Contact method")
    .setRequired(true);
  
  // Question 6: Arrival time
  var arrivalItem = form.addMultipleChoiceItem();
  arrivalItem.setTitle("Arrival time window")
    .setRequired(false)
    .setChoices([
      arrivalItem.createChoice("On time"),
      arrivalItem.createChoice("A bit late"),
      arrivalItem.createChoice("Not sure")
    ]);
  
  // Question 7: Notes to organizer
  var notesItem = form.addParagraphTextItem();
  notesItem.setTitle("Notes to organizer")
    .setRequired(false)
    .setHelpText("Any special requests or comments?");
}

function createLinkedSpreadsheet(form) {
  // Create a new spreadsheet for responses
  var spreadsheet = SpreadsheetApp.create(EVENT_NAME + " Responses");
  var sheet = spreadsheet.getActiveSheet();
  
  // Set up headers
  var headers = [
    "Timestamp",
    "Full name",
    "Are you attending?",
    "Dietary preference",
    "Allergies",
    "Contact method",
    "Arrival time",
    "Notes to organizer"
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  sheet.getRange(1, 1, 1, headers.length).setBackground("#f0f0f0");
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  // Link the form to the spreadsheet
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  
  return spreadsheet;
}

function setupFormTrigger(form) {
  // Create a trigger for form submissions
  var trigger = ScriptApp.newTrigger('onFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create();
  
  console.log("✅ 表单提交触发器已设置 / Form submission trigger created");
}

function onFormSubmit(e) {
  try {
    var form = e.source;
    var responses = e.response;
    var itemResponses = responses.getItemResponses();
    
    // Extract response data
    var responseData = {
      timestamp: responses.getTimestamp(),
      name: getResponseValue(itemResponses, 0),
      attendance: getResponseValue(itemResponses, 1),
      dietary: getResponseValue(itemResponses, 2),
      allergies: getResponseValue(itemResponses, 3),
      contact: getResponseValue(itemResponses, 4),
      arrival: getResponseValue(itemResponses, 5),
      notes: getResponseValue(itemResponses, 6)
    };
    
    // Send notification email
    sendSubmissionNotification(responseData);
    
  } catch (error) {
    console.error("❌ 处理表单提交时出错 / Error processing form submission:", error);
  }
}

function getResponseValue(itemResponses, index) {
  if (index < itemResponses.length) {
    return itemResponses[index].getResponse();
  }
  return "";
}

function sendSubmissionNotification(responseData) {
  var subject = "New RSVP Submission - " + EVENT_NAME;
  
  var body = "New RSVP Submission:\n\n" +
    "Name: " + responseData.name + "\n" +
    "Attending: " + responseData.attendance + "\n" +
    "Dietary preference: " + (responseData.dietary || "No preference") + "\n" +
    "Allergies: " + (responseData.allergies || "None") + "\n" +
    "Contact: " + responseData.contact + "\n" +
    "Arrival time: " + (responseData.arrival || "Not specified") + "\n" +
    "Notes: " + (responseData.notes || "None") + "\n\n" +
    "Submitted at: " + responseData.timestamp;
  
  GmailApp.sendEmail(ORGANIZER_EMAIL, subject, body);
  console.log("📧 Notification email sent");
}

function sendNotificationEmail(subjectText, formUrl, embedUrl) {
  var subject = subjectText;
  
  var body = "RSVP Form Created Successfully!\n\n" +
    "Form URL: " + formUrl + "\n" +
    "Embed URL: " + embedUrl + "\n\n" +
    "Please copy the embed URL to the FORM_EMBED_URL variable in config.js file.\n\n" +
    "---\n" +
    "Created by RSVP Invite Package";

  GmailApp.sendEmail(ORGANIZER_EMAIL, subject, body);
}

function testFormCreation() {
  // Test function to verify configuration
  console.log("Testing configuration...");
  
  if (ORGANIZER_EMAIL === "your-email@example.com") {
    throw new Error("❌ 请更新ORGANIZER_EMAIL变量 / Please update ORGANIZER_EMAIL variable");
  }
  
  if (BANNER_IMAGE_FILE_ID === "YOUR_BANNER_FILE_ID") {
    console.warn("⚠️ 请更新BANNER_IMAGE_FILE_ID变量 / Please update BANNER_IMAGE_FILE_ID variable");
  }
  
  console.log("✅ 配置检查通过 / Configuration check passed");
}
// Google Sheets Integration for Custom Form
// 自定义表单的Google Sheets集成

// Configuration - 已更新配置
var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // 将在createSpreadsheet()函数中自动设置
var SHEET_NAME = "RSVP Responses";
var ORGANIZER_EMAIL = "premawang@sellerylive.com"; // 主要通知邮箱
var BACKUP_EMAIL = "tianluoboding@gmail.com"; // 备用通知邮箱

// 自动创建电子表格的函数（如果还没有的话）
function createSpreadsheetIfNeeded() {
  if (SPREADSHEET_ID === "YOUR_SPREADSHEET_ID") {
    console.log("请先更新SPREADSHEET_ID配置");
    return null;
  }
  
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // 设置表头
      const headers = [
        "Timestamp", "Full Name", "Attending", "Dietary Preference", 
        "Allergies", "Contact Method", "Arrival Time", "Notes to Organizer"
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
      sheet.getRange(1, 1, 1, headers.length).setBackground("#f0f0f0");
      sheet.autoResizeColumns(1, headers.length);
    }
    
    return sheet;
  } catch (error) {
    console.error("无法访问电子表格，请检查SPREADSHEET_ID:", error);
    return null;
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: "Google Apps Script is working!",
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Function to handle form submission
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp
    data.timestamp = new Date().toISOString();
    
    // Save to Google Sheets
    const result = saveToSheet(data);
    
    // Send notification email
    sendNotificationEmail(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({success: true, id: result}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to save data to Google Sheets
function saveToSheet(data) {
  try {
    // 确保电子表格存在
    const sheet = createSpreadsheetIfNeeded();
    if (!sheet) {
      throw new Error("无法访问电子表格");
    }
    
    // 添加新行数据
    const newRow = [
      data.timestamp,
      data.name,
      data.attending,
      data.dietary || "",
      data.allergies || "",
      data.contact,
      data.arrival || "",
      data.notes || ""
    ];
    
    sheet.appendRow(newRow);
    
    return "Row added successfully";
    
  } catch (error) {
    console.error('Error saving to sheet:', error);
    throw error;
  }
}

// Function to send notification email
function sendNotificationEmail(data) {
  try {
    const subject = "New RSVP Submission - Sellery NYC Anniversary";
    
    const body = `New RSVP Submission:

Name: ${data.name}
Attending: ${data.attending}
Dietary Preference: ${data.dietary || "No preference"}
Allergies: ${data.allergies || "None"}
Contact: ${data.contact}
Arrival Time: ${data.arrival || "Not specified"}
Notes: ${data.notes || "None"}

Submitted at: ${data.timestamp}

---
Sellery NYC Anniversary Celebration RSVP System`;

    // 发送到主要邮箱
    GmailApp.sendEmail(ORGANIZER_EMAIL, subject, body);
    console.log("Notification email sent to primary email:", ORGANIZER_EMAIL);
    
    // 发送到备用邮箱
    try {
      GmailApp.sendEmail(BACKUP_EMAIL, subject, body);
      console.log("Notification email sent to backup email:", BACKUP_EMAIL);
    } catch (backupError) {
      console.warn("Failed to send to backup email:", backupError);
    }
    
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

// 测试配置的函数
function testConfiguration() {
  console.log("=== 配置测试 ===");
  console.log("电子表格ID:", SPREADSHEET_ID);
  console.log("工作表名称:", SHEET_NAME);
  console.log("主要邮箱:", ORGANIZER_EMAIL);
  console.log("备用邮箱:", BACKUP_EMAIL);
  
  try {
    // 测试电子表格访问
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    console.log("✅ 电子表格访问成功:", spreadsheet.getName());
    
    // 测试工作表
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) {
      console.log("⚠️ 工作表不存在，将自动创建");
      sheet = createSpreadsheetIfNeeded();
    }
    
    if (sheet) {
      console.log("✅ 工作表访问成功:", sheet.getName());
    }
    
    return {
      success: true,
      message: "配置测试通过",
      spreadsheet: spreadsheet.getName(),
      sheet: sheet ? sheet.getName() : "将自动创建"
    };
    
  } catch (error) {
    console.error("❌ 配置测试失败:", error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

// Function to create the spreadsheet (run this once to set up)
function createSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.create("Sellery NYC Anniversary RSVP Responses");
    const sheet = spreadsheet.getActiveSheet();
    
    // 自动设置SPREADSHEET_ID
    SPREADSHEET_ID = spreadsheet.getId();
    
    console.log("✅ 新电子表格创建成功!");
    console.log("电子表格ID:", SPREADSHEET_ID);
    console.log("电子表格URL:", spreadsheet.getUrl());
    console.log("请复制这个ID到配置中:", SPREADSHEET_ID);
    
    // Add headers
    const headers = [
      "Timestamp",
      "Full Name", 
      "Attending",
      "Dietary Preference",
      "Allergies",
      "Contact Method",
      "Arrival Time",
      "Notes"
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.getRange(1, 1, 1, headers.length).setBackground("#f0f0f0");
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, headers.length);
    
    console.log("Spreadsheet created successfully!");
    console.log("Spreadsheet ID:", spreadsheet.getId());
    console.log("Spreadsheet URL:", spreadsheet.getUrl());
    
    return {
      id: spreadsheet.getId(),
      url: spreadsheet.getUrl()
    };
    
  } catch (error) {
    console.error("Error creating spreadsheet:", error);
    throw error;
  }
}

// Function to test the integration
function testIntegration() {
  const testData = {
    name: "Test User",
    attending: "Yes",
    dietary: "Vegetarian",
    allergies: "None",
    contact: "test@example.com",
    arrival: "On time",
    notes: "Test submission"
  };
  
  try {
    const result = saveToSheet(testData);
    console.log("Test successful:", result);
    return result;
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}

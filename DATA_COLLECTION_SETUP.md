# 📊 数据收集设置指南

## 🎯 目标
将RSVP表单数据自动保存到Google Sheets，并发送邮件通知。

## 📋 设置步骤

### 步骤1：创建Google Sheets
1. 访问 [sheets.google.com](https://sheets.google.com)
2. 点击"空白"创建新电子表格
3. 命名为 "Sellery NYC Anniversary RSVP Responses"
4. 从URL中复制电子表格ID
   - URL格式：`https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit`
   - 例如：`1ABC123DEF456GHI789JKL012MNO345PQR678STU901VWX234YZA567BCD890EFG`

### 步骤2：设置Google Apps Script
1. 访问 [script.google.com](https://script.google.com)
2. 点击"新项目"
3. 删除默认代码，复制 `apps_script/sheets_integration.gs` 的全部内容
4. 更新配置：
   ```javascript
   var SPREADSHEET_ID = "你的电子表格ID"; // 从步骤1获取
   var ORGANIZER_EMAIL = "你的邮箱@gmail.com"; // 你的邮箱
   ```

### 步骤3：部署为Web应用
1. 在Apps Script编辑器中，点击"部署" > "新建部署"
2. 选择类型："Web应用"
3. 设置：
   - 执行身份：我
   - 访问权限：任何人
4. 点击"部署"
5. 复制Web应用URL（类似：`https://script.google.com/macros/s/ABC123.../exec`）

### 步骤4：更新表单代码
1. 打开 `public/custom-form.html`
2. 找到这行：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
   ```
3. 替换为你的Web应用URL：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/你的脚本ID/exec';
   ```

### 步骤5：测试
1. 提交表单
2. 检查Google Sheets是否有新数据
3. 检查邮箱是否有通知邮件

## 🔧 故障排除

### 问题1：权限错误
- 确保Apps Script有访问Google Sheets的权限
- 重新授权权限

### 问题2：CORS错误
- 确保Web应用设置为"任何人"可访问
- 检查URL是否正确

### 问题3：数据格式错误
- 检查表单字段名称是否匹配
- 查看Apps Script日志

## 📊 数据字段
表单数据会保存到以下列：
- Timestamp（时间戳）
- Full Name（姓名）
- Attending（是否参加）
- Dietary Preference（饮食偏好）
- Allergies（过敏信息）
- Contact Method（联系方式）
- Arrival Time（到达时间）
- Notes to Organizer（备注）

## 📧 邮件通知
每次提交都会发送邮件到 `ORGANIZER_EMAIL`，包含：
- 提交者姓名
- 参加状态
- 联系方式
- 其他信息

## 🎉 完成！
设置完成后，所有RSVP数据都会自动保存到Google Sheets！

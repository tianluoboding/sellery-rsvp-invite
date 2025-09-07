# 📧 EmailJS设置指南

## 🎯 为什么选择EmailJS？
- ✅ **无需Google Sheets权限**
- ✅ **直接发送邮件通知**
- ✅ **免费使用（每月200封邮件）**
- ✅ **简单可靠**
- ✅ **无需服务器**

## 📋 设置步骤

### 步骤1：注册EmailJS账户
1. 访问 [emailjs.com](https://www.emailjs.com/)
2. 点击"Sign Up"注册账户
3. 验证邮箱

### 步骤2：创建邮件服务
1. 登录后，点击"Email Services"
2. 点击"Add New Service"
3. 选择"Gmail"（推荐）
4. 连接您的Gmail账户
5. 复制**Service ID**（类似：`service_xxxxxxx`）

### 步骤3：创建邮件模板
1. 点击"Email Templates"
2. 点击"Create New Template"
3. 设置模板：

**模板内容：**
```
Subject: New RSVP Submission - Sellery NYC Anniversary

Hello {{to_name}},

You have received a new RSVP submission for the Sellery NYC Anniversary Celebration:

Name: {{from_name}}
Attending: {{attending}}
Dietary Preference: {{dietary}}
Allergies: {{allergies}}
Contact Method: {{contact}}
Arrival Time: {{arrival}}
Notes: {{notes}}

Submitted at: {{timestamp}}

Best regards,
Sellery NYC Anniversary RSVP System
```

4. 保存模板
5. 复制**Template ID**（类似：`template_xxxxxxx`）

### 步骤4：获取公钥
1. 点击"Account" → "General"
2. 复制**Public Key**（类似：`xxxxxxxxxxxxxxxx`）

### 步骤5：更新表单配置
在 `public/custom-form.html` 中更新：

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // 您的服务ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'; // 您的模板ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxxx'; // 您的公钥
```

## 🧪 测试步骤

### 1. 更新配置
将您的EmailJS配置信息填入表单

### 2. 测试提交
- 填写表单
- 点击提交
- 检查邮箱是否收到通知

### 3. 检查控制台
- 按F12打开开发者工具
- 查看Console标签
- 应该看到"✅ 邮件发送成功"

## 📊 数据收集

**每次RSVP提交会发送邮件到：**
- `premawang@sellerylive.com`

**邮件包含：**
- 提交者姓名
- 参加状态
- 饮食偏好
- 过敏信息
- 联系方式
- 到达时间
- 备注
- 提交时间

## 🔧 故障排除

### 问题1：邮件发送失败
- 检查Service ID、Template ID、Public Key是否正确
- 确保Gmail账户已正确连接
- 检查邮箱是否在垃圾邮件文件夹

### 问题2：模板变量不显示
- 确保模板中的变量名与代码中的一致
- 检查变量名是否用双大括号包围：`{{variable_name}}`

### 问题3：权限错误
- 确保EmailJS服务已正确配置
- 检查公钥是否正确

## 🎉 完成！

设置完成后，所有RSVP数据都会通过邮件发送给您，无需Google Sheets权限！

## 💡 额外功能

### 自动回复
可以设置自动回复邮件给提交者：

```javascript
// 发送确认邮件给提交者
const confirmParams = {
    to_email: data.contact, // 使用联系方式作为邮箱
    to_name: data.name,
    event_name: 'Sellery NYC Anniversary Celebration',
    event_date: 'September 12th, 2025',
    event_time: '6:00–11:00 PM'
};

emailjs.send(EMAILJS_SERVICE_ID, 'template_confirmation', confirmParams);
```

### 多收件人
可以同时发送给多个邮箱：

```javascript
const emails = ['premawang@sellerylive.com', 'tianluoboding@gmail.com'];
emails.forEach(email => {
    templateParams.to_email = email;
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
});
```

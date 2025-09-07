# 🎨 自定义表单设置指南 / Custom Form Setup Guide

## 📋 概述 / Overview

这个自定义表单提供了：
- ✨ 时尚简约的设计
- 🎯 完美的Logo和背景展示
- 📱 完全响应式设计
- 💾 自动保存到Google Sheets
- 📧 邮件通知功能

## 🚀 设置步骤 / Setup Steps

### 步骤1：创建Google Sheets / Step 1: Create Google Sheets

1. **创建新的Apps Script项目**
   - 访问 [script.google.com](https://script.google.com)
   - 创建新项目，命名为 "Sellery RSVP Integration"

2. **复制集成代码**
   - 删除默认代码
   - 复制 `apps_script/sheets_integration.gs` 的内容

3. **运行设置函数**
   ```javascript
   // 在Apps Script编辑器中运行
   createSpreadsheet()
   ```
   - 这会创建Google Sheets并显示ID
   - 复制返回的Spreadsheet ID

### 步骤2：配置Apps Script / Step 2: Configure Apps Script

1. **更新配置变量**
   ```javascript
   var SPREADSHEET_ID = "YOUR_SPREADSHEET_ID"; // 粘贴步骤1获得的ID
   var ORGANIZER_EMAIL = "tianluoboding@gmail.com";
   ```

2. **部署为Web应用**
   - 点击"部署" → "新建部署"
   - 类型选择"Web应用"
   - 执行身份选择"我"
   - 访问权限选择"任何人"
   - 点击"部署"
   - 复制Web应用URL

### 步骤3：配置自定义表单 / Step 3: Configure Custom Form

1. **更新Google Script URL**
   - 打开 `public/custom-form.html`
   - 找到第473行：
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
   ```
   - 替换为步骤2获得的Web应用URL

2. **更新Logo路径**
   - 确保 `./assets/logo.png` 存在
   - 或修改第295行的路径：
   ```html
   <img src="./assets/logo.png" alt="Sellery NYC Logo" class="logo">
   ```

### 步骤4：测试表单 / Step 4: Test Form

1. **本地测试**
   - 在浏览器中打开 `custom-form.html`
   - 填写测试数据并提交

2. **检查Google Sheets**
   - 查看数据是否正确保存
   - 检查邮件通知是否收到

## 🎨 设计特性 / Design Features

### 视觉设计 / Visual Design
- **渐变背景**：紫色到蓝色的现代渐变
- **玻璃拟态效果**：半透明卡片设计
- **平滑动画**：淡入、滚动、悬停效果
- **响应式布局**：完美适配所有设备

### 用户体验 / User Experience
- **分屏设计**：介绍区域 + 表单区域
- **平滑滚动**：点击箭头自动滚动到表单
- **实时反馈**：加载状态、成功提示
- **表单验证**：必填字段验证

## 🔧 自定义选项 / Customization Options

### 颜色主题 / Color Theme
```css
/* 在custom-form.html中修改这些颜色 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
border-color: #667eea;
```

### 字体 / Fonts
```css
/* 当前使用Inter字体，可以替换为其他字体 */
font-family: 'Inter', sans-serif;
```

### Logo和背景 / Logo and Background
- 替换 `./assets/logo.png` 为您的Logo
- 修改CSS中的背景渐变颜色
- 调整Logo大小：修改 `.logo` 的 `max-width`

## 📊 数据管理 / Data Management

### Google Sheets结构 / Google Sheets Structure
| 列名 | 描述 |
|------|------|
| Timestamp | 提交时间 |
| Full Name | 姓名 |
| Attending | 是否参加 |
| Dietary Preference | 饮食偏好 |
| Allergies | 过敏信息 |
| Contact Method | 联系方式 |
| Arrival Time | 到达时间 |
| Notes | 备注 |

### 邮件通知 / Email Notifications
- 每次提交自动发送邮件到组织者
- 包含所有表单数据
- 时间戳记录

## 🚀 部署选项 / Deployment Options

### 选项1：GitHub Pages
1. 上传文件到GitHub仓库
2. 启用GitHub Pages
3. 访问 `https://yourusername.github.io/repository-name/custom-form.html`

### 选项2：Vercel
1. 连接GitHub仓库到Vercel
2. 设置根目录为 `public`
3. 自动部署

### 选项3：Netlify
1. 拖拽 `public` 文件夹到Netlify
2. 设置自定义域名（可选）

## 🐛 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **表单提交失败**
   - 检查Google Script URL是否正确
   - 确认Apps Script已部署为Web应用
   - 检查浏览器控制台错误

2. **数据未保存到Sheets**
   - 确认Spreadsheet ID正确
   - 检查Apps Script权限
   - 运行 `testIntegration()` 函数测试

3. **邮件通知未收到**
   - 检查ORGANIZER_EMAIL设置
   - 查看垃圾邮件文件夹
   - 确认Gmail API权限

4. **Logo不显示**
   - 检查图片路径是否正确
   - 确认图片文件存在
   - 检查文件权限

## 📞 支持 / Support

如有问题，请：
1. 检查浏览器控制台错误
2. 查看Apps Script执行日志
3. 确认所有配置步骤已完成

---

**享受您的时尚RSVP表单！** 🎉

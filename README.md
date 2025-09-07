# RSVP Invite Package / RSVP邀请包

一个完整的活动邀请解决方案，包含精美的移动优先邀请页面和自动化的Google表单创建系统。

A complete event invitation solution featuring a beautiful mobile-first invite page and automated Google Form creation system.

## 📋 功能特性 / Features

- 🎨 **三个主题预设** / Three theme presets: Warm Pastel, Party Pop, Formal Minimal
- 🌐 **双语支持** / Bilingual support: 中文/English with easy toggle
- 📱 **移动优先设计** / Mobile-first responsive design
- 🎯 **嵌入式Google表单** / Embedded Google Form with conditional logic
- 📧 **自动邮件通知** / Automatic email notifications for organizers
- ♿ **无障碍访问** / Accessibility features (WCAG compliant)
- 🎉 **节日氛围** / Festive confetti background
- 📊 **响应数据管理** / Response data management in Google Sheets

## 🚀 快速开始 / Quick Start

### 步骤1: 创建Google表单 / Step 1: Create Google Form

1. **访问Google Apps Script** / Go to Google Apps Script
   - 打开 [script.google.com](https://script.google.com)
   - 点击"新建项目" / Click "New Project"

2. **配置脚本** / Configure the Script
   - 删除默认代码，粘贴 `apps_script/create_form.gs` 的内容
   - 更新配置变量：
     ```javascript
     const ORGANIZER_EMAIL = "your-email@example.com"; // 你的邮箱
     const BANNER_IMAGE_FILE_ID = "YOUR_BANNER_FILE_ID"; // 横幅图片文件ID
     ```

3. **上传横幅图片** / Upload Banner Image
   - 访问 [drive.google.com](https://drive.google.com)
   - 上传 `assets/banner.jpg` 到Google Drive
   - 右键点击文件 → 共享 → 复制链接
   - 从URL中提取文件ID（在 `/d/` 和 `/view` 之间）
   - 将文件ID粘贴到 `BANNER_IMAGE_FILE_ID` 变量中

4. **运行脚本** / Run the Script
   - 点击"运行"按钮 / Click "Run" button
   - 授权脚本访问权限 / Authorize script permissions
   - 查看日志中的表单URL / Check logs for form URLs

5. **复制嵌入URL** / Copy Embed URL
   - 从日志中复制嵌入URL
   - 将URL粘贴到 `public/config.js` 中的 `FORM_EMBED_URL` 变量

### 步骤2: 配置活动信息 / Step 2: Configure Event Details

编辑 `public/config.js` 文件中的活动变量：

```javascript
const EVENT_CONFIG = {
  EVENT_NAME: "Friends Gathering · 一周年小聚",
  DATE_TEXT: "Sat, Oct 12, 2025 · 5:00–8:30 PM",
  VENUE_NAME: "Riverside Park Lawn",
  ADDRESS: "123 Riverside Dr, New York, NY",
  // ... 其他变量
};
```

### 步骤3: 本地预览 / Step 3: Local Preview

1. **简单预览** / Simple Preview
   - 直接在浏览器中打开 `public/index.html`

2. **本地服务器** / Local Server (推荐)
   ```bash
   # 使用Python
   cd public
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve public
   ```

### 步骤4: 部署 / Step 4: Deploy

#### 选项A: GitHub Pages / Option A: GitHub Pages

1. **创建GitHub仓库** / Create GitHub Repository
   - 在GitHub上创建新仓库
   - 上传所有文件到仓库

2. **启用GitHub Pages** / Enable GitHub Pages
   - 进入仓库设置 / Go to repository settings
   - 滚动到"Pages"部分 / Scroll to "Pages" section
   - 选择"Deploy from a branch" / Select "Deploy from a branch"
   - 选择"main"分支和"/ (root)"文件夹 / Select "main" branch and "/ (root)" folder

3. **访问网站** / Access Website
   - 网站将在 `https://yourusername.github.io/repository-name` 可用

#### 选项B: Vercel / Option B: Vercel

1. **访问Vercel** / Go to Vercel
   - 打开 [vercel.com](https://vercel.com)
   - 使用GitHub账户登录

2. **导入项目** / Import Project
   - 点击"New Project"
   - 选择你的GitHub仓库
   - 选择 `public` 文件夹作为根目录

3. **部署** / Deploy
   - 点击"Deploy"
   - 等待部署完成

## 📁 项目结构 / Project Structure

```
Invitation/
├── public/                 # 前端文件 / Frontend files
│   ├── index.html         # 主页面 / Main page
│   ├── styles.css         # 样式文件 / Styles
│   ├── script.js          # JavaScript逻辑 / JavaScript logic
│   ├── config.js          # 配置变量 / Configuration variables
│   └── assets/            # 资源文件 / Assets
│       ├── banner.jpg     # 横幅图片 / Banner image
│       ├── logo.png       # Logo图片 / Logo image
│       ├── confetti.svg   # 彩纸背景 / Confetti background
│       └── favicon.ico    # 网站图标 / Website icon
├── apps_script/           # Google Apps Script
│   └── create_form.gs     # 表单创建脚本 / Form creation script
└── README.md              # 说明文档 / Documentation
```

## 🎨 主题定制 / Theme Customization

### 切换主题 / Switch Themes

在HTML中修改 `data-theme` 属性：

```html
<!-- Warm Pastel (默认) -->
<html data-theme="warm-pastel">

<!-- Party Pop -->
<html data-theme="party-pop">

<!-- Formal Minimal -->
<html data-theme="formal-minimal">
```

### 自定义颜色 / Custom Colors

编辑 `styles.css` 中的CSS变量：

```css
:root {
  --primary-color: #6C5CE7;    /* 主色调 */
  --secondary-color: #A29BFE;  /* 次要色调 */
  --accent-color: #FD79A8;     /* 强调色 */
  /* ... 其他颜色变量 */
}
```

## 📝 Google表单配置 / Google Form Configuration

### 表单问题 / Form Questions

脚本会自动创建以下问题：

1. **是否参加** / Are you attending? (必填)
   - 选项：Yes, Maybe, No
   
2. **姓名** / Full name (必填)
   
3. **参加人数** / Number of guests (条件显示)
   - 仅在选择"Yes"时显示
   
4. **饮食偏好** / Dietary preference (条件显示)
   - 选项：无特殊要求, 素食, 纯素食, 清真, 其他
   
5. **联系方式** / Contact method (必填)
   - 提示：微信号或电话号码
   
6. **到达时间** / Arrival time (可选)
   
7. **点歌** / Song request (可选)
   
8. **留言** / Notes to organizer (可选)

### 表单设置 / Form Settings

- ✅ 收集邮箱地址
- ✅ 限制每人一次回复
- ✅ 允许编辑回复
- ✅ 显示进度条
- ✅ 链接到Google表格

## 📧 邮件通知 / Email Notifications

### 组织者通知 / Organizer Notifications

每次有人提交RSVP时，组织者会收到包含以下信息的邮件：

- 提交者姓名和邮箱
- 是否参加
- 参加人数
- 饮食偏好
- 联系方式
- 其他详细信息

### 配置通知 / Configure Notifications

在 `create_form.gs` 中更新：

```javascript
const ORGANIZER_EMAIL = "your-email@example.com";
```

## 🔧 维护和更新 / Maintenance & Updates

### 编辑表单问题 / Edit Form Questions

1. **通过Google Forms界面** / Via Google Forms UI
   - 访问表单URL
   - 点击"编辑表单"
   - 手动修改问题

2. **重新运行脚本** / Re-run Script
   - 修改 `create_form.gs` 中的问题
   - 重新运行 `main()` 函数
   - ⚠️ 注意：这会创建新表单

### 更新活动信息 / Update Event Information

1. 编辑 `public/config.js` 中的变量
2. 重新部署网站
3. 如需更新表单，重新运行Apps Script

### 查看回复数据 / View Response Data

- 访问链接的Google表格
- 数据会自动更新
- 可以导出为Excel或CSV格式

## 🐛 故障排除 / Troubleshooting

### 常见问题 / Common Issues

1. **表单无法显示** / Form not displaying
   - 检查 `FORM_EMBED_URL` 是否正确
   - 确保表单已发布
   - 检查网络连接

2. **邮件通知未收到** / No email notifications
   - 检查 `ORGANIZER_EMAIL` 是否正确
   - 查看垃圾邮件文件夹
   - 确认脚本权限已授权

3. **图片无法加载** / Images not loading
   - 检查文件路径是否正确
   - 确保图片文件存在
   - 检查文件权限

4. **主题切换不工作** / Theme switching not working
   - 检查JavaScript控制台错误
   - 确保 `script.js` 已加载
   - 检查CSS变量定义

### 调试技巧 / Debugging Tips

1. **打开浏览器开发者工具** / Open browser developer tools
   - 按F12或右键→检查元素
   - 查看控制台错误信息

2. **检查网络请求** / Check network requests
   - 在Network标签页查看失败的请求
   - 检查CORS错误

3. **验证配置** / Verify configuration
   - 运行 `testFormCreation()` 函数
   - 检查所有必需变量是否已设置

## 📚 技术栈 / Tech Stack

- **前端** / Frontend: HTML5, CSS3, Vanilla JavaScript
- **后端** / Backend: Google Apps Script
- **数据存储** / Data Storage: Google Sheets
- **邮件服务** / Email Service: Gmail API
- **部署** / Deployment: GitHub Pages, Vercel

## 📄 许可证 / License

此项目采用MIT许可证。详情请查看LICENSE文件。

This project is licensed under the MIT License. See the LICENSE file for details.

## 🤝 贡献 / Contributing

欢迎提交问题和功能请求！

Issues and feature requests are welcome!

## 📞 支持 / Support

如有问题，请：

1. 查看此README文档
2. 检查故障排除部分
3. 提交GitHub Issue

For support, please:

1. Check this README documentation
2. Review the troubleshooting section
3. Submit a GitHub Issue

---

**祝您的活动圆满成功！** / **Wishing your event great success!** 🎉

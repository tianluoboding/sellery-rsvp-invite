# 📊 Google Forms解决方案

## 🎯 为什么选择Google Forms？
- ✅ **自动汇总到Google Sheets** - 无需权限设置
- ✅ **自动邮件通知** - 每次提交发送邮件
- ✅ **完全免费** - Google服务
- ✅ **简单可靠** - 无需复杂配置
- ✅ **数据管理** - 自动排序、筛选、分析

## 📋 设置步骤

### 步骤1：创建Google Form
1. 访问 [forms.google.com](https://forms.google.com)
2. 点击"空白"创建新表单
3. 设置标题："🎉 Join Sellery NYC's Anniversary Celebration! 🎉"

### 步骤2：添加问题
按照以下顺序添加问题：

#### 问题1：您的姓名
- 类型：简答题
- 必填：是
- 问题："Your Full Name"

#### 问题2：是否参加
- 类型：单选题
- 必填：是
- 问题："Are you attending?"
- 选项：
  - Yes
  - Maybe
  - No

#### 问题3：饮食偏好
- 类型：简答题
- 必填：否
- 问题："Dietary Preference"
- 说明："e.g., Vegetarian, Vegan, No restrictions"

#### 问题4：过敏信息
- 类型：简答题
- 必填：否
- 问题："Allergies"
- 说明："Please list any allergies"

#### 问题5：联系方式
- 类型：简答题
- 必填：是
- 问题："Contact Method"
- 说明："WeChat ID, Phone number, or Email"

#### 问题6：到达时间
- 类型：单选题
- 必填：否
- 问题："Arrival Time"
- 选项：
  - On time
  - A bit late
  - Not sure

#### 问题7：备注
- 类型：段落
- 必填：否
- 问题："Notes to Organizer"
- 说明："Any special requests or comments?"

### 步骤3：设置表单选项
1. 点击右上角"设置"齿轮图标
2. 设置：
   - ✅ 收集电子邮件地址
   - ✅ 限制为每个用户一个回复
   - ✅ 显示进度条
   - ✅ 显示链接以再次回复

### 步骤4：设置确认消息
在"设置" → "演示文稿"中：
- 确认消息："✅ Thank you! Your RSVP has been submitted successfully."

### 步骤5：获取嵌入链接
1. 点击"发送"按钮
2. 点击"嵌入"图标（<>）
3. 复制嵌入代码
4. 获取嵌入URL（类似：`https://docs.google.com/forms/d/e/1FAIpQLS.../viewform?embedded=true`）

### 步骤6：更新表单页面
在 `public/custom-form.html` 中：

```html
<!-- 替换整个表单部分 -->
<iframe src="YOUR_GOOGLE_FORM_EMBED_URL" 
        width="100%" 
        height="800" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0">
    Loading...
</iframe>
```

## 📊 数据管理

### 自动汇总
- 所有回复自动保存到Google Sheets
- 实时更新，无需手动操作
- 支持排序、筛选、图表分析

### 邮件通知
- 每次提交自动发送邮件到您的邮箱
- 包含所有提交信息
- 可设置多个收件人

### 数据分析
- 参加人数统计
- 饮食偏好分析
- 到达时间分布
- 导出Excel/CSV

## 🎨 自定义样式

### 方法1：使用Google Forms主题
1. 点击"自定义主题"
2. 选择颜色和字体
3. 上传公司Logo

### 方法2：嵌入到自定义页面
- 保持现有的美观设计
- 只替换表单部分为iframe
- 保持响应式设计

## 🚀 实施建议

### 快速实施（推荐）
1. 创建Google Form（5分钟）
2. 获取嵌入链接（1分钟）
3. 更新HTML文件（1分钟）
4. 测试提交（1分钟）

### 保持现有设计
- 只替换表单部分
- 保持页面其他元素不变
- 保持响应式设计

## 🎉 优势总结

- ✅ **自动数据汇总** - 无需手动整理
- ✅ **实时通知** - 每次提交都有邮件
- ✅ **简单可靠** - Google服务，稳定可靠
- ✅ **数据分析** - 内置图表和统计
- ✅ **免费使用** - 完全免费
- ✅ **易于管理** - 一个地方管理所有数据

这个方案解决了您提到的数据汇总问题，同时保持了简单可靠的特点！

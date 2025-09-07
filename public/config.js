// Event Configuration Variables
// 事件配置变量 - 在此处修改所有事件相关信息

const EVENT_CONFIG = {
  // Event Details / 活动详情
  EVENT_NAME: "🎉 Join Sellery NYC's Anniversary Celebration! 🎉",
  DATE_TEXT: "Fri, Sep 12, 2025 · 6:00–11:00 PM",
  VENUE_NAME: "265 West 37th Street Suite 203",
  ADDRESS: "265 West 37th Street Suite 203",
  MAP_URL: "https://maps.google.com/?q=265+West+37th+Street+Suite+203",
  HOSTS: "Sellery NYC Team",
  DRESS_CODE: "Smart casual",
  RSVP_DEADLINE: "Sep 5, 2025",
  CONTACT: "WeChat: kyle_t · Phone: (xxx) xxx-xxxx",
  
  // Hero Taglines / 主标语
  HERO_TAGLINE_ZH: "我们要团建啦，一起来庆祝！",
  HERO_TAGLINE_EN: "Let's get together and celebrate!",
  
  // Google Form Integration / Google表单集成
  // 在运行Apps Script后，将生成的嵌入URL粘贴到这里
  FORM_EMBED_URL: "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true",
  
  // Theme Settings / 主题设置
  DEFAULT_THEME: "warm-pastel", // warm-pastel, party-pop, formal-minimal
  
  // Schedule Items / 活动流程
  SCHEDULE_ZH: [
    "5:00 PM - 欢迎签到",
    "5:30 PM - 破冰游戏",
    "6:00 PM - 晚餐时间",
    "7:00 PM - 团队分享",
    "8:00 PM - 自由交流",
    "8:30 PM - 活动结束"
  ],
  SCHEDULE_EN: [
    "5:00 PM - Welcome & Check-in",
    "5:30 PM - Ice Breaker Games",
    "6:00 PM - Dinner Time",
    "7:00 PM - Team Sharing",
    "8:00 PM - Free Networking",
    "8:30 PM - Event Ends"
  ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EVENT_CONFIG;
}

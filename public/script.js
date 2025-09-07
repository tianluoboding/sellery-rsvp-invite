// RSVP Invite Page JavaScript
// 处理语言切换、主题切换、表单集成等功能

class RSVPInvite {
  constructor() {
    this.currentLang = 'zh';
    this.currentTheme = 'warm-pastel';
    this.themes = ['warm-pastel', 'party-pop', 'formal-minimal'];
    this.themeIndex = 0;
    
    this.init();
  }

  init() {
    this.setupLanguageToggle();
    this.setupThemeToggle();
    this.populateSchedule();
    this.updateFormEmbed();
    this.setupAccessibility();
    this.setupAnimations();
  }

  // Language Toggle Functionality
  setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langSpans = langToggle.querySelectorAll('span');
    
    langToggle.addEventListener('click', () => {
      this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
      this.updateLanguage();
      
      // Update toggle button text
      langSpans.forEach(span => {
        const isVisible = span.dataset.lang === this.currentLang;
        span.style.display = isVisible ? 'none' : 'inline';
      });
    });
  }

  updateLanguage() {
    // Update all elements with data-zh and data-en attributes
    const elements = document.querySelectorAll('[data-zh][data-en]');
    elements.forEach(element => {
      const text = element.dataset[this.currentLang];
      if (text) {
        element.textContent = text;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
    
    // Update page title
    const title = this.currentLang === 'zh' 
      ? 'Friends Gathering · 一周年小聚 - RSVP'
      : 'Friends Gathering · Anniversary Celebration - RSVP';
    document.title = title;
  }

  // Theme Toggle Functionality
  setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
      this.themeIndex = (this.themeIndex + 1) % this.themes.length;
      this.currentTheme = this.themes[this.themeIndex];
      
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      
      // Update theme icon based on current theme
      const themeIcon = themeToggle.querySelector('.theme-icon');
      const icons = ['🎨', '🎉', '💼'];
      themeIcon.textContent = icons[this.themeIndex];
      
      // Store theme preference
      localStorage.setItem('rsvp-theme', this.currentTheme);
    });

    // Load saved theme preference
    const savedTheme = localStorage.getItem('rsvp-theme');
    if (savedTheme && this.themes.includes(savedTheme)) {
      this.currentTheme = savedTheme;
      this.themeIndex = this.themes.indexOf(savedTheme);
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      
      const themeIcon = themeToggle.querySelector('.theme-icon');
      const icons = ['🎨', '🎉', '💼'];
      themeIcon.textContent = icons[this.themeIndex];
    }
  }

  // Populate Schedule from Config
  populateSchedule() {
    const scheduleList = document.getElementById('schedule-list');
    if (!scheduleList) return;

    // Get schedule from config or use default
    const schedule = EVENT_CONFIG ? 
      (this.currentLang === 'zh' ? EVENT_CONFIG.SCHEDULE_ZH : EVENT_CONFIG.SCHEDULE_EN) :
      (this.currentLang === 'zh' ? [
        "5:00 PM - 欢迎签到",
        "5:30 PM - 破冰游戏", 
        "6:00 PM - 晚餐时间",
        "7:00 PM - 团队分享",
        "8:00 PM - 自由交流",
        "8:30 PM - 活动结束"
      ] : [
        "5:00 PM - Welcome & Check-in",
        "5:30 PM - Ice Breaker Games",
        "6:00 PM - Dinner Time", 
        "7:00 PM - Team Sharing",
        "8:00 PM - Free Networking",
        "8:30 PM - Event Ends"
      ]);

    scheduleList.innerHTML = '';
    schedule.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      scheduleList.appendChild(li);
    });
  }

  // Update Form Embed URL from Config
  updateFormEmbed() {
    if (!EVENT_CONFIG || !EVENT_CONFIG.FORM_EMBED_URL) return;

    const formIframe = document.getElementById('rsvp-form');
    const fallbackLink = document.querySelector('.fallback-link');
    
    if (formIframe && EVENT_CONFIG.FORM_EMBED_URL !== 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true') {
      formIframe.src = EVENT_CONFIG.FORM_EMBED_URL;
    }
    
    if (fallbackLink && EVENT_CONFIG.FORM_EMBED_URL !== 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true') {
      const formUrl = EVENT_CONFIG.FORM_EMBED_URL.replace('?embedded=true', '');
      fallbackLink.href = formUrl;
    }
  }

  // Accessibility Features
  setupAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content ID
    const container = document.querySelector('.container');
    if (container) {
      container.id = 'main-content';
    }

    // Keyboard navigation for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        themeToggle.click();
      }
    });

    // Announce theme changes to screen readers
    const announceThemeChange = (theme) => {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Theme changed to ${theme}`;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    };

    const originalThemeToggle = themeToggle.click;
    themeToggle.click = function() {
      originalThemeToggle.call(this);
      announceThemeChange(this.currentTheme);
    };
  }

  // Smooth Animations
  setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Add animation styles to cards
    const animatedElements = document.querySelectorAll('.info-card, .schedule-card, .rsvp-card, .footer');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Calendar Integration (ICS Download)
  generateICS() {
    if (!EVENT_CONFIG) return;

    const eventData = {
      title: EVENT_CONFIG.EVENT_NAME,
      startDate: '20251012T170000', // Oct 12, 2025 5:00 PM
      endDate: '20251012T203000',   // Oct 12, 2025 8:30 PM
      location: `${EVENT_CONFIG.VENUE_NAME}, ${EVENT_CONFIG.ADDRESS}`,
      description: `Join us for ${EVENT_CONFIG.EVENT_NAME}! RSVP by ${EVENT_CONFIG.RSVP_DEADLINE}.`
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RSVP Invite//Event//EN
BEGIN:VEVENT
UID:${Date.now()}@rsvp-invite.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventData.startDate}
DTEND:${eventData.endDate}
SUMMARY:${eventData.title}
LOCATION:${eventData.location}
DESCRIPTION:${eventData.description}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${EVENT_CONFIG.EVENT_NAME.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Form Submission Detection (if possible)
  setupFormSubmissionDetection() {
    const formIframe = document.getElementById('rsvp-form');
    
    // Listen for postMessage from Google Forms
    window.addEventListener('message', (event) => {
      if (event.origin.includes('docs.google.com') && event.data) {
        // Handle form submission events if available
        console.log('Form message received:', event.data);
      }
    });

    // Alternative: Check for form completion periodically
    let checkCount = 0;
    const maxChecks = 10;
    
    const checkFormCompletion = () => {
      if (checkCount >= maxChecks) return;
      
      try {
        const iframeDoc = formIframe.contentDocument || formIframe.contentWindow.document;
        if (iframeDoc) {
          const submitButton = iframeDoc.querySelector('[type="submit"]');
          if (submitButton && submitButton.disabled) {
            this.showSubmissionToast();
            return;
          }
        }
      } catch (e) {
        // Cross-origin restrictions
      }
      
      checkCount++;
      setTimeout(checkFormCompletion, 2000);
    };

    // Start checking after iframe loads
    formIframe.addEventListener('load', () => {
      setTimeout(checkFormCompletion, 3000);
    });
  }

  // Show submission confirmation toast
  showSubmissionToast() {
    const toast = document.createElement('div');
    toast.className = 'submission-toast';
    toast.textContent = this.currentLang === 'zh' ? '提交成功！' : 'Submission successful!';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--primary-color);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      box-shadow: 0 4px 20px var(--shadow-color);
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}

// Utility Functions
const utils = {
  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.currentLang === 'zh' ? 'zh-CN' : 'en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Check if config is loaded
  if (typeof EVENT_CONFIG === 'undefined') {
    console.warn('EVENT_CONFIG not found. Using default values.');
  }
  
  // Initialize the RSVP Invite application
  window.rsvpInvite = new RSVPInvite();
  
  // Setup form submission detection
  window.rsvpInvite.setupFormSubmissionDetection();
  
  console.log('RSVP Invite page initialized successfully!');
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RSVPInvite, utils };
}

import { useEffect } from 'react';

// Google Analytics and SEO tracking
const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4 (replace GA_MEASUREMENT_ID with your actual ID)
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your Google Analytics ID
    
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Configure Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
    
    // Track page views and custom events
    const trackPageView = () => {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
      });
    };
    
    // Track scroll depth for engagement
    let maxScroll = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    };
    
    // Track time on page
    const startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      if (timeSpent > 0 && timeSpent % 30 === 0) { // Every 30 seconds
        gtag('event', 'timing_complete', {
          event_category: 'engagement',
          name: 'time_on_page',
          value: timeSpent
        });
      }
    };
    
    // Track interactions
    const trackInteraction = (element, action) => {
      gtag('event', action, {
        event_category: 'interaction',
        event_label: element,
      });
    };
    
    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth);
    const timeInterval = setInterval(trackTimeOnPage, 30000);
    
    // Track clicks on important elements
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        trackInteraction('link', 'click');
      }
      if (e.target.closest('button')) {
        trackInteraction('button', 'click');
      }
    });
    
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      clearInterval(timeInterval);
    };
  }, []);
  
  return null;
};

export default Analytics;

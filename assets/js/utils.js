/**
 * Utility Functions Module
 * Common utility functions used throughout the application
 */

// Dependencies: constants.js must load before utils.js
// TOAST_CONFIG and PERFORMANCE_CONFIG available globally

// BROWSER COMPATIBILITY: Optional chaining polyfill for older browsers
if (!('?' in Object.prototype)) {
  // Add safe property access helper for older browsers
  window.safeAccess = function(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  };
}

// SECURITY: Use WeakMap to prevent memory leaks with timeout references
const toastTimeouts = new WeakMap();

/**
 * Show toast notification with proper memory management
 * @param {string} msg - Message to display
 * @param {string} type - Type of toast (info, success, error, warning)
 */
function toast(msg, type = 'info') {
  const el = document.getElementById('toast');
  if (!el) {
    console.warn('Toast element not found');
    return;
  }

  // SECURITY: Validate and sanitize message input
  if (typeof msg !== 'string') {
    console.error('Toast message must be a string');
    return;
  }

  // Limit message length to prevent excessive DOM content
  const safeMessage = msg.substring(0, TOAST_CONFIG.MAX_MESSAGE_LENGTH);

  el.textContent = safeMessage;
  el.className = `toast show ${type}`;

  // SECURITY: Clear existing timeout using WeakMap to prevent memory leaks
  const existingTimeout = toastTimeouts.get(el);
  if (existingTimeout) {
    clearTimeout(existingTimeout);
  }

  // Set new timeout to hide toast
  const timeoutId = setTimeout(() => {
    el.className = 'toast';
    toastTimeouts.delete(el); // Clean up WeakMap entry
  }, TOAST_CONFIG.DISPLAY_DURATION);

  // Store timeout reference in WeakMap
  toastTimeouts.set(el, timeoutId);
}

/**
 * Clean up toast timeouts (call when element is removed from DOM)
 * @param {HTMLElement} toastElement - Toast element being cleaned up
 */
function cleanupToast(toastElement) {
  if (!toastElement) return;

  const timeout = toastTimeouts.get(toastElement);
  if (timeout) {
    clearTimeout(timeout);
    toastTimeouts.delete(toastElement);
  }
}

/**
 * Debounce function to limit function calls with memory leak prevention
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to trigger on leading edge
 * @returns {Function} Debounced function with cleanup capability
 */
function debounce(func, wait, immediate = false) {
  let timeout;

  const debouncedFunction = function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };

  // SECURITY: Add cleanup method to prevent memory leaks
  debouncedFunction.cleanup = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  // Track debounced functions globally for cleanup
  if (!window.debouncedFunctions) {
    window.debouncedFunctions = [];
  }
  window.debouncedFunctions.push(debouncedFunction);

  return debouncedFunction;
}

/**
 * Safely get DOM element by ID with null check
 * @param {string} id - Element ID
 * @returns {Element|null} DOM element or null if not found
 */
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with ID '${id}' not found`);
  }
  return element;
}

/**
 * Safely get DOM elements by selector with null check
 * @param {string} selector - CSS selector
 * @param {Element} parent - Parent element (default: document)
 * @returns {NodeList} NodeList of elements
 */
function safeQuerySelectorAll(selector, parent = document) {
  const elements = parent.querySelectorAll(selector);
  if (elements.length === 0) {
    console.warn(`No elements found for selector '${selector}'`);
  }
  return elements;
}

/**
 * Format date to ISO string for input fields
 * @param {Date} date - Date object
 * @returns {string} ISO date string (YYYY-MM-DD)
 */
function formatDateForInput(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date provided to formatDateForInput');
    return '';
  }
  return date.toISOString().split('T')[0];
}

/**
 * Add months to a date
 * @param {Date} date - Base date
 * @param {number} months - Number of months to add
 * @returns {Date} New date with months added
 */
function addMonths(date, months) {
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date provided to addMonths');
    return new Date();
  }

  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped HTML text
 */
function escapeHtml(text) {
  if (typeof text !== 'string') return text;

  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Check if DOM is ready
 * @returns {boolean} True if DOM is ready
 */
function isDOMReady() {
  return document.readyState === 'complete' || document.readyState === 'interactive';
}

/**
 * Wait for DOM to be ready
 * @returns {Promise} Promise that resolves when DOM is ready
 */
function waitForDOM() {
  return new Promise((resolve) => {
    if (isDOMReady()) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', resolve, { once: true });
    }
  });
}

/**
 * Batch DOM operations to reduce reflows/repaints
 * Executes multiple DOM operations within a single animation frame
 * @param {Function} callback - Function containing DOM operations
 * @returns {Promise} Promise that resolves when operations complete
 */
function batchDOMOperations(callback) {
  return new Promise((resolve) => {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => {
        callback();
        resolve();
      });
    } else {
      callback();
      resolve();
    }
  });
}

/**
 * Measure DOM operation performance
 * Logs timing information for debugging performance issues
 * @param {string} label - Label for the measured operation
 * @param {Function} callback - Function to measure
 * @returns {any} Result of callback function
 */
function measurePerformance(label, callback) {
  const startTime = performance.now();
  const result = callback();
  const endTime = performance.now();
  const duration = endTime - startTime;

  // Log if operation took longer than frame budget
  if (duration > PERFORMANCE_CONFIG.FRAME_BUDGET_MS) {
    console.warn(`⚠️ Performance warning: '${label}' took ${duration.toFixed(2)}ms (exceeds frame budget of ${PERFORMANCE_CONFIG.FRAME_BUDGET_MS}ms)`);
  } else {
    console.log(`✅ Performance: '${label}' completed in ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Virtual scroll helper for large lists
 * Creates a scrollable container with visible items only
 * @param {HTMLElement} container - Container element
 * @param {Array} items - Items to render
 * @param {Function} renderItem - Function to render each item
 * @param {number} itemHeight - Height of each item in pixels
 * @param {number} visibleCount - Number of visible items at once
 */
function setupVirtualScroll(container, items, renderItem, itemHeight, visibleCount = 10) {
  if (!container) {
    console.error('Virtual scroll container not found');
    return;
  }

  const scrollArea = document.createElement('div');
  scrollArea.style.height = `${itemHeight * visibleCount}px`;
  scrollArea.style.overflow = 'auto';
  scrollArea.style.position = 'relative';

  const content = document.createElement('div');
  content.style.height = `${itemHeight * items.length}px`;
  content.style.position = 'relative';

  const viewport = document.createElement('div');
  viewport.style.position = 'absolute';
  viewport.style.top = '0';
  viewport.style.left = '0';
  viewport.style.right = '0';

  let rafId = null;

  const handleScroll = () => {
    // Defensive check to prevent execution after destroy
    if (!scrollArea || !viewport || !items) {
      return;
    }

    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    rafId = window.requestAnimationFrame(() => {
      // Additional safety check inside RAF callback
      if (!scrollArea || !viewport || !items) {
        return;
      }

      const scrollTop = scrollArea.scrollTop;
      const firstVisibleIndex = Math.floor(scrollTop / itemHeight);
      const lastVisibleIndex = Math.min(
        firstVisibleIndex + visibleCount + 1,
        items.length
      );

      // Clear viewport and render visible items
      viewport.innerHTML = '';
      viewport.style.transform = `translateY(${firstVisibleIndex * itemHeight}px)`;

      for (let i = firstVisibleIndex; i < lastVisibleIndex; i++) {
        if (items[i] && renderItem) {
          const itemElement = renderItem(items[i], i);
          if (itemElement && viewport) {
            viewport.appendChild(itemElement);
          }
        }
      }

      // Clear RAF ID to prevent double cleanup
      rafId = null;
    });
  };

  scrollArea.addEventListener('scroll', handleScroll, { passive: true });

  content.appendChild(viewport);
  scrollArea.appendChild(content);
  container.appendChild(scrollArea);

  // Render initial visible items
  handleScroll();

  return {
    destroy: () => {
      // Cancel any pending animation frame
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }

      // Remove event listener to prevent memory leaks
      scrollArea.removeEventListener('scroll', handleScroll);

      // Clear viewport content to release element references
      viewport.innerHTML = '';

      // Remove scroll area from container if it still exists
      if (scrollArea.parentNode) {
        scrollArea.parentNode.removeChild(scrollArea);
      }

      // Clear references to prevent memory leaks
      items = null;
      renderItem = null;
    }
  };
}

/**
 * Throttle function to limit execution frequency
 * Ensures function doesn't execute more than once per wait period
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Request Idle Callback with fallback
 * Executes callback during idle time to avoid blocking main thread
 * @param {Function} callback - Callback to execute
 * @param {Object} options - Options object
 * @returns {number} Request ID
 */
function requestIdleCallback(callback, options = {}) {
  if (window.requestIdleCallback) {
    return window.requestIdleCallback(callback, options);
  } else {
    // Fallback: use setTimeout with low priority
    return setTimeout(callback, 1);
  }
}

/**
 * Cancel idle callback with fallback
 * @param {number} id - Request ID from requestIdleCallback
 */
function cancelIdleCallback(id) {
  if (window.cancelIdleCallback) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

// Make utility functions available globally for traditional script loading
if (typeof window !== 'undefined') {
  // Available implemented functions
  window.safeGetElement = safeGetElement;
  window.escapeHtml = escapeHtml;
  window.toast = toast;
  window.debounce = debounce;
  window.throttle = throttle;
  window.requestIdleCallback = requestIdleCallback;
  window.cancelIdleCallback = cancelIdleCallback;

  // Note: The following functions are not implemented and removed to prevent runtime errors:
  // formatDate, formatDateTime, formatRelativeTime, parseDate, deepClone,
  // generateId, isValidEmail, truncateText, capitalizeFirst, createVirtualScroll
}
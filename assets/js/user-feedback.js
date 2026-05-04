/**
 * User Feedback System Module
 * Comprehensive user feedback with toast notifications, loading states, progress indicators,
 * confirmation dialogs, and accessibility support
 */

// Dependencies will be available globally from previous script loads
// safeGetElement, escapeHtml, throttle, requestIdleCallback from utils.js
// FEEDBACK_CONFIG, TOAST_CONFIG from constants.js
// errorHandler, ERROR_SEVERITY from error-handler.js

/**
 * Notification types with enhanced features
 */
const NOTIFICATION_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  LOADING: 'loading'
};

/**
 * Progress indicator types
 */
const PROGRESS_TYPE = {
  DETERMINATE: 'determinate',
  INDETERMINATE: 'indeterminate',
  CIRCULAR: 'circular',
  LINEAR: 'linear'
};

/**
 * Dialog types
 */
const DIALOG_TYPE = {
  CONFIRM: 'confirm',
  ALERT: 'alert',
  PROMPT: 'prompt',
  CUSTOM: 'custom'
};

/**
 * User Feedback Manager Class
 */
class UserFeedbackManager {
  constructor() {
    this.activeToasts = new Map();
    this.activeLoaders = new Map();
    this.activeDialogs = new Map();
    this.notificationCenter = null;
    this.initialized = false;

    // Accessibility settings
    this.enableScreenReaderAnnouncements = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.lastAnnouncementTime = 0;
    this.announcementQueue = [];

    // Bind methods
    this.handleKeyboardNavigation = this.handleKeyboardNavigation.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.cleanupComponents = this.cleanupComponents.bind(this);

    // Initialize memory cleanup
    this.initializeMemoryCleanup();
  }

  /**
   * Initialize memory cleanup for long-running sessions
   */
  initializeMemoryCleanup() {
    // Clean up stale references every 2 minutes
    this.cleanupInterval = setInterval(this.cleanupComponents, 2 * 60 * 1000);

    // Clean up on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.cleanupComponents();
      }
    });

    console.log('🧹 Feedback system memory cleanup initialized');
  }

  /**
   * Clean up all stale component references to prevent memory leaks
   */
  cleanupComponents() {
    this.cleanupStaleToastReferences();
    this.cleanupStaleLoaderReferences();
    this.cleanupStaleDialogReferences();
  }

  /**
   * Clean up stale loader references
   */
  cleanupStaleLoaderReferences() {
    for (const [id, loaderInfo] of this.activeLoaders.entries()) {
      if (loaderInfo.element && !document.contains(loaderInfo.element)) {
        console.warn(`Cleaning up stale loader reference: ${id}`);
        this.activeLoaders.delete(id);
      }
    }
  }

  /**
   * Clean up stale dialog references
   */
  cleanupStaleDialogReferences() {
    for (const [id, dialogInfo] of this.activeDialogs.entries()) {
      if (dialogInfo.element && !document.contains(dialogInfo.element)) {
        console.warn(`Cleaning up stale dialog reference: ${id}`);
        this.activeDialogs.delete(id);
      }
    }
  }

  /**
   * Initialize the feedback system
   */
  async initialize() {
    if (this.initialized) return;

    console.log('📢 Initializing User Feedback System...');

    try {
      await this.createToastContainer();
      await this.createNotificationCenter();
      await this.createModalContainer();
      this.initializeAccessibility();
      this.setupEventListeners();

      this.initialized = true;
      console.log('✅ User Feedback System initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize feedback system:', error);
      errorHandler.handleError(error, {
        category: 'system',
        severity: ERROR_SEVERITY.CRITICAL,
        context: 'UserFeedbackManager.initialize'
      });
    }
  }

  /**
   * Create toast notification container
   */
  async createToastContainer() {
    let container = safeGetElement('toast-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'false');
      container.setAttribute('role', 'status');
      document.body.appendChild(container);
    }

    return container;
  }

  /**
   * Create notification center for persistent notifications
   */
  async createNotificationCenter() {
    let center = safeGetElement('notification-center');

    if (!center) {
      center = document.createElement('div');
      center.id = 'notification-center';
      center.className = 'notification-center';
      center.innerHTML = `
        <div class="notification-center-header">
          <h3>Notificações</h3>
          <button class="notification-center-close" aria-label="Fechar centro de notificações">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="notification-center-content">
          <div class="notification-center-empty">
            <p>Nenhuma notificação</p>
          </div>
        </div>
      `;
      document.body.appendChild(center);
    }

    this.notificationCenter = center;
    return center;
  }

  /**
   * Create modal container for dialogs
   */
  async createModalContainer() {
    let container = safeGetElement('modal-container');

    if (!container) {
      container = document.createElement('div');
      container.id = 'modal-container';
      container.className = 'modal-container';
      container.setAttribute('role', 'dialog');
      container.setAttribute('aria-modal', 'true');
      container.setAttribute('aria-hidden', 'true');
      document.body.appendChild(container);
    }

    return container;
  }

  /**
   * Initialize accessibility features
   */
  initializeAccessibility() {
    // Create screen reader announcement area
    let announcer = safeGetElement('sr-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }

    // Monitor reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Global keyboard navigation
    document.addEventListener('keydown', this.handleKeyboardNavigation);

    // Outside click handling for modals
    document.addEventListener('click', this.handleOutsideClick);

    // Notification center toggle
    const centerToggle = safeGetElement('notification-center-toggle');
    if (centerToggle) {
      centerToggle.addEventListener('click', () => this.toggleNotificationCenter());
    }
  }

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - Type of notification
   * @param {Object} options - Additional options
   */
  showToast(message, type = NOTIFICATION_TYPE.INFO, options = {}) {
    const {
      duration = this.getDefaultDuration(type),
      persistent = false,
      actionLabel = null,
      actionCallback = null,
      id = null,
      priority = 'normal'
    } = options;

    // Generate unique ID if not provided
    const toastId = id || `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Check for duplicate suppression
    if (this.activeToasts.has(message) && priority !== 'high') {
      return toastId;
    }

    const toast = this.createToastElement(message, type, {
      id: toastId,
      actionLabel,
      actionCallback,
      persistent
    });

    // Add to active toasts
    const toastInfo = {
      element: toast,
      type,
      message,
      timestamp: Date.now(),
      priority: priority,
      timer: null
    };
    this.activeToasts.set(toastId, toastInfo);

    // Insert into container
    const container = safeGetElement('toast-container');
    if (container) {
      // Stack toasts with proper order
      if (priority === 'high') {
        container.insertBefore(toast, container.firstChild);
      } else {
        container.appendChild(toast);
      }

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // Auto-dismiss if not persistent
      if (!persistent && duration > 0) {
        const timer = setTimeout(() => {
          this.dismissToast(toastId);
        }, duration);

        // Store timer reference for cleanup
        if (toastInfo) {
          toastInfo.timer = timer;
        }
      }

      // Announce to screen reader
      this.announceToScreenReader(message, type);
    }

    // Limit maximum toasts
    this.enforceToastLimit();

    return toastId;
  }

  /**
   * Create toast element
   */
  createToastElement(message, type, options = {}) {
    const { id, actionLabel, actionCallback, persistent } = options;

    const toast = document.createElement('div');
    toast.id = id;
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');

    // Toast content
    const content = document.createElement('div');
    content.className = 'toast-content';

    // Icon
    const icon = document.createElement('div');
    icon.className = 'toast-icon';
    icon.innerHTML = this.getToastIcon(type);
    icon.setAttribute('aria-hidden', 'true');

    // Message
    const messageEl = document.createElement('div');
    messageEl.className = 'toast-message';
    messageEl.textContent = escapeHtml(message);

    content.appendChild(icon);
    content.appendChild(messageEl);

    // Action button if provided
    if (actionLabel && actionCallback) {
      const actionBtn = document.createElement('button');
      actionBtn.className = 'toast-action';
      actionBtn.textContent = actionLabel;
      actionBtn.setAttribute('aria-label', `${actionLabel} - ${message}`);
      actionBtn.addEventListener('click', (e) => {
        e.preventDefault();
        actionCallback();
        this.dismissToast(id);
      });
      content.appendChild(actionBtn);
    }

    // Dismiss button for persistent toasts
    if (persistent) {
      const dismissBtn = document.createElement('button');
      dismissBtn.className = 'toast-dismiss';
      dismissBtn.innerHTML = '&times;';
      dismissBtn.setAttribute('aria-label', 'Fechar notificação');
      dismissBtn.addEventListener('click', () => this.dismissToast(id));
      content.appendChild(dismissBtn);
    }

    toast.appendChild(content);

    // Progress bar for timed toasts
    if (!persistent) {
      const progressBar = document.createElement('div');
      progressBar.className = 'toast-progress';
      progressBar.setAttribute('aria-hidden', 'true');
      toast.appendChild(progressBar);
    }

    return toast;
  }

  /**
   * Get icon for toast type
   */
  getToastIcon(type) {
    const icons = {
      [NOTIFICATION_TYPE.SUCCESS]: '✓',
      [NOTIFICATION_TYPE.ERROR]: '✕',
      [NOTIFICATION_TYPE.WARNING]: '⚠',
      [NOTIFICATION_TYPE.INFO]: 'ℹ',
      [NOTIFICATION_TYPE.LOADING]: '⟳'
    };

    return icons[type] || icons[NOTIFICATION_TYPE.INFO];
  }

  /**
   * Get default duration based on type
   */
  getDefaultDuration(type) {
    const durations = {
      [NOTIFICATION_TYPE.SUCCESS]: 3000,
      [NOTIFICATION_TYPE.ERROR]: 5000,
      [NOTIFICATION_TYPE.WARNING]: 4000,
      [NOTIFICATION_TYPE.INFO]: 3000,
      [NOTIFICATION_TYPE.LOADING]: 0 // Persistent
    };

    return durations[type] || 3000;
  }

  /**
   * Dismiss toast notification
   */
  dismissToast(toastId) {
    const toastInfo = this.activeToasts.get(toastId);
    if (!toastInfo) return;

    const { element, timer } = toastInfo;

    // Clear any active timer to prevent memory leaks
    if (timer) {
      clearTimeout(timer);
    }

    // Animate out
    element.classList.add('dismissing');

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.activeToasts.delete(toastId);
    }, this.reducedMotion ? 0 : 300);
  }

  /**
   * Enforce maximum number of toasts to prevent memory leaks
   */
  enforceToastLimit() {
    const limit = FEEDBACK_CONFIG.TOAST?.MAX_TOASTS || 5;
    const toasts = Array.from(this.activeToasts.entries());

    if (toasts.length > limit) {
      // Remove oldest toasts, but preserve high priority ones
      const sorted = toasts.sort((a, b) => {
        const aPriority = a[1].priority === 'high' ? 1 : 0;
        const bPriority = b[1].priority === 'high' ? 1 : 0;
        if (aPriority !== bPriority) return bPriority - aPriority; // High priority first
        return a[1].timestamp - b[1].timestamp; // Then by age
      });

      const toRemove = sorted.slice(limit);
      toRemove.forEach(([id, toastInfo]) => {
        // Clear any timers to prevent memory leaks
        if (toastInfo.timer) {
          clearTimeout(toastInfo.timer);
        }
        this.dismissToast(id);
      });
    }

    // Clean up stale references periodically
    this.cleanupStaleToastReferences();
  }

  /**
   * Clean up stale toast references that may cause memory leaks
   */
  cleanupStaleToastReferences() {
    // Check if toast elements still exist in DOM
    for (const [id, toastInfo] of this.activeToasts.entries()) {
      if (toastInfo.element && !document.contains(toastInfo.element)) {
        // Element was removed from DOM but reference still exists
        console.warn(`Cleaning up stale toast reference: ${id}`);
        this.activeToasts.delete(id);
      }
    }
  }

  /**
   * Show loading indicator
   */
  showLoading(message = 'Carregando...', options = {}) {
    const {
      target = document.body,
      type = PROGRESS_TYPE.INDETERMINATE,
      id = null,
      overlay = true,
      progress = 0
    } = options;

    const loaderId = id || `loader-${Date.now()}`;

    // Create loading element
    const loader = document.createElement('div');
    loader.id = loaderId;
    loader.className = `loading-indicator ${overlay ? 'loading-overlay' : ''}`;
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-live', 'polite');

    // Loading content
    const content = document.createElement('div');
    content.className = 'loading-content';

    // Spinner/Progress
    const spinner = this.createProgressIndicator(type, progress);
    content.appendChild(spinner);

    // Message
    if (message) {
      const messageEl = document.createElement('div');
      messageEl.className = 'loading-message';
      messageEl.textContent = message;
      messageEl.setAttribute('aria-label', message);
      content.appendChild(messageEl);
    }

    loader.appendChild(content);

    // Add to target
    const targetEl = typeof target === 'string' ? safeGetElement(target) : target;
    if (targetEl) {
      targetEl.appendChild(loader);

      // Animate in
      requestAnimationFrame(() => {
        loader.classList.add('show');
      });
    }

    // Store reference
    this.activeLoaders.set(loaderId, {
      element: loader,
      target: targetEl,
      type,
      message
    });

    // Announce to screen reader
    this.announceToScreenReader(message, NOTIFICATION_TYPE.LOADING);

    return loaderId;
  }

  /**
   * Create progress indicator
   */
  createProgressIndicator(type, progress = 0) {
    const container = document.createElement('div');
    container.className = `progress-indicator progress-${type}`;

    if (type === PROGRESS_TYPE.CIRCULAR) {
      // Circular progress
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 50 50');
      svg.className = 'circular-progress';

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '25');
      circle.setAttribute('cy', '25');
      circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'none');
      circle.setAttribute('stroke-width', '2');

      if (type === PROGRESS_TYPE.INDETERMINATE) {
        circle.className = 'progress-ring-indeterminate';
      } else {
        circle.className = 'progress-ring-determinate';
        const circumference = 2 * Math.PI * 20;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference * (1 - progress / 100);
      }

      svg.appendChild(circle);
      container.appendChild(svg);
    } else {
      // Linear progress
      const bar = document.createElement('div');
      bar.className = 'progress-bar';

      const fill = document.createElement('div');
      fill.className = type === PROGRESS_TYPE.INDETERMINATE ?
                      'progress-fill-indeterminate' : 'progress-fill-determinate';

      if (type === PROGRESS_TYPE.DETERMINATE) {
        fill.style.width = `${progress}%`;
      }

      bar.appendChild(fill);
      container.appendChild(bar);
    }

    return container;
  }

  /**
   * Update loading progress
   */
  updateLoadingProgress(loaderId, progress, message = null) {
    const loader = this.activeLoaders.get(loaderId);
    if (!loader) return;

    const { element } = loader;

    // Update progress indicator
    const progressEl = element.querySelector('.progress-fill-determinate, .progress-ring-determinate');
    if (progressEl) {
      if (progressEl.classList.contains('progress-fill-determinate')) {
        progressEl.style.width = `${progress}%`;
      } else {
        const circumference = 2 * Math.PI * 20;
        progressEl.style.strokeDashoffset = circumference * (1 - progress / 100);
      }
    }

    // Update message
    if (message) {
      const messageEl = element.querySelector('.loading-message');
      if (messageEl) {
        messageEl.textContent = message;
        this.announceToScreenReader(message, NOTIFICATION_TYPE.LOADING);
      }
    }
  }

  /**
   * Hide loading indicator
   */
  hideLoading(loaderId) {
    const loader = this.activeLoaders.get(loaderId);
    if (!loader) return;

    const { element } = loader;

    // Animate out
    element.classList.add('dismissing');

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.activeLoaders.delete(loaderId);
    }, this.reducedMotion ? 0 : 300);
  }

  /**
   * Show confirmation dialog
   */
  showDialog(message, type = DIALOG_TYPE.CONFIRM, options = {}) {
    return new Promise((resolve) => {
      const {
        title = 'Confirmação',
        confirmText = 'OK',
        cancelText = 'Cancelar',
        dangerousAction = false,
        customContent = null
      } = options;

      const dialogId = `dialog-${Date.now()}`;

      // Create dialog element
      const dialog = document.createElement('div');
      dialog.id = dialogId;
      dialog.className = `modal-dialog dialog-${type}`;
      dialog.setAttribute('role', 'dialog');
      dialog.setAttribute('aria-modal', 'true');
      dialog.setAttribute('aria-labelledby', `${dialogId}-title`);

      // Dialog content
      const content = document.createElement('div');
      content.className = 'dialog-content';

      // Header
      const header = document.createElement('div');
      header.className = 'dialog-header';

      const titleEl = document.createElement('h2');
      titleEl.id = `${dialogId}-title`;
      titleEl.textContent = title;

      const closeBtn = document.createElement('button');
      closeBtn.className = 'dialog-close';
      closeBtn.innerHTML = '&times;';
      closeBtn.setAttribute('aria-label', 'Fechar diálogo');
      closeBtn.addEventListener('click', () => {
        this.closeDialog(dialogId);
        resolve(false);
      });

      header.appendChild(titleEl);
      header.appendChild(closeBtn);

      // Body
      const body = document.createElement('div');
      body.className = 'dialog-body';

      if (customContent) {
        body.appendChild(customContent);
      } else {
        const messageEl = document.createElement('p');
        messageEl.textContent = message;
        body.appendChild(messageEl);
      }

      // Footer with actions
      const footer = document.createElement('div');
      footer.className = 'dialog-footer';

      if (type === DIALOG_TYPE.CONFIRM) {
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn-secondary';
        cancelBtn.textContent = cancelText;
        cancelBtn.addEventListener('click', () => {
          this.closeDialog(dialogId);
          resolve(false);
        });

        const confirmBtn = document.createElement('button');
        confirmBtn.className = `btn ${dangerousAction ? 'btn-danger' : 'btn-primary'}`;
        confirmBtn.textContent = confirmText;
        confirmBtn.addEventListener('click', () => {
          this.closeDialog(dialogId);
          resolve(true);
        });

        footer.appendChild(cancelBtn);
        footer.appendChild(confirmBtn);

        // Focus confirm button initially
        requestAnimationFrame(() => confirmBtn.focus());
      } else {
        const okBtn = document.createElement('button');
        okBtn.className = 'btn btn-primary';
        okBtn.textContent = 'OK';
        okBtn.addEventListener('click', () => {
          this.closeDialog(dialogId);
          resolve(true);
        });

        footer.appendChild(okBtn);

        // Focus OK button initially
        requestAnimationFrame(() => okBtn.focus());
      }

      // Assemble dialog
      content.appendChild(header);
      content.appendChild(body);
      content.appendChild(footer);
      dialog.appendChild(content);

      // Add to container
      const container = safeGetElement('modal-container');
      if (container) {
        container.appendChild(dialog);
        container.classList.add('show');
        container.setAttribute('aria-hidden', 'false');

        // Store reference
        this.activeDialogs.set(dialogId, {
          element: dialog,
          resolve,
          type
        });

        // Trap focus within dialog
        this.trapFocus(dialog);

        // Announce to screen reader
        this.announceToScreenReader(`${title}: ${message}`, NOTIFICATION_TYPE.INFO);
      }
    });
  }

  /**
   * Close dialog
   */
  closeDialog(dialogId) {
    const dialog = this.activeDialogs.get(dialogId);
    if (!dialog) return;

    const { element } = dialog;
    const container = safeGetElement('modal-container');

    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }

    // Hide container if no more dialogs
    if (container && !container.querySelector('.modal-dialog')) {
      container.classList.remove('show');
      container.setAttribute('aria-hidden', 'true');
    }

    this.activeDialogs.delete(dialogId);
  }

  /**
   * Trap focus within element
   */
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      } else if (e.key === 'Escape') {
        this.closeDialog(element.id);
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    // Focus first element
    firstElement.focus();

    return () => element.removeEventListener('keydown', handleKeyDown);
  }

  /**
   * Toggle notification center
   */
  toggleNotificationCenter() {
    if (!this.notificationCenter) return;

    const isVisible = this.notificationCenter.classList.contains('show');

    if (isVisible) {
      this.notificationCenter.classList.remove('show');
      this.notificationCenter.setAttribute('aria-hidden', 'true');
    } else {
      this.notificationCenter.classList.add('show');
      this.notificationCenter.setAttribute('aria-hidden', 'false');
      this.focusNotificationCenter();
    }
  }

  /**
   * Focus notification center
   */
  focusNotificationCenter() {
    const closeBtn = this.notificationCenter?.querySelector('.notification-center-close');
    if (closeBtn) {
      closeBtn.focus();
    }
  }

  /**
   * Announce message to screen reader with proper timing and queue management
   */
  announceToScreenReader(message, type) {
    if (!this.enableScreenReaderAnnouncements) return;

    const announcer = safeGetElement('sr-announcer');
    if (!announcer) return;

    // Add type context for better understanding
    const contextMessage = type === NOTIFICATION_TYPE.ERROR ? `Erro: ${message}` :
                          type === NOTIFICATION_TYPE.WARNING ? `Aviso: ${message}` :
                          type === NOTIFICATION_TYPE.SUCCESS ? `Sucesso: ${message}` :
                          message;

    // Rate limit announcements to prevent overwhelming screen readers
    const now = Date.now();
    const minInterval = 1000; // Minimum 1 second between announcements

    if (now - this.lastAnnouncementTime < minInterval) {
      // Queue the announcement for later
      this.announcementQueue.push({ message: contextMessage, timestamp: now });

      // Process queue with proper timing
      if (!this.announcementTimer) {
        this.announcementTimer = setTimeout(() => {
          this.processAnnouncementQueue();
        }, minInterval - (now - this.lastAnnouncementTime));
      }
      return;
    }

    this.makeAnnouncement(contextMessage);
    this.lastAnnouncementTime = now;
  }

  /**
   * Process queued screen reader announcements
   */
  processAnnouncementQueue() {
    if (this.announcementQueue.length === 0) {
      this.announcementTimer = null;
      return;
    }

    // Take the most recent announcement and clear duplicates
    const announcement = this.announcementQueue.pop();
    this.announcementQueue = [];

    this.makeAnnouncement(announcement.message);
    this.lastAnnouncementTime = Date.now();
    this.announcementTimer = null;
  }

  /**
   * Actually make the screen reader announcement
   */
  makeAnnouncement(message) {
    const announcer = safeGetElement('sr-announcer');
    if (!announcer) return;

    // Clear previous announcement first
    announcer.textContent = '';

    // Use requestAnimationFrame to ensure proper timing
    requestAnimationFrame(() => {
      announcer.textContent = message;

      // Clear after a reasonable time to keep aria-live region clean
      setTimeout(() => {
        if (announcer.textContent === message) {
          announcer.textContent = '';
        }
      }, 3000);
    });
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyboardNavigation(e) {
    // Global keyboard shortcuts
    if (e.key === 'Escape') {
      // Close active dialogs
      const activeDialogs = Array.from(this.activeDialogs.keys());
      if (activeDialogs.length > 0) {
        this.closeDialog(activeDialogs[activeDialogs.length - 1]);
      }

      // Close notification center
      if (this.notificationCenter?.classList.contains('show')) {
        this.toggleNotificationCenter();
      }
    }
  }

  /**
   * Handle outside click
   */
  handleOutsideClick(e) {
    // Close notification center if clicking outside
    if (this.notificationCenter?.classList.contains('show') &&
        !this.notificationCenter.contains(e.target)) {
      this.toggleNotificationCenter();
    }
  }

  /**
   * Show inline validation message
   */
  showInlineValidation(element, message, type = 'error') {
    const targetEl = typeof element === 'string' ? safeGetElement(element) : element;
    if (!targetEl) return;

    // Remove existing validation
    this.clearInlineValidation(targetEl);

    // Add validation class
    targetEl.classList.add(`validation-${type}`);

    // Create validation message
    const validationEl = document.createElement('div');
    validationEl.className = `validation-message validation-${type}`;
    validationEl.textContent = message;
    validationEl.setAttribute('role', 'alert');
    validationEl.setAttribute('aria-live', 'polite');

    // Insert after element
    targetEl.parentNode.insertBefore(validationEl, targetEl.nextSibling);

    // Mark element as invalid for accessibility
    targetEl.setAttribute('aria-invalid', type === 'error' ? 'true' : 'false');
    targetEl.setAttribute('aria-describedby', validationEl.id = `validation-${Date.now()}`);

    return validationEl;
  }

  /**
   * Clear inline validation
   */
  clearInlineValidation(element) {
    const targetEl = typeof element === 'string' ? safeGetElement(element) : element;
    if (!targetEl) return;

    // Remove validation classes
    targetEl.classList.remove('validation-error', 'validation-warning', 'validation-success');

    // Remove validation message
    const validationEl = targetEl.nextSibling;
    if (validationEl && validationEl.classList?.contains('validation-message')) {
      validationEl.remove();
    }

    // Reset accessibility attributes
    targetEl.removeAttribute('aria-invalid');
    targetEl.removeAttribute('aria-describedby');
  }

  /**
   * Clear all active feedback
   */
  clearAll() {
    // Clear toasts
    this.activeToasts.forEach((_, id) => this.dismissToast(id));

    // Clear loaders
    this.activeLoaders.forEach((_, id) => this.hideLoading(id));

    // Clear dialogs
    this.activeDialogs.forEach((_, id) => this.closeDialog(id));
  }

  /**
   * Get feedback statistics
   */
  getStats() {
    return {
      activeToasts: this.activeToasts.size,
      activeLoaders: this.activeLoaders.size,
      activeDialogs: this.activeDialogs.size,
      reducedMotion: this.reducedMotion,
      screenReaderAnnouncements: this.enableScreenReaderAnnouncements
    };
  }

  /**
   * Cleanup and destroy
   */
  destroy() {
    this.clearAll();

    document.removeEventListener('keydown', this.handleKeyboardNavigation);
    document.removeEventListener('click', this.handleOutsideClick);

    // Clear timers to prevent memory leaks
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    if (this.announcementTimer) {
      clearTimeout(this.announcementTimer);
      this.announcementTimer = null;
    }

    // Clear announcement queue
    this.announcementQueue = [];

    // Remove containers
    const containers = [
      'toast-container',
      'notification-center',
      'modal-container',
      'sr-announcer'
    ];

    containers.forEach(id => {
      const el = safeGetElement(id);
      if (el) el.remove();
    });

    this.initialized = false;
    console.log('📢 User Feedback System destroyed');
  }
}

// Create and export singleton instance
const userFeedback = new UserFeedbackManager();

// Convenience methods
const showToast = (message, type, options) =>
  userFeedback.showToast(message, type, options);

const showLoading = (message, options) =>
  userFeedback.showLoading(message, options);

const hideLoading = (id) =>
  userFeedback.hideLoading(id);

const showConfirm = (message, options) =>
  userFeedback.showDialog(message, DIALOG_TYPE.CONFIRM, options);

const showAlert = (message, options) =>
  userFeedback.showDialog(message, DIALOG_TYPE.ALERT, options);

const showInlineValidation = (element, message, type) =>
  userFeedback.showInlineValidation(element, message, type);

const clearInlineValidation = (element) =>
  userFeedback.clearInlineValidation(element);

// Make feedback system available globally
if (typeof window !== 'undefined') {
  window.userFeedback = userFeedback;
  window.UserFeedbackManager = UserFeedbackManager;
  window.NOTIFICATION_TYPE = NOTIFICATION_TYPE;
  window.PROGRESS_TYPE = PROGRESS_TYPE;
  window.DIALOG_TYPE = DIALOG_TYPE;

  // Export convenience methods
  window.showToast = showToast;
  window.showLoading = showLoading;
  window.hideLoading = hideLoading;
  window.showConfirm = showConfirm;
  window.showAlert = showAlert;
  window.showInlineValidation = showInlineValidation;
  window.clearInlineValidation = clearInlineValidation;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => userFeedback.initialize());
} else {
  userFeedback.initialize();
}

console.log('📢 User Feedback System Module loaded');
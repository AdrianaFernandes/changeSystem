/**
 * Constants and Configuration Module
 * Centralized location for all magic numbers and configuration values
 * This improves maintainability and allows easy tuning of application behavior
 */

// Check if we're in a module environment or traditional script environment
const isModuleEnvironment = typeof module !== 'undefined' && module.exports;

/**
 * Toast Notification Configuration
 */
const TOAST_CONFIG = {
  // Duration to show toast notifications (milliseconds)
  DISPLAY_DURATION: 3500,

  // Maximum message length to prevent excessive DOM content
  MAX_MESSAGE_LENGTH: 200,

  // Toast types
  TYPES: {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning'
  }
};

/**
 * Query Execution Configuration
 */
const QUERY_CONFIG = {
  // Maximum polling attempts before timeout
  MAX_POLLING_ATTEMPTS: 20,

  // Initial delay for polling (milliseconds)
  POLLING_BASE_DELAY: 50,

  // Exponential backoff multiplier
  POLLING_BACKOFF_MULTIPLIER: 1.5,

  // Maximum delay cap for polling (milliseconds)
  POLLING_MAX_DELAY: 500,

  // Azure DevOps API batch size limit
  BATCH_SIZE: 200,

  // WIQL input validation - maximum length
  WIQL_MAX_LENGTH: 255,

  // Token validation - min/max length
  TOKEN_MIN_LENGTH: 20,
  TOKEN_MAX_LENGTH: 100,

  // Area path validation - maximum length
  AREA_PATH_MAX_LENGTH: 255
};

/**
 * DOM and Performance Configuration
 */
const PERFORMANCE_CONFIG = {
  // Frame budget in milliseconds (16ms = 60fps)
  FRAME_BUDGET_MS: 16,

  // Virtual scroll configuration
  VIRTUAL_SCROLL: {
    DEFAULT_ITEM_HEIGHT: 32,
    DEFAULT_VISIBLE_COUNT: 10
  },

  // Debounce delays (milliseconds)
  DEBOUNCE: {
    FILTER: 300,
    SEARCH: 200,
    DROPDOWN: 100
  },

  // Throttle limits (milliseconds)
  THROTTLE: {
    SCROLL: 100,
    RESIZE: 150,
    UPDATE: 200
  },

  // UI Update delay
  DASHBOARD_UPDATE_DELAY: 100
};

/**
 * Work Item Configuration
 */
const WORK_ITEM_CONFIG = {
  // Legacy static work item types (for backward compatibility)
  ALLOWED_TYPES: [
    'Bug',
    'User Story',
    'Task',
    'Feature',
    'Epic',
    'Test Case',
    'Shared Steps'
  ],

  // Dynamic type discovery configuration
  DISCOVERY: {
    // Enable dynamic work item type discovery
    ENABLED: true,

    // Fallback to static types when discovery fails
    USE_FALLBACK: true,

    // Cache duration for discovered types (milliseconds)
    CACHE_DURATION: 10 * 60 * 1000, // 10 minutes

    // Refresh interval for type discovery (milliseconds)
    REFRESH_INTERVAL: 30 * 60 * 1000, // 30 minutes

    // Maximum types to display in UI
    MAX_DISPLAY_TYPES: 50,

    // Default process templates supported
    SUPPORTED_PROCESS_TEMPLATES: ['Agile', 'Scrum', 'Basic', 'CMMI'],

    // API endpoints for discovery
    ENDPOINTS: {
      WORK_ITEM_TYPES: '/work-item-types',
      DISCOVERY: '/work-item-types/discovery'
    }
  },

  // Type display configuration
  DISPLAY: {
    // Default view mode
    DEFAULT_VIEW: 'cards', // 'cards', 'list', 'table'

    // Show type icons
    SHOW_ICONS: true,

    // Show type colors
    SHOW_COLORS: true,

    // Show hierarchy levels
    SHOW_HIERARCHY: true,

    // Show type descriptions
    SHOW_DESCRIPTIONS: false,

    // Compact view mode
    COMPACT_MODE: false,

    // Enable search functionality
    ENABLE_SEARCH: true,

    // Enable quick filters
    ENABLE_QUICK_FILTERS: true,

    // Maximum quick filters to show
    MAX_QUICK_FILTERS: 5
  },

  // Filter configuration
  FILTERING: {
    // Enable adaptive filtering
    ADAPTIVE_FILTERING: true,

    // Default filter categories to show
    DEFAULT_CATEGORIES: ['type', 'hierarchy', 'content', 'quick'],

    // Maximum filters per category
    MAX_FILTERS_PER_CATEGORY: 20,

    // Enable filter validation
    VALIDATE_FILTERS: true,

    // Filter history size
    HISTORY_SIZE: 100
  },

  // Performance configuration
  PERFORMANCE: {
    // Batch size for type processing
    BATCH_SIZE: 25,

    // Debounce delay for type selection (milliseconds)
    SELECTION_DEBOUNCE: 200,

    // Throttle limit for UI updates (milliseconds)
    UI_UPDATE_THROTTLE: 100,

    // Virtual scrolling threshold
    VIRTUAL_SCROLL_THRESHOLD: 50
  },

  // Test loop parameters
  TEST_LOOP_DELAY: 1000,

  // Card/Table configuration
  ITEMS_PER_PAGE: 20,
  MAX_VISIBLE_ITEMS: 100,

  // Error handling
  ERROR_HANDLING: {
    // Retry attempts for failed discovery
    MAX_RETRY_ATTEMPTS: 3,

    // Retry delay (milliseconds)
    RETRY_DELAY: 1000,

    // Show error messages to user
    SHOW_ERROR_MESSAGES: true,

    // Fallback timeout (milliseconds)
    FALLBACK_TIMEOUT: 5000
  }
};

/**
 * Date and Time Configuration
 */
const DATE_CONFIG = {
  // Default target date range (months ahead)
  DEFAULT_MONTHS_AHEAD: 3,

  // Date format for input fields
  INPUT_DATE_FORMAT: 'yyyy-MM-dd',

  // Date format for display
  DISPLAY_DATE_FORMAT: 'dd/MM/yyyy'
};

/**
 * Storage Configuration
 */
const STORAGE_CONFIG = {
  // Local storage keys
  KEYS: {
    AZURE_TOKEN: 'azureDevOpsToken',
    AZURE_TOKEN_EXPIRY: 'azureDevOpsTokenExpiry',
    DRAFT_DATA: 'draftData',
    USER_PREFERENCES: 'userPreferences',
    IMPORTED_DATA: 'importedData'
  },

  // Token expiry in hours
  TOKEN_EXPIRY_HOURS: 24
};

/**
 * API Configuration
 */
const API_CONFIG = {
  // Azure DevOps API endpoints
  ENDPOINTS: {
    WORK_ITEMS: 'https://dev.azure.com/organization/project/_apis/wit/workitems',
    QUERY: 'https://dev.azure.com/organization/project/_apis/wit/wiql'
  },

  // Local API endpoints (for backend service)
  LOCAL_ENDPOINTS: {
    BASE: 'http://localhost:3001/api',
    PROJECTS: '/projects',
    WORK_ITEM_TYPES: '/projects/:projectName/work-item-types',
    WORK_ITEM_DISCOVERY: '/projects/:projectName/work-item-types/discovery',
    AREA_PATHS: '/projects/:projectName/area-paths',
    ITERATIONS: '/projects/:projectName/iterations',
    METRICS: '/projects/:projectName/metrics',
    BULK_DATA: '/projects/bulk-data'
  },

  // API version
  API_VERSION: '6.0',

  // Request timeout in milliseconds
  REQUEST_TIMEOUT: 30000,

  // Discovery-specific timeouts
  DISCOVERY_TIMEOUT: 15000,

  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
    BACKOFF_MULTIPLIER: 2
  },

  // Cache configuration
  CACHE: {
    // Enable API response caching
    ENABLED: true,

    // Default cache TTL (milliseconds)
    DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes

    // Discovery data cache TTL (milliseconds)
    DISCOVERY_TTL: 10 * 60 * 1000, // 10 minutes

    // Maximum cache entries
    MAX_ENTRIES: 100
  }
};

/**
 * UI Layout Configuration
 */
const UI_CONFIG = {
  // Breakpoints for responsive design (pixels)
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1280
  },

  // Animation durations (milliseconds)
  ANIMATION_DURATION: 200,

  // Dropdown configuration
  DROPDOWN: {
    ANIMATION_DURATION: 150,
    MAX_VISIBLE_ITEMS: 10,
    ITEM_HEIGHT: 32
  }
};

/**
 * Error Handling Configuration
 */
const ERROR_CONFIG = {
  // Maximum retry attempts for failed operations
  MAX_RETRY_ATTEMPTS: 3,

  // Base delay for retry operations (milliseconds)
  RETRY_BASE_DELAY: 1000,

  // Exponential backoff multiplier for retries
  RETRY_MULTIPLIER: 2,

  // Maximum delay cap for retries (milliseconds)
  RETRY_MAX_DELAY: 10000,

  // Maximum error log entries to keep in memory
  MAX_LOG_ENTRIES: 100,

  // Network timeout for error detection (milliseconds)
  NETWORK_TIMEOUT: 30000,

  // API timeout for error detection (milliseconds)
  API_TIMEOUT: 15000,

  // Validation timeout (milliseconds)
  VALIDATION_TIMEOUT: 5000,

  // Error suppression settings
  SUPPRESSION: {
    // Suppress duplicate errors within time window (milliseconds)
    DUPLICATE_WINDOW: 5000,

    // Maximum error rate per minute before suppression
    MAX_ERROR_RATE: 10,

    // Enable error rate limiting
    ENABLE_RATE_LIMITING: true
  },

  // Critical error thresholds
  THRESHOLDS: {
    // Memory usage threshold for critical errors (MB)
    MEMORY_USAGE_MB: 100,

    // JavaScript error count threshold per minute
    JS_ERROR_RATE: 5,

    // Network error threshold per minute
    NETWORK_ERROR_RATE: 3,

    // API error threshold per minute
    API_ERROR_RATE: 5
  },

  // Recovery strategies configuration
  RECOVERY: {
    // Enable automatic recovery attempts
    AUTO_RECOVERY: true,

    // Fallback data sources
    ENABLE_FALLBACK: true,

    // Cache fallback duration (milliseconds)
    FALLBACK_CACHE_DURATION: 5 * 60 * 1000, // 5 minutes

    // Offline mode support
    OFFLINE_SUPPORT: true,

    // Page reload suggestion threshold
    RELOAD_THRESHOLD: 3
  },

  // Monitoring integration
  MONITORING: {
    // Enable external monitoring (e.g., Sentry, LogRocket)
    ENABLED: false,

    // Sampling rate (0.0 to 1.0)
    SAMPLE_RATE: 0.1,

    // Rate limit for monitoring calls (milliseconds)
    RATE_LIMIT_MS: 30000,

    // Include stack traces in monitoring
    INCLUDE_STACK_TRACES: true,

    // Include user context
    INCLUDE_USER_CONTEXT: true,

    // Include browser context
    INCLUDE_BROWSER_CONTEXT: true
  },

  // Error expiry for cleanup (milliseconds)
  ERROR_EXPIRY_MS: 30 * 60 * 1000 // 30 minutes
};

/**
 * User Feedback Configuration
 */
const FEEDBACK_CONFIG = {
  // Toast notification settings
  TOAST: {
    // Maximum number of simultaneous toasts
    MAX_TOASTS: 5,

    // Default durations by type (milliseconds)
    DURATIONS: {
      INFO: 3000,
      SUCCESS: 3000,
      WARNING: 4000,
      ERROR: 5000,
      LOADING: 0 // Persistent
    },

    // Animation settings
    ANIMATION: {
      DURATION: 300,
      EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
      STAGGER_DELAY: 100
    },

    // Positioning
    POSITION: {
      DESKTOP: 'top-right',
      MOBILE: 'top-center'
    },

    // Auto-dismiss settings
    AUTO_DISMISS: {
      ENABLED: true,
      PAUSE_ON_HOVER: true,
      PAUSE_ON_FOCUS: true,
      RESUME_ON_BLUR: true
    }
  },

  // Loading indicator settings
  LOADING: {
    // Minimum display time to prevent flashing (milliseconds)
    MIN_DISPLAY_TIME: 500,

    // Show loading for operations longer than (milliseconds)
    SHOW_THRESHOLD: 200,

    // Default messages
    DEFAULT_MESSAGES: {
      LOADING: 'Carregando...',
      PROCESSING: 'Processando...',
      SAVING: 'Salvando...',
      CONNECTING: 'Conectando...',
      UPLOADING: 'Enviando...',
      DOWNLOADING: 'Baixando...'
    },

    // Progress indicator settings
    PROGRESS: {
      UPDATE_INTERVAL: 100,
      SMOOTH_TRANSITIONS: true,
      SHOW_PERCENTAGE: true,
      SHOW_TIME_REMAINING: false
    }
  },

  // Modal/Dialog settings
  MODAL: {
    // Animation settings
    ANIMATION: {
      DURATION: 300,
      BACKDROP_DURATION: 200,
      SCALE_START: 0.95
    },

    // Behavior settings
    BEHAVIOR: {
      CLOSE_ON_BACKDROP_CLICK: true,
      CLOSE_ON_ESCAPE: true,
      TRAP_FOCUS: true,
      RESTORE_FOCUS: true
    },

    // Default buttons text
    BUTTONS: {
      OK: 'OK',
      CANCEL: 'Cancelar',
      CONFIRM: 'Confirmar',
      YES: 'Sim',
      NO: 'Não',
      RETRY: 'Tentar Novamente',
      CLOSE: 'Fechar'
    }
  },

  // Validation feedback settings
  VALIDATION: {
    // Real-time validation delay (milliseconds)
    DEBOUNCE_DELAY: 300,

    // Show validation immediately on blur
    VALIDATE_ON_BLUR: true,

    // Show validation on form submit attempt
    VALIDATE_ON_SUBMIT: true,

    // Clear validation on input change
    CLEAR_ON_CHANGE: true,

    // Validation message positioning
    MESSAGE_POSITION: 'below', // 'below', 'above', 'inline'

    // Icon settings
    ICONS: {
      SHOW_VALIDATION_ICONS: true,
      ERROR_ICON: '✕',
      WARNING_ICON: '⚠',
      SUCCESS_ICON: '✓'
    }
  },

  // Notification center settings
  NOTIFICATION_CENTER: {
    // Maximum notifications to keep
    MAX_NOTIFICATIONS: 50,

    // Auto-clear old notifications (hours)
    AUTO_CLEAR_HOURS: 24,

    // Group similar notifications
    GROUP_SIMILAR: true,

    // Show notification badges
    SHOW_BADGES: true,

    // Persistent storage
    PERSIST_NOTIFICATIONS: false
  },

  // Accessibility settings
  ACCESSIBILITY: {
    // Screen reader announcements
    ANNOUNCE_MESSAGES: true,

    // High contrast mode support
    HIGH_CONTRAST_SUPPORT: true,

    // Reduced motion support
    RESPECT_REDUCED_MOTION: true,

    // Focus management
    FOCUS_MANAGEMENT: true,

    // ARIA labels and descriptions
    ARIA_LABELS: true,

    // Keyboard navigation support
    KEYBOARD_NAVIGATION: true
  },

  // Performance settings
  PERFORMANCE: {
    // Debounce user feedback updates (milliseconds)
    UPDATE_DEBOUNCE: 100,

    // Throttle animation frames (milliseconds)
    ANIMATION_THROTTLE: 16,

    // Batch DOM updates
    BATCH_DOM_UPDATES: true,

    // Lazy load notification history
    LAZY_LOAD_HISTORY: true,

    // Virtual scrolling threshold for large lists
    VIRTUAL_SCROLL_THRESHOLD: 100
  }
};

/**
 * Logging Configuration
 */
const LOG_CONFIG = {
  // Enable/disable debug logging
  DEBUG: true,

  // Log levels
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
  },

  // Performance monitoring threshold
  PERFORMANCE_THRESHOLD_MS: 16
};

/**
 * Helper function to get config value with fallback
 * @param {string} path - Dot-notation path to config value
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} Config value or default
 */
function getConfig(path, defaultValue = null) {
  const configs = {
    TOAST_CONFIG,
    QUERY_CONFIG,
    PERFORMANCE_CONFIG,
    WORK_ITEM_CONFIG,
    DATE_CONFIG,
    STORAGE_CONFIG,
    API_CONFIG,
    UI_CONFIG,
    ERROR_CONFIG,
    FEEDBACK_CONFIG,
    LOG_CONFIG
  };

  const keys = path.split('.');
  let value = null;

  for (const key of keys) {
    if (value === null) {
      value = configs[key];
    } else if (typeof value === 'object' && value !== null) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }

  return value !== undefined ? value : defaultValue;
}

/**
 * Helper function to validate configuration
 * @returns {Object} Validation result with issues array
 */
function validateConfiguration() {
  const issues = [];

  // Validate toast config
  if (TOAST_CONFIG.DISPLAY_DURATION < 1000) {
    issues.push('TOAST_CONFIG.DISPLAY_DURATION is very short (< 1000ms)');
  }

  // Validate query config
  if (QUERY_CONFIG.MAX_POLLING_ATTEMPTS < 5) {
    issues.push('QUERY_CONFIG.MAX_POLLING_ATTEMPTS is very low (< 5)');
  }

  if (QUERY_CONFIG.POLLING_MAX_DELAY < QUERY_CONFIG.POLLING_BASE_DELAY) {
    issues.push('QUERY_CONFIG.POLLING_MAX_DELAY should be >= POLLING_BASE_DELAY');
  }

  // Validate performance config
  if (PERFORMANCE_CONFIG.FRAME_BUDGET_MS < 10) {
    issues.push('PERFORMANCE_CONFIG.FRAME_BUDGET_MS is very low (< 10ms)');
  }

  // Validate date config
  if (DATE_CONFIG.DEFAULT_MONTHS_AHEAD < 0) {
    issues.push('DATE_CONFIG.DEFAULT_MONTHS_AHEAD should not be negative');
  }

  // Validate error config
  if (ERROR_CONFIG.MAX_RETRY_ATTEMPTS < 1) {
    issues.push('ERROR_CONFIG.MAX_RETRY_ATTEMPTS should be at least 1');
  }

  if (ERROR_CONFIG.RETRY_MAX_DELAY < ERROR_CONFIG.RETRY_BASE_DELAY) {
    issues.push('ERROR_CONFIG.RETRY_MAX_DELAY should be >= RETRY_BASE_DELAY');
  }

  if (ERROR_CONFIG.MONITORING.SAMPLE_RATE < 0 || ERROR_CONFIG.MONITORING.SAMPLE_RATE > 1) {
    issues.push('ERROR_CONFIG.MONITORING.SAMPLE_RATE should be between 0.0 and 1.0');
  }

  // Validate feedback config
  if (FEEDBACK_CONFIG.TOAST.MAX_TOASTS < 1) {
    issues.push('FEEDBACK_CONFIG.TOAST.MAX_TOASTS should be at least 1');
  }

  if (FEEDBACK_CONFIG.LOADING.MIN_DISPLAY_TIME < 0) {
    issues.push('FEEDBACK_CONFIG.LOADING.MIN_DISPLAY_TIME should not be negative');
  }

  if (FEEDBACK_CONFIG.NOTIFICATION_CENTER.MAX_NOTIFICATIONS < 1) {
    issues.push('FEEDBACK_CONFIG.NOTIFICATION_CENTER.MAX_NOTIFICATIONS should be at least 1');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * All configurations as a single object
 */
const CONFIG = {
  TOAST: TOAST_CONFIG,
  QUERY: QUERY_CONFIG,
  PERFORMANCE: PERFORMANCE_CONFIG,
  WORK_ITEM: WORK_ITEM_CONFIG,
  DATE: DATE_CONFIG,
  STORAGE: STORAGE_CONFIG,
  API: API_CONFIG,
  UI: UI_CONFIG,
  ERROR: ERROR_CONFIG,
  FEEDBACK: FEEDBACK_CONFIG,
  LOG: LOG_CONFIG,
  getConfig,
  validateConfiguration
};

// Make available globally for traditional script loading
if (typeof window !== 'undefined') {
  window.TOAST_CONFIG = TOAST_CONFIG;
  window.QUERY_CONFIG = QUERY_CONFIG;
  window.PERFORMANCE_CONFIG = PERFORMANCE_CONFIG;
  window.WORK_ITEM_CONFIG = WORK_ITEM_CONFIG;
  window.DATE_CONFIG = DATE_CONFIG;
  window.STORAGE_CONFIG = STORAGE_CONFIG;
  window.API_CONFIG = API_CONFIG;
  window.UI_CONFIG = UI_CONFIG;
  window.ERROR_CONFIG = ERROR_CONFIG;
  window.FEEDBACK_CONFIG = FEEDBACK_CONFIG;
  window.LOG_CONFIG = LOG_CONFIG;
  window.CONFIG = CONFIG;
  window.getConfig = getConfig;
  window.validateConfiguration = validateConfiguration;
}

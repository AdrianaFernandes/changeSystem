/**
 * Centralized Error Handler Module
 * Provides comprehensive error management for all TR-Change-System components
 * Includes error categorization, recovery strategies, and user-friendly messaging
 */

// Dependencies will be available globally from previous script loads
// toast, safeGetElement, escapeHtml, requestIdleCallback from utils.js
// ERROR_CONFIG, TOAST_CONFIG from constants.js

/**
 * Error severity levels
 */
const ERROR_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical'
};

/**
 * Error categories for better handling
 */
const ERROR_CATEGORY = {
  NETWORK: 'network',
  VALIDATION: 'validation',
  USER: 'user',
  SYSTEM: 'system',
  API: 'api',
  TIMEOUT: 'timeout',
  AUTHENTICATION: 'authentication',
  PERMISSION: 'permission'
};

/**
 * Recovery strategies
 */
const RECOVERY_STRATEGY = {
  RETRY: 'retry',
  FALLBACK: 'fallback',
  USER_ACTION: 'user_action',
  RELOAD: 'reload',
  NONE: 'none'
};

/**
 * Portuguese error messages for user-friendly feedback
 */
const ERROR_MESSAGES_PT = {
  [ERROR_CATEGORY.NETWORK]: {
    [ERROR_SEVERITY.ERROR]: 'Erro de conexão. Verifique sua conexão com a internet.',
    [ERROR_SEVERITY.WARNING]: 'Conexão instável detectada. Tentando novamente...',
    [ERROR_SEVERITY.CRITICAL]: 'Falha crítica de rede. Sistema indisponível.',
    [ERROR_SEVERITY.INFO]: 'Reconectando...'
  },
  [ERROR_CATEGORY.API]: {
    [ERROR_SEVERITY.ERROR]: 'Erro na API do Azure DevOps. Tente novamente em alguns instantes.',
    [ERROR_SEVERITY.WARNING]: 'API respondeu com aviso. Alguns dados podem estar incompletos.',
    [ERROR_SEVERITY.CRITICAL]: 'Falha crítica na API. Entre em contato com o suporte.',
    [ERROR_SEVERITY.INFO]: 'Carregando dados da API...'
  },
  [ERROR_CATEGORY.VALIDATION]: {
    [ERROR_SEVERITY.ERROR]: 'Dados inválidos fornecidos. Verifique os valores inseridos.',
    [ERROR_SEVERITY.WARNING]: 'Alguns campos precisam de atenção.',
    [ERROR_SEVERITY.CRITICAL]: 'Erro crítico de validação.',
    [ERROR_SEVERITY.INFO]: 'Validando dados...'
  },
  [ERROR_CATEGORY.USER]: {
    [ERROR_SEVERITY.ERROR]: 'Ação não permitida ou dados insuficientes.',
    [ERROR_SEVERITY.WARNING]: 'Recomendamos revisar sua seleção.',
    [ERROR_SEVERITY.CRITICAL]: 'Operação bloqueada por segurança.',
    [ERROR_SEVERITY.INFO]: 'Processando sua solicitação...'
  },
  [ERROR_CATEGORY.SYSTEM]: {
    [ERROR_SEVERITY.ERROR]: 'Erro interno do sistema. Tente recarregar a página.',
    [ERROR_SEVERITY.WARNING]: 'Sistema operando em modo degradado.',
    [ERROR_SEVERITY.CRITICAL]: 'Falha crítica do sistema. Reinicie a aplicação.',
    [ERROR_SEVERITY.INFO]: 'Sistema inicializando...'
  },
  [ERROR_CATEGORY.TIMEOUT]: {
    [ERROR_SEVERITY.ERROR]: 'Operação expirou. Tente novamente.',
    [ERROR_SEVERITY.WARNING]: 'Operação está demorando mais que o esperado.',
    [ERROR_SEVERITY.CRITICAL]: 'Timeout crítico. Sistema não responde.',
    [ERROR_SEVERITY.INFO]: 'Aguardando resposta...'
  },
  [ERROR_CATEGORY.AUTHENTICATION]: {
    [ERROR_SEVERITY.ERROR]: 'Erro de autenticação. Faça login novamente.',
    [ERROR_SEVERITY.WARNING]: 'Sessão expirando em breve.',
    [ERROR_SEVERITY.CRITICAL]: 'Acesso negado. Contate o administrador.',
    [ERROR_SEVERITY.INFO]: 'Verificando credenciais...'
  },
  [ERROR_CATEGORY.PERMISSION]: {
    [ERROR_SEVERITY.ERROR]: 'Você não tem permissão para esta operação.',
    [ERROR_SEVERITY.WARNING]: 'Permissões limitadas detectadas.',
    [ERROR_SEVERITY.CRITICAL]: 'Acesso totalmente restrito.',
    [ERROR_SEVERITY.INFO]: 'Verificando permissões...'
  }
};

/**
 * Default fallback messages
 */
const FALLBACK_MESSAGES = {
  [ERROR_SEVERITY.INFO]: 'Processando...',
  [ERROR_SEVERITY.WARNING]: 'Atenção: Verifique os dados.',
  [ERROR_SEVERITY.ERROR]: 'Ocorreu um erro. Tente novamente.',
  [ERROR_SEVERITY.CRITICAL]: 'Erro crítico. Recarregue a página.'
};

/**
 * Central Error Handler Class
 */
class ErrorHandler {
  constructor() {
    this.errors = new Map(); // Track active errors to prevent duplicates
    this.retryAttempts = new Map(); // Track retry attempts per operation
    this.errorLog = []; // Internal error logging
    this.isOnline = navigator.onLine;

    // Bind methods
    this.handleGlobalError = this.handleGlobalError.bind(this);
    this.handleUnhandledRejection = this.handleUnhandledRejection.bind(this);
    this.handleOnlineStatus = this.handleOnlineStatus.bind(this);
    this.cleanupExpiredErrors = this.cleanupExpiredErrors.bind(this);

    this.initializeGlobalHandlers();
    this.initializeMemoryCleanup();
  }

  /**
   * Initialize global error handlers
   */
  initializeGlobalHandlers() {
    // Handle uncaught JavaScript errors
    window.addEventListener('error', this.handleGlobalError);

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection);

    // Monitor online/offline status
    window.addEventListener('online', this.handleOnlineStatus);
    window.addEventListener('offline', this.handleOnlineStatus);

    console.log('🛡️ Global error handlers initialized');
  }

  /**
   * Initialize memory cleanup for long-running sessions
   */
  initializeMemoryCleanup() {
    // Clean up expired errors every 5 minutes
    this.cleanupInterval = setInterval(this.cleanupExpiredErrors, 5 * 60 * 1000);

    // Clean up on page visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.cleanupExpiredErrors();
      }
    });

    console.log('🧹 Memory cleanup initialized');
  }

  /**
   * Handle global JavaScript errors
   */
  handleGlobalError(event) {
    const error = {
      category: ERROR_CATEGORY.SYSTEM,
      severity: ERROR_SEVERITY.ERROR,
      message: event.message || 'Erro JavaScript não capturado',
      stack: event.error?.stack,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      timestamp: new Date().toISOString()
    };

    this.logError(error);
    this.handleError(error, {
      showToUser: true,
      strategy: RECOVERY_STRATEGY.RELOAD
    });
  }

  /**
   * Handle unhandled promise rejections
   */
  handleUnhandledRejection(event) {
    const error = {
      category: ERROR_CATEGORY.SYSTEM,
      severity: ERROR_SEVERITY.ERROR,
      message: event.reason?.message || 'Promise rejeitada não tratada',
      stack: event.reason?.stack,
      timestamp: new Date().toISOString()
    };

    this.logError(error);
    this.handleError(error, {
      showToUser: true,
      strategy: RECOVERY_STRATEGY.USER_ACTION
    });

    // Prevent default browser error handling
    event.preventDefault();
  }

  /**
   * Handle online/offline status changes
   */
  handleOnlineStatus(event) {
    this.isOnline = event.type === 'online';

    if (this.isOnline) {
      toast('Conexão restaurada', TOAST_CONFIG.TYPES.SUCCESS);
      // Attempt to recover from network errors
      this.recoverFromNetworkErrors();
    } else {
      toast('Conexão perdida. Trabalhando offline...', TOAST_CONFIG.TYPES.WARNING);
    }
  }

  /**
   * Main error handling method
   * @param {Object} error - Error object
   * @param {Object} options - Handling options
   */
  handleError(error, options = {}) {
    const {
      showToUser = true,
      strategy = RECOVERY_STRATEGY.NONE,
      context = null,
      retryCallback = null,
      maxRetries = ERROR_CONFIG.MAX_RETRY_ATTEMPTS
    } = options;

    // Normalize error object
    const normalizedError = this.normalizeError(error);

    // Generate unique error ID to prevent duplicates
    const errorId = this.generateErrorId(normalizedError);

    // Check if this error is already being handled
    if (this.errors.has(errorId)) {
      return this.errors.get(errorId);
    }

    // Add to active errors
    const errorInfo = {
      ...normalizedError,
      id: errorId,
      strategy,
      context,
      retryCallback,
      maxRetries,
      timestamp: new Date().toISOString()
    };

    this.errors.set(errorId, errorInfo);

    // Log the error
    this.logError(errorInfo);

    // Show to user if requested
    if (showToUser) {
      this.showErrorToUser(errorInfo);
    }

    // Execute recovery strategy
    this.executeRecoveryStrategy(errorInfo);

    return errorInfo;
  }

  /**
   * Normalize error into standard format
   */
  normalizeError(error) {
    // Handle different error types
    if (error instanceof Error) {
      return {
        category: this.categorizeError(error),
        severity: this.determineSeverity(error),
        message: error.message,
        stack: error.stack,
        name: error.name
      };
    }

    // Handle HTTP errors
    if (error.status) {
      return {
        category: error.status >= 500 ? ERROR_CATEGORY.SYSTEM :
                  error.status >= 400 ? ERROR_CATEGORY.API :
                  ERROR_CATEGORY.NETWORK,
        severity: error.status >= 500 ? ERROR_SEVERITY.CRITICAL :
                  error.status >= 400 ? ERROR_SEVERITY.ERROR :
                  ERROR_SEVERITY.WARNING,
        message: error.statusText || `HTTP Error ${error.status}`,
        status: error.status,
        url: error.url
      };
    }

    // Handle string errors
    if (typeof error === 'string') {
      return {
        category: ERROR_CATEGORY.SYSTEM,
        severity: ERROR_SEVERITY.ERROR,
        message: error
      };
    }

    // Handle structured error objects
    return {
      category: error.category || ERROR_CATEGORY.SYSTEM,
      severity: error.severity || ERROR_SEVERITY.ERROR,
      message: error.message || 'Erro desconhecido',
      ...error
    };
  }

  /**
   * Categorize error based on type and properties
   */
  categorizeError(error) {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return ERROR_CATEGORY.SYSTEM;
    }

    if (error.name === 'ValidationError') {
      return ERROR_CATEGORY.VALIDATION;
    }

    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return ERROR_CATEGORY.NETWORK;
    }

    if (error.message?.includes('timeout')) {
      return ERROR_CATEGORY.TIMEOUT;
    }

    if (error.message?.includes('auth') || error.message?.includes('unauthorized')) {
      return ERROR_CATEGORY.AUTHENTICATION;
    }

    return ERROR_CATEGORY.SYSTEM;
  }

  /**
   * Determine error severity
   */
  determineSeverity(error) {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return ERROR_SEVERITY.CRITICAL;
    }

    if (error.name === 'ValidationError') {
      return ERROR_SEVERITY.WARNING;
    }

    return ERROR_SEVERITY.ERROR;
  }

  /**
   * Generate unique error ID
   */
  generateErrorId(error) {
    const key = `${error.category}-${error.message}-${error.stack?.split('\n')[0] || ''}`;
    return btoa(key).substring(0, 16);
  }

  /**
   * Show error to user with appropriate messaging
   */
  showErrorToUser(errorInfo) {
    const userMessage = this.getUserMessage(errorInfo);
    const toastType = this.getToastType(errorInfo.severity);

    toast(userMessage, toastType);

    // For critical errors, also show modal if available
    if (errorInfo.severity === ERROR_SEVERITY.CRITICAL) {
      this.showCriticalErrorModal(errorInfo);
    }
  }

  /**
   * Get user-friendly message in Portuguese
   */
  getUserMessage(errorInfo) {
    const categoryMessages = ERROR_MESSAGES_PT[errorInfo.category];

    if (categoryMessages && categoryMessages[errorInfo.severity]) {
      return categoryMessages[errorInfo.severity];
    }

    return FALLBACK_MESSAGES[errorInfo.severity] || FALLBACK_MESSAGES[ERROR_SEVERITY.ERROR];
  }

  /**
   * Convert error severity to toast type
   */
  getToastType(severity) {
    switch (severity) {
      case ERROR_SEVERITY.INFO:
        return TOAST_CONFIG.TYPES.INFO;
      case ERROR_SEVERITY.WARNING:
        return TOAST_CONFIG.TYPES.WARNING;
      case ERROR_SEVERITY.ERROR:
      case ERROR_SEVERITY.CRITICAL:
        return TOAST_CONFIG.TYPES.ERROR;
      default:
        return TOAST_CONFIG.TYPES.ERROR;
    }
  }

  /**
   * Execute recovery strategy
   */
  async executeRecoveryStrategy(errorInfo) {
    const { strategy, id, retryCallback, maxRetries } = errorInfo;

    switch (strategy) {
      case RECOVERY_STRATEGY.RETRY:
        await this.retryOperation(id, retryCallback, maxRetries);
        break;

      case RECOVERY_STRATEGY.FALLBACK:
        await this.fallbackToDefault(errorInfo);
        break;

      case RECOVERY_STRATEGY.RELOAD:
        this.offerPageReload(errorInfo);
        break;

      case RECOVERY_STRATEGY.USER_ACTION:
        this.requestUserAction(errorInfo);
        break;

      default:
        // No automatic recovery
        break;
    }
  }

  /**
   * Retry operation with exponential backoff
   */
  async retryOperation(errorId, retryCallback, maxRetries) {
    if (!retryCallback || typeof retryCallback !== 'function') {
      return;
    }

    const currentAttempts = this.retryAttempts.get(errorId) || 0;

    if (currentAttempts >= maxRetries) {
      console.warn(`Maximum retry attempts (${maxRetries}) reached for error ${errorId}`);
      return;
    }

    this.retryAttempts.set(errorId, currentAttempts + 1);

    // Calculate delay with exponential backoff
    const delay = Math.min(
      ERROR_CONFIG.RETRY_BASE_DELAY * Math.pow(ERROR_CONFIG.RETRY_MULTIPLIER, currentAttempts),
      ERROR_CONFIG.RETRY_MAX_DELAY
    );

    toast(`Tentativa ${currentAttempts + 1}/${maxRetries}...`, TOAST_CONFIG.TYPES.INFO);

    setTimeout(async () => {
      try {
        await retryCallback();
        // Success - clear error and retry count
        this.errors.delete(errorId);
        this.retryAttempts.delete(errorId);
        toast('Operação recuperada com sucesso', TOAST_CONFIG.TYPES.SUCCESS);
      } catch (retryError) {
        // Retry failed, handle the new error
        this.handleError(retryError, {
          showToUser: currentAttempts + 1 >= maxRetries, // Only show if this was the last attempt
          strategy: RECOVERY_STRATEGY.RETRY,
          retryCallback,
          maxRetries
        });
      }
    }, delay);
  }

  /**
   * Fall back to default/cached data
   */
  async fallbackToDefault(errorInfo) {
    toast('Usando dados em cache...', TOAST_CONFIG.TYPES.INFO);

    // Emit event for components to handle fallback
    window.dispatchEvent(new CustomEvent('error:fallback', {
      detail: { errorInfo, timestamp: Date.now() }
    }));
  }

  /**
   * Offer page reload for critical errors
   */
  offerPageReload(errorInfo) {
    // Use existing modal system if available, otherwise use confirm
    const shouldReload = confirm(
      'Ocorreu um erro crítico. Deseja recarregar a página?'
    );

    if (shouldReload) {
      window.location.reload();
    }
  }

  /**
   * Request user action for recoverable errors
   */
  requestUserAction(errorInfo) {
    // Emit event for UI components to show action buttons
    window.dispatchEvent(new CustomEvent('error:userAction', {
      detail: {
        errorInfo,
        actions: ['retry', 'dismiss'],
        timestamp: Date.now()
      }
    }));
  }

  /**
   * Show critical error modal
   */
  showCriticalErrorModal(errorInfo) {
    // Implementation would depend on existing modal system
    // For now, emit event for modal handling
    window.dispatchEvent(new CustomEvent('error:critical', {
      detail: { errorInfo, timestamp: Date.now() }
    }));
  }

  /**
   * Recover from network errors when connection is restored
   */
  recoverFromNetworkErrors() {
    // Find and retry network-related errors
    for (const [errorId, errorInfo] of this.errors.entries()) {
      if (errorInfo.category === ERROR_CATEGORY.NETWORK &&
          errorInfo.retryCallback &&
          (this.retryAttempts.get(errorId) || 0) < errorInfo.maxRetries) {

        this.retryOperation(errorId, errorInfo.retryCallback, errorInfo.maxRetries);
      }
    }
  }

  /**
   * Log error for debugging and monitoring
   */
  logError(errorInfo) {
    // Add to internal log
    this.errorLog.push({
      ...errorInfo,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Keep log size manageable
    if (this.errorLog.length > ERROR_CONFIG.MAX_LOG_ENTRIES) {
      this.errorLog.splice(0, this.errorLog.length - ERROR_CONFIG.MAX_LOG_ENTRIES);
    }

    // Console logging based on severity
    const consoleMethod = errorInfo.severity === ERROR_SEVERITY.CRITICAL ? 'error' :
                         errorInfo.severity === ERROR_SEVERITY.ERROR ? 'error' :
                         errorInfo.severity === ERROR_SEVERITY.WARNING ? 'warn' : 'info';

    console[consoleMethod]('🚨 Error handled:', {
      id: errorInfo.id,
      category: errorInfo.category,
      severity: errorInfo.severity,
      message: errorInfo.message,
      stack: errorInfo.stack,
      context: errorInfo.context
    });

    // Send to external monitoring if configured
    this.sendToExternalMonitoring(errorInfo);
  }

  /**
   * Send error to external monitoring service
   */
  sendToExternalMonitoring(errorInfo) {
    // Implementation would depend on monitoring service (e.g., Sentry, LogRocket)
    // Rate limiting to prevent overwhelming external services
    if (!this.monitoringRateLimit) {
      this.monitoringRateLimit = new Map();
    }

    const now = Date.now();
    const rateLimitKey = `${errorInfo.category}-${errorInfo.severity}`;
    const lastSent = this.monitoringRateLimit.get(rateLimitKey) || 0;
    const rateLimit = ERROR_CONFIG.MONITORING?.RATE_LIMIT_MS || 30000; // 30 seconds default

    // Rate limit similar errors to prevent spam
    if (now - lastSent < rateLimit) {
      return;
    }

    this.monitoringRateLimit.set(rateLimitKey, now);

    // Clean up old rate limit entries every 5 minutes
    if (this.monitoringRateLimit.size > 50) {
      const fiveMinutesAgo = now - (5 * 60 * 1000);
      for (const [key, timestamp] of this.monitoringRateLimit.entries()) {
        if (timestamp < fiveMinutesAgo) {
          this.monitoringRateLimit.delete(key);
        }
      }
    }

    // For now, we'll just prepare the data structure
    if (window.TRChangeSystem?.monitoring?.enabled) {
      const monitoringData = {
        errorId: errorInfo.id,
        category: errorInfo.category,
        severity: errorInfo.severity,
        message: errorInfo.message,
        stack: errorInfo.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: errorInfo.timestamp,
        context: errorInfo.context
      };

      // Send to monitoring service
      requestIdleCallback(() => {
        if (typeof window.TRChangeSystem.monitoring.send === 'function') {
          window.TRChangeSystem.monitoring.send(monitoringData);
        }
      });
    }
  }

  /**
   * Clear specific error
   */
  clearError(errorId) {
    this.errors.delete(errorId);
    this.retryAttempts.delete(errorId);
  }

  /**
   * Clear all errors
   */
  clearAllErrors() {
    this.errors.clear();
    this.retryAttempts.clear();
  }

  /**
   * Clean up expired errors to prevent memory leaks in long-running sessions
   */
  cleanupExpiredErrors() {
    const now = Date.now();
    const maxAge = ERROR_CONFIG.ERROR_EXPIRY_MS || (30 * 60 * 1000); // 30 minutes default
    const maxLogSize = ERROR_CONFIG.MAX_LOG_ENTRIES || 100;

    // Clean up expired active errors
    for (const [errorId, errorInfo] of this.errors.entries()) {
      if (now - new Date(errorInfo.timestamp).getTime() > maxAge) {
        this.errors.delete(errorId);
        this.retryAttempts.delete(errorId);
      }
    }

    // Clean up old retry attempts
    for (const [errorId, attempts] of this.retryAttempts.entries()) {
      if (!this.errors.has(errorId)) {
        this.retryAttempts.delete(errorId);
      }
    }

    // Trim error log if it gets too large
    if (this.errorLog.length > maxLogSize) {
      this.errorLog = this.errorLog.slice(-maxLogSize);
    }

    // Clean up monitoring rate limit map
    if (this.monitoringRateLimit?.size > 100) {
      const cutoff = now - (10 * 60 * 1000); // 10 minutes
      for (const [key, timestamp] of this.monitoringRateLimit.entries()) {
        if (timestamp < cutoff) {
          this.monitoringRateLimit.delete(key);
        }
      }
    }

    console.log(`🧹 Cleaned up expired errors. Active: ${this.errors.size}, Log: ${this.errorLog.length}`);
  }

  /**
   * Get current error statistics
   */
  getErrorStats() {
    const stats = {
      total: this.errorLog.length,
      active: this.errors.size,
      bySeverity: {},
      byCategory: {}
    };

    // Count by severity and category
    for (const error of this.errorLog) {
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
    }

    return stats;
  }

  /**
   * Cleanup method
   */
  destroy() {
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener('unhandledrejection', this.handleUnhandledRejection);
    window.removeEventListener('online', this.handleOnlineStatus);
    window.removeEventListener('offline', this.handleOnlineStatus);

    // Clear cleanup interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    this.clearAllErrors();
    this.errorLog = [];

    // Clear monitoring rate limit map
    if (this.monitoringRateLimit) {
      this.monitoringRateLimit.clear();
    }

    console.log('🛡️ Error handler destroyed');
  }
}

// Create and export singleton instance
const errorHandler = new ErrorHandler();

/**
 * Convenience methods for common error scenarios
 */
const handleNetworkError = (error, retryCallback, context = null) => {
  return errorHandler.handleError(error, {
    showToUser: true,
    category: ERROR_CATEGORY.NETWORK,
    severity: ERROR_SEVERITY.ERROR,
    strategy: RECOVERY_STRATEGY.RETRY,
    context,
    retryCallback,
    maxRetries: ERROR_CONFIG.MAX_RETRY_ATTEMPTS
  });
};

const handleAPIError = (error, context = null) => {
  return errorHandler.handleError(error, {
    showToUser: true,
    category: ERROR_CATEGORY.API,
    severity: ERROR_SEVERITY.ERROR,
    strategy: RECOVERY_STRATEGY.FALLBACK,
    context
  });
};

const handleValidationError = (error, context = null) => {
  return errorHandler.handleError(error, {
    showToUser: true,
    category: ERROR_CATEGORY.VALIDATION,
    severity: ERROR_SEVERITY.WARNING,
    strategy: RECOVERY_STRATEGY.USER_ACTION,
    context
  });
};

const handleCriticalError = (error, context = null) => {
  return errorHandler.handleError(error, {
    showToUser: true,
    category: ERROR_CATEGORY.SYSTEM,
    severity: ERROR_SEVERITY.CRITICAL,
    strategy: RECOVERY_STRATEGY.RELOAD,
    context
  });
};

// Make error handling system available globally
if (typeof window !== 'undefined') {
  window.errorHandler = errorHandler;
  window.ERROR_SEVERITY = ERROR_SEVERITY;
  window.ERROR_CATEGORY = ERROR_CATEGORY;
  window.RECOVERY_STRATEGY = RECOVERY_STRATEGY;
  window.handleNetworkError = handleNetworkError;
  window.handleAPIError = handleAPIError;
  window.handleValidationError = handleValidationError;
  window.handleCriticalError = handleCriticalError;
}

console.log('🛡️ Error Handler Module loaded');
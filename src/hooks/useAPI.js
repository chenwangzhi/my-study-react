/**
 * API 请求 Hook
 * 提供统一的 API 调用、加载状态管理和错误处理
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useNotification } from './useNotification'

/**
 * 基础 API Hook
 * @param {Function} apiFunction - API 函数
 * @param {Object} options - 配置选项
 */
export function useAPI(apiFunction, options = {}) {
  const {
    immediate = false, // 是否立即执行
    defaultData = null, // 默认数据
    onSuccess, // 成功回调
    onError, // 错误回调
    showSuccessMessage = false, // 是否显示成功消息
    showErrorMessage = true, // 是否显示错误消息
    successMessage = '操作成功', // 成功消息
    errorMessage = '操作失败', // 错误消息
  } = options

  const [data, setData] = useState(defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { showSuccess, showError } = useNotification()
  const cancelRef = useRef(false)
  const loadingRef = useRef(false) // 添加loading状态的ref引用

  // 执行 API 请求
  const execute = useCallback(
    async (...args) => {
      // 如果组件已卸载或已有请求在进行中，直接返回
      if (cancelRef.current || loadingRef.current) return

      let result = null

      try {
        // 设置loading状态
        loadingRef.current = true
        setLoading(true)
        setError(null)

        // 执行API请求
        result = await apiFunction(...args)

        // 检查组件是否已卸载
        if (cancelRef.current) return result

        // 设置数据
        setData(result)

        // 显示成功消息
        if (showSuccessMessage) {
          showSuccess(successMessage)
        }

        // 执行成功回调
        if (onSuccess) {
          try {
            onSuccess(result, ...args)
          } catch (callbackError) {
            console.error('Success callback error:', callbackError)
          }
        }

        return result
      } catch (err) {
        // 检查组件是否已卸载
        if (cancelRef.current) return

        // 设置错误状态
        setError(err)

        // 显示错误消息
        if (showErrorMessage) {
          const message =
            err?.message || err?.response?.data?.message || errorMessage
          showError(message)
        }

        // 执行错误回调
        if (onError) {
          try {
            onError(err, ...args)
          } catch (callbackError) {
            console.error('Error callback error:', callbackError)
          }
        }

        // 重新抛出错误，让调用者可以处理
        throw err
      } finally {
        // 确保loading状态被重置，无论成功还是失败
        loadingRef.current = false
        if (!cancelRef.current) {
          setLoading(false)
        }
      }
    },
    [
      apiFunction,
      onSuccess,
      onError,
      showSuccessMessage,
      showErrorMessage,
      successMessage,
      errorMessage,
      showSuccess,
      showError,
    ],
  )

  // 重置状态
  const reset = useCallback(() => {
    setData(defaultData)
    setError(null)
    setLoading(false)
    loadingRef.current = false
  }, [defaultData])

  // 取消请求
  const cancel = useCallback(() => {
    cancelRef.current = true
    setLoading(false)
    loadingRef.current = false
  }, [])

  // 立即执行
  useEffect(() => {
    if (immediate) {
      execute().catch(() => {
        // 静默处理immediate执行的错误，因为错误已经在execute中处理了
      })
    }
  }, [immediate, execute])

  // 组件卸载时取消请求
  useEffect(() => {
    return () => {
      cancelRef.current = true
      loadingRef.current = false
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
    cancel, // 新增取消功能
  }
}

/**
 * 分页 API Hook
 * @param {Function} apiFunction - API 函数
 * @param {Object} options - 配置选项
 */
export function usePaginatedAPI(apiFunction, options = {}) {
  const {
    initialPage = 1,
    initialPageSize = 10,
    immediate = true,
    ...restOptions
  } = options

  const [pagination, setPagination] = useState({
    current: initialPage,
    pageSize: initialPageSize,
    total: 0,
  })

  const [filters, setFilters] = useState({})

  const {
    data,
    loading,
    error,
    execute: originalExecute,
    reset,
  } = useAPI(apiFunction, {
    ...restOptions,
    immediate: false,
  })

  // 执行请求
  const execute = useCallback(
    async (params = {}) => {
      const requestParams = {
        page: pagination.current,
        pageSize: pagination.pageSize,
        ...filters,
        ...params,
      }

      const result = await originalExecute(requestParams)

      // 更新分页信息
      if (result && typeof result === 'object') {
        const { data: listData, total, page, pageSize } = result

        if (total !== undefined) {
          setPagination((prev) => ({
            ...prev,
            total,
            current: page || prev.current,
            pageSize: pageSize || prev.pageSize,
          }))
        }

        return listData || result
      }

      return result
    },
    [filters, originalExecute], // 移除pagination依赖，使用最新的state
  )

  // 改变页码
  const changePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: pageSize || prev.pageSize,
    }))
  }, [])

  // 改变筛选条件
  const changeFilters = useCallback((newFilters) => {
    setFilters(newFilters)
    setPagination((prev) => ({ ...prev, current: 1 })) // 重置到第一页
  }, [])

  // 刷新当前页
  const refresh = useCallback(() => {
    execute()
  }, [execute])

  // 重置分页和筛选
  const resetPagination = useCallback(() => {
    setPagination({
      current: initialPage,
      pageSize: initialPageSize,
      total: 0,
    })
    setFilters({})
    reset()
  }, [initialPage, initialPageSize, reset])

  // 监听分页变化
  useEffect(() => {
    if (immediate || pagination.current !== initialPage) {
      execute()
    }
  }, [pagination.current, pagination.pageSize, execute])

  // 监听筛选条件变化
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      execute()
    }
  }, [filters, execute])

  return {
    data,
    loading,
    error,
    pagination,
    filters,
    execute,
    changePage,
    changeFilters,
    refresh,
    reset: resetPagination,
  }
}

/**
 * 文件上传 Hook
 * @param {Function} uploadFunction - 上传函数
 * @param {Object} options - 配置选项
 */
export function useUpload(uploadFunction, options = {}) {
  const {
    onSuccess,
    onError,
    showSuccessMessage = true,
    showErrorMessage = true,
    successMessage = '上传成功',
    errorMessage = '上传失败',
  } = options

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const { showSuccess, showError } = useNotification()
  const uploadingRef = useRef(false) // 添加上传状态的ref引用

  const upload = useCallback(
    async (file) => {
      // 如果已有上传在进行中，直接返回
      if (uploadingRef.current) {
        console.warn('Upload already in progress')
        return
      }

      let result = null

      try {
        // 设置上传状态
        uploadingRef.current = true
        setUploading(true)
        setProgress(0)
        setError(null)

        // 执行上传
        result = await uploadFunction(file, (progressPercent) => {
          // 确保进度值在有效范围内
          const validProgress = Math.max(0, Math.min(100, progressPercent || 0))
          setProgress(validProgress)
        })

        // 显示成功消息
        if (showSuccessMessage) {
          showSuccess(successMessage)
        }

        // 执行成功回调
        if (onSuccess) {
          try {
            onSuccess(result, file)
          } catch (callbackError) {
            console.error('Upload success callback error:', callbackError)
          }
        }

        return result
      } catch (err) {
        // 设置错误状态
        setError(err)

        // 显示错误消息
        if (showErrorMessage) {
          const message =
            err?.message || err?.response?.data?.message || errorMessage
          showError(message)
        }

        // 执行错误回调
        if (onError) {
          try {
            onError(err, file)
          } catch (callbackError) {
            console.error('Upload error callback error:', callbackError)
          }
        }

        // 重新抛出错误
        throw err
      } finally {
        // 确保上传状态被重置，无论成功还是失败
        uploadingRef.current = false
        setUploading(false)
        setProgress(0)
      }
    },
    [
      uploadFunction,
      onSuccess,
      onError,
      showSuccessMessage,
      showErrorMessage,
      successMessage,
      errorMessage,
      showSuccess,
      showError,
    ],
  )

  // 取消上传
  const cancelUpload = useCallback(() => {
    uploadingRef.current = false
    setUploading(false)
    setProgress(0)
    setError(null)
  }, [])

  return {
    upload,
    uploading,
    progress,
    error,
    cancelUpload, // 新增取消上传功能
  }
}

/**
 * 批量操作 Hook
 * @param {Function} batchFunction - 批量操作函数
 * @param {Object} options - 配置选项
 */
export function useBatchOperation(batchFunction, options = {}) {
  const {
    onSuccess,
    onError,
    showSuccessMessage = true,
    showErrorMessage = true,
    successMessage = '批量操作成功',
    errorMessage = '批量操作失败',
  } = options

  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState([])
  const { showSuccess, showError } = useNotification()
  const loadingRef = useRef(false) // 添加loading状态的ref引用

  const execute = useCallback(
    async (items) => {
      // 如果已有批量操作在进行中，直接返回
      if (loadingRef.current) {
        console.warn('Batch operation already in progress')
        return
      }

      if (!Array.isArray(items) || items.length === 0) {
        const error = new Error('Items must be a non-empty array')
        if (showErrorMessage) {
          showError(error.message)
        }
        throw error
      }

      let batchResults = []
      let batchErrors = []

      try {
        // 设置loading状态
        loadingRef.current = true
        setLoading(true)
        setProgress(0)
        setResults([])
        setErrors([])

        const total = items.length
        batchResults = []
        batchErrors = []

        for (let i = 0; i < total; i++) {
          try {
            const result = await batchFunction(items[i], i)
            batchResults.push({ index: i, item: items[i], result })
          } catch (error) {
            batchErrors.push({ index: i, item: items[i], error })
          }

          // 更新进度
          const progressPercent = Math.round(((i + 1) / total) * 100)
          setProgress(progressPercent)
        }

        // 设置最终结果
        setResults(batchResults)
        setErrors(batchErrors)

        // 显示消息
        if (batchErrors.length === 0 && showSuccessMessage) {
          showSuccess(successMessage)
        } else if (batchErrors.length > 0 && showErrorMessage) {
          showError(`${errorMessage}: ${batchErrors.length}/${total} 失败`)
        }

        // 执行成功回调
        if (onSuccess) {
          try {
            onSuccess(batchResults, batchErrors)
          } catch (callbackError) {
            console.error(
              'Batch operation success callback error:',
              callbackError,
            )
          }
        }

        return { results: batchResults, errors: batchErrors }
      } catch (err) {
        // 设置错误状态
        const errorInfo = [{ error: err }]
        setErrors(errorInfo)

        // 显示错误消息
        if (showErrorMessage) {
          const message =
            err?.message || err?.response?.data?.message || errorMessage
          showError(message)
        }

        // 执行错误回调
        if (onError) {
          try {
            onError(err)
          } catch (callbackError) {
            console.error(
              'Batch operation error callback error:',
              callbackError,
            )
          }
        }

        // 重新抛出错误
        throw err
      } finally {
        // 确保loading状态被重置，无论成功还是失败
        loadingRef.current = false
        setLoading(false)
        // 注意：这里不重置progress，让用户看到最终进度
      }
    },
    [
      batchFunction,
      onSuccess,
      onError,
      showSuccessMessage,
      showErrorMessage,
      successMessage,
      errorMessage,
      showSuccess,
      showError,
    ],
  )

  // 取消批量操作
  const cancel = useCallback(() => {
    loadingRef.current = false
    setLoading(false)
  }, [])

  // 重置状态
  const reset = useCallback(() => {
    setProgress(0)
    setResults([])
    setErrors([])
    setLoading(false)
    loadingRef.current = false
  }, [])

  return {
    execute,
    loading,
    progress,
    results,
    errors,
    cancel, // 新增取消功能
    reset, // 新增重置功能
  }
}

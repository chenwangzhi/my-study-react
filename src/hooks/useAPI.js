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

  // 执行 API 请求
  const execute = useCallback(
    async (...args) => {
      if (cancelRef.current) return

      try {
        setLoading(true)
        setError(null)

        const result = await apiFunction(...args)

        if (cancelRef.current) return

        setData(result)

        // 显示成功消息
        if (showSuccessMessage) {
          showSuccess(successMessage)
        }

        // 执行成功回调
        if (onSuccess) {
          onSuccess(result, ...args)
        }

        return result
      } catch (err) {
        if (cancelRef.current) return

        setError(err)

        // 显示错误消息
        if (showErrorMessage) {
          showError(err.message || errorMessage)
        }

        // 执行错误回调
        if (onError) {
          onError(err, ...args)
        }

        throw err
      } finally {
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
    ]
  )

  // 重置状态
  const reset = useCallback(() => {
    setData(defaultData)
    setError(null)
    setLoading(false)
  }, [defaultData])

  // 立即执行
  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  // 组件卸载时取消请求
  useEffect(() => {
    return () => {
      cancelRef.current = true
    }
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
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
          setPagination(prev => ({
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
    [pagination.current, pagination.pageSize, filters, originalExecute]
  )

  // 改变页码
  const changePage = useCallback(
    (page, pageSize) => {
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize: pageSize || prev.pageSize,
      }))
    },
    []
  )

  // 改变筛选条件
  const changeFilters = useCallback((newFilters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, current: 1 })) // 重置到第一页
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
  }, [pagination.current, pagination.pageSize])

  // 监听筛选条件变化
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      execute()
    }
  }, [filters])

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

  const upload = useCallback(
    async (file) => {
      try {
        setUploading(true)
        setProgress(0)
        setError(null)

        const result = await uploadFunction(file, (progressPercent) => {
          setProgress(progressPercent)
        })

        if (showSuccessMessage) {
          showSuccess(successMessage)
        }

        if (onSuccess) {
          onSuccess(result, file)
        }

        return result
      } catch (err) {
        setError(err)

        if (showErrorMessage) {
          showError(err.message || errorMessage)
        }

        if (onError) {
          onError(err, file)
        }

        throw err
      } finally {
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
    ]
  )

  return {
    upload,
    uploading,
    progress,
    error,
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

  const execute = useCallback(
    async (items) => {
      try {
        setLoading(true)
        setProgress(0)
        setResults([])
        setErrors([])

        const total = items.length
        const batchResults = []
        const batchErrors = []

        for (let i = 0; i < total; i++) {
          try {
            const result = await batchFunction(items[i], i)
            batchResults.push({ index: i, item: items[i], result })
          } catch (error) {
            batchErrors.push({ index: i, item: items[i], error })
          }

          setProgress(Math.round(((i + 1) / total) * 100))
        }

        setResults(batchResults)
        setErrors(batchErrors)

        if (batchErrors.length === 0 && showSuccessMessage) {
          showSuccess(successMessage)
        } else if (batchErrors.length > 0 && showErrorMessage) {
          showError(`${errorMessage}: ${batchErrors.length}/${total} 失败`)
        }

        if (onSuccess) {
          onSuccess(batchResults, batchErrors)
        }

        return { results: batchResults, errors: batchErrors }
      } catch (err) {
        setErrors([{ error: err }])

        if (showErrorMessage) {
          showError(err.message || errorMessage)
        }

        if (onError) {
          onError(err)
        }

        throw err
      } finally {
        setLoading(false)
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
    ]
  )

  return {
    execute,
    loading,
    progress,
    results,
    errors,
  }
}
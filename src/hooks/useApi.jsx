import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api';

// Environment configuration
const API_BASE_URL = 'https://og-technologies.herokuapp.com/';

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default options
  const {
    method = 'GET',
    body = null,
    headers = {},
    immediate = true, // Whether to fetch immediately on mount
    dependencies = [], // Dependency array for refetching
    onSuccess = null, // Success callback
    onError = null, // Error callback
    ...restOptions
  } = options;

  // Fetch function
  const fetchData = useCallback(async (requestOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const requestUrl = requestOptions.url || url;
      const requestMethod = requestOptions.method || method;
      const requestBody = requestOptions.body || body;

      switch (requestMethod.toUpperCase()) {
        case 'GET':
          response = await apiGet(requestUrl, { headers, ...restOptions, ...requestOptions });
          break;
        case 'POST':
          response = await apiPost(requestUrl, requestBody, { headers, ...restOptions, ...requestOptions });
          break;
        case 'PUT':
          response = await apiPut(requestUrl, requestBody, { headers, ...restOptions, ...requestOptions });
          break;
        case 'DELETE':
          response = await apiDelete(requestUrl, { headers, ...restOptions, ...requestOptions });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${requestMethod}`);
      }

      setData(response);
      
      if (onSuccess) {
        onSuccess(response);
      }
      
      return response;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, body, headers, onSuccess, onError, restOptions]);

  // Immediate fetch on mount
  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }
  }, [immediate, url, fetchData, Array.isArray(dependencies) ? dependencies : []]);

  // Refetch function
  const refetch = useCallback((requestOptions = {}) => {
    return fetchData(requestOptions);
  }, [fetchData]);

  // Mutate function for POST/PUT/DELETE
  const mutate = useCallback(async (mutationData, mutationOptions = {}) => {
    return fetchData({
      method: mutationOptions.method || 'POST',
      body: mutationData,
      ...mutationOptions
    });
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
    fetchData
  };
};

// Hook for paginated data
export const usePaginatedApi = (url, options = {}) => {
  const [page, setPage] = useState(options.initialPage || 1);
  const [limit, setLimit] = useState(options.initialLimit || 10);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const buildUrl = useCallback((pageNum, limitNum) => {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      limit: limitNum.toString(),
      ...options.params
    });
    
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${params.toString()}`;
  }, [url, options.params]);

  const { data, loading, error, refetch } = useApi(buildUrl(page, limit), {
    ...options,
    dependencies: [page, limit, buildUrl]
  });

  // Update pagination info when data changes
  useEffect(() => {
    if (data && data.pagination) {
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
    }
  }, [data]);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const changeLimit = useCallback((newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when changing limit
  }, []);

  return {
    data: data?.data || data,
    pagination: {
      page,
      limit,
      total,
      pages,
      hasNextPage: page < pages,
      hasPrevPage: page > 1
    },
    loading,
    error,
    refetch,
    goToPage,
    nextPage,
    prevPage,
    changeLimit
  };
};

// Hook for CRUD operations
export const useCrudApi = (baseUrl, options = {}) => {
  const [items, setItems] = useState([]);
  
  // Get all items
  const { data, loading, error, refetch } = useApi(baseUrl, {
    ...options,
    onSuccess: (response) => {
      setItems(response?.data || response || []);
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    }
  });

  // Create item
  const create = useCallback(async (itemData, createOptions = {}) => {
    try {
      const response = await apiPost(baseUrl, itemData, createOptions);
      setItems(prev => [...prev, response]);
      return response;
    } catch (error) {
      throw error;
    }
  }, [baseUrl]);

  // Update item
  const update = useCallback(async (id, itemData, updateOptions = {}) => {
    try {
      const response = await apiPut(`${baseUrl}/${id}`, itemData, updateOptions);
      setItems(prev => prev.map(item => 
        item._id === id || item.id === id ? response : item
      ));
      return response;
    } catch (error) {
      throw error;
    }
  }, [baseUrl]);

  // Delete item
  const remove = useCallback(async (id, deleteOptions = {}) => {
    try {
      await apiDelete(`${baseUrl}/${id}`, deleteOptions);
      setItems(prev => prev.filter(item => 
        item._id !== id && item.id !== id
      ));
    } catch (error) {
      throw error;
    }
  }, [baseUrl]);

  return {
    items,
    loading,
    error,
    refetch,
    create,
    update,
    remove
  };
};

export default useApi;

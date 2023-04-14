import { useCallback } from 'react';
import { useNavigate, useLoaderData as useReactRouterLoaderData } from 'react-router-dom';

export function useGoBack() {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(-1);
  }, [navigate]);
}

/**
 * Wrapper around react-router-dom's useLoaderData to enable generics.
 * @returns Data from the current route's loader function
 */
export function useLoaderData<T>() {
  return useReactRouterLoaderData() as T;
}

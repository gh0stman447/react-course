import { useCallback, useRef } from "react";

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throtleRef = useRef(false);

  return useCallback(
    (...args: any[]) => {
      if (!throtleRef.current) {
        callback(...args);
        throtleRef.current = true;

        setTimeout(() => {
          throtleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}

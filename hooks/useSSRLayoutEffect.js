// Problem with useLayoutEffect in SSR framework: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// Solution: Conditionally decide which hook to use
import { useEffect, useLayoutEffect } from "react";
const useSSRLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default useSSRLayoutEffect;

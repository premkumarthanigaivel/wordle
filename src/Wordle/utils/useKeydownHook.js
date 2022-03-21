import { useEffect } from "react"

const useKeydownHook = cb => {
  useEffect(() => {
    window.addEventListener("keydown", cb)
    return () => {
      window.removeEventListener("keydown", cb)
    }
  }, [cb])
}

export default useKeydownHook

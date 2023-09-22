import { useEffect } from 'react'

export const useOnClickOutside = (ref, actionToExecute) => {
    const handleClickOutside = event => {
        if (
            event.target && !ref.current?.contains(event.target)
        ) {
            actionToExecute()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })
}

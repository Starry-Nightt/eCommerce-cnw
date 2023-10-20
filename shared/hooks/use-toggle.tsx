import  { useState } from 'react'

function useToggle(defaultValue: boolean): [boolean, () => void] {
    const [value, setValue] = useState(defaultValue)

    const toggleValue = (): void => {
        setValue(!value)
    }

    return [value, toggleValue]
}

export default useToggle
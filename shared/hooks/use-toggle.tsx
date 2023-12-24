import  { useState } from 'react'

function useToggle(defaultValue: boolean): [boolean, (value?: boolean) => void] {
    const [value, setValue] = useState(defaultValue)
    const toggleValue = (mode?: boolean): void => {
        setValue(mode ?? !value)
    }

    return [value, toggleValue]
}

export default useToggle
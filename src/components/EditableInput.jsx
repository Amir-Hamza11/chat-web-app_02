import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const EditableInput = ({
    initialValue,
    onSave,
    label,
    placeholder = 'Write your value',
    emptyMsg = 'Input is empty',
    ...inputProps
}) => {

    const [input, setInput] = useState(initialValue)
    const [isEditable, SetIsEditable] = useState(false)

    const onInputChange = useCallback((value) => {
        setInput(value)
    }, [])

    const onEditClick = useCallback(() => {
        SetIsEditable(p => !p);
        setInput(initialValue)
    }, [initialValue])

    const onSaveClick = async ()=>{
        const trimmed = input.trim();

        if (trimmed === '') {
           Alert(emptyMsg, 4000); 
        }

        if (trimmed !== initialValue) {
            await onSave(trimmed);
        }

        SetIsEditable(false)
    }

    return (
        <div>
            {label}
            <InputGroup>
                <Input
                    {...inputProps}
                    disabled={!isEditable}
                    placeholder={placeholder}
                    value={input}
                    onChange={onInputChange}
                />

                <InputGroup.Button onClick={onEditClick} >
                    <Icon icon={isEditable ? 'close' : 'edit2'} />
                </InputGroup.Button>

                <InputGroup.Button onClick={onSaveClick} >
                    <Icon icon='check' />
                </InputGroup.Button>
            </InputGroup>
        </div>
    )
}

export default EditableInput
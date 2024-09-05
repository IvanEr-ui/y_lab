import { useState } from 'react';

interface PropsAuth {
    PropEmail?: string,
    PropPassword?: string
}

export function useAuthFormData({ PropEmail = "", PropPassword = "" }: PropsAuth) {
    const [email, setEmail] = useState(PropEmail);
    const [password, setPassword] = useState(PropPassword);
    const [validateEmail, setValidateEmail] = useState(false);


    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setValidateEmail(e.currentTarget.value.match(/\S+@\S+\.\S+/) ? true : false);
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    return [
        { email, password },
        { validateEmail },
        { onChangeEmail, onChangePassword }
    ];
}
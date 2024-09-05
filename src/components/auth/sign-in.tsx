
import { useAuthFormData } from '../../core/custom-hooks/useAuthData'
import { UIButton } from '../../core/ui-kit/button/Button'
import { UIInput } from '../../core/ui-kit/input/Input'

import styles from './sign-in.module.css'

const testDBUser = [
    {
        id: 1,
        email: "chev@gmail.ru",
        password: "123456"
    }
]

global.fetch = function (input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    return new Promise(function (resolve, reject) {
        const body = JSON.parse(String(init?.body)) //данные формы

        if (body.email === testDBUser[0].email && body.password === testDBUser[0].password) {
            const mockResponse = new Response(null, {
                status: 200,
            });
            resolve(mockResponse)
        }
        else {
            reject("Не правильная почта или пароль ")
        }
    })


}

export function SignIn() {
    const [ObjectData, ObjectValidateData, ObjectChangeData] = useAuthFormData({})

    const submitAuthentication = () => {
        if (ObjectData.email && ObjectData.password && ObjectValidateData.validateEmail) {
            fetch('/validateFormData', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ObjectData)
            }).then((data) => {
                if (data.status === 200) {
                    alert("Успешная аутентификация")
                }
            }).catch((err) => {
                alert(err)
            })
        }
        else {
            if (!ObjectValidateData.validateEmail && ObjectData.password) {
                alert("Введите действительную почту")
            }
            else {
                alert("Заполните все поля")
            }
        }
    }

    return (
        <div className={styles.sign_in}>
            <div className={styles.box_form}>
                <h1 style={{ marginBottom: "20px" }}>Войти</h1>
                <UIInput isize='medium'
                    value={ObjectData.email}
                    onChange={ObjectChangeData.onChangeEmail}
                    label='Почта'
                    validateLabel={{
                        view: ObjectValidateData.validateEmail,
                        desciption: "Введите действительную почту"
                    }}
                />
                <UIInput isize='medium'
                    value={ObjectData.password}
                    onChange={ObjectChangeData.onChangePassword}
                    label='Пароль'
                    toggleVisibility={true}
                    type="password"
                />
                <UIButton isize='medium' onClick={submitAuthentication}>Войти</UIButton>
            </div>
        </div >
    )
}
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../lib/api/auth";
import type { LoginDto } from "../../types/auth";
import { redirect } from "@tanstack/react-router";

function LoginPage() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const mutation = useMutation({
        mutationFn: (data: LoginDto) => login(data),
        onSuccess: (response) => {
            localStorage.setItem("userToken", response.token);
            throw redirect({
                to: '/__authenticated/dashboard',
                search: {
                    redirect: location.href,
                },
            })
        }
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        mutation.mutate({
            email,
            password,
        })
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <label>Email</label>
                <input type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)} />
                <label>Password</label>
                <input type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default LoginPage;
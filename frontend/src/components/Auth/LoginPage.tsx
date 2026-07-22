import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../lib/api/auth";
import type { LoginDto } from "../../types/auth";
import { redirect, useNavigate } from "@tanstack/react-router";

function LoginPage() {
    const navigate = useNavigate();

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

    const navToRegister = () => {
        navigate({
            to: "/register"
        })
    }

    return (
        <section className="flex justify-center align-center h-full">
            <form onSubmit={onSubmit} className="flex flex-col border-1 rounded-md p-2 [&>input]:p-1 [&>input]:border-1">
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
                <button onClick={navToRegister} className="underline text-sky-400 cursor-pointer">Don't have an account? Sign up.</button>
            </form>
        </section>
    );
}

export default LoginPage;
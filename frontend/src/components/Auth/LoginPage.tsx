import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "../../lib/api/auth";
import type { LoginDto } from "../../types/auth";
import { useNavigate } from "@tanstack/react-router";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {mutate, isPending} = useMutation({
        mutationFn: (data: LoginDto) => login(data),
        onSuccess: (response) => {
            localStorage.setItem("userToken", response.token);
            navigate({
                to: '/dashboard',
                replace: true,
            })
        }
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        mutate({
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
                {
                    isPending ?
                        <button className="bg-sky-500 mt-2 rounded-md text-white p-1 hover:bg-sky-800 cursor-pointer" type="submit" disabled>Please wait</button>
                        :
                        <button className="bg-sky-500 mt-2 rounded-md text-white p-1 hover:bg-sky-800 cursor-pointer" type="submit">Submit</button>
                }
                <button onClick={navToRegister} className="underline text-sky-400 cursor-pointer">Don't have an account? Sign up.</button>
            </form>
        </section>
    );
}

export default LoginPage;
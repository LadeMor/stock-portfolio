import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { RegisterDto } from "../../types/auth";
import { register } from "../../lib/api/auth";
import { useNavigate, redirect } from "@tanstack/react-router";

function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {
        mutate,
        error,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (data: RegisterDto) => register(data),
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

        mutate({
            email,
            password,
        })
    }

    const navToLogin = () => {
        navigate({
            to: "/login"
        })
    }

    return (
        <section className="flex justify-center align-center h-full">
            <form onSubmit={onSubmit} className="flex flex-col border-1 rounded-md p-2 [&>input]:p-1 [&>input]:border-1">
                <h2>Register</h2>
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
                {
                    isError ?? <h2>Something went wrong {error}</h2>
                }
                <button onClick={navToLogin} className="underline text-sky-400 cursor-pointer">Have an account? Log in.</button>
            </form>
        </section>
    );
}

export default RegisterPage;
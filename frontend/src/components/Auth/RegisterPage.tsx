import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import type { RegisterDto } from "../../types/auth";
import { register } from "../../lib/api/auth";

function RegisterPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const mutation = useMutation({
        mutationFn: (data: RegisterDto) => register(data),
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
                <h2>Register</h2>
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

export default RegisterPage;
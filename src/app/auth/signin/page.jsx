"use client";

import { useState } from "react";
import {
    Button,
    Link,
    TextField,
    Label,
    InputGroup,
    Input,
} from "@heroui/react";
import {
    Eye,
    EyeSlash,
    ShieldKeyhole,
} from "@gravity-ui/icons";
// import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SigninPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("redirect") || "/";

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);


    const handleSignin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: authError } = await signIn.email({
                email,
                password,
            });

            if (authError) {
                setError(
                    authError.message ||
                    "Invalid email or password"
                );
            } else {
                setSuccess(
                    "Signed in successfully! Redirecting..."
                );

                setEmail("");
                setPassword("");

                router.push(redirectTo);
            }

        } catch (err) {
            setError(
                "An unexpected network error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#f8f5ee]">


            {/* LEFT SIDE */}
            <div className="hidden lg:flex relative bg-gradient-to-br from-[#111c4e] via-[#15173f] to-[#0b0d28] text-white p-12 flex-col justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center">
                        📖
                    </div>

                    <h1 className="text-4xl font-serif font-bold">
                        Fable
                    </h1>
                </div>


                {/* Quote */}
                <div className="max-w-xl">
                    <h2 className="text-5xl font-serif italic leading-tight">
                        “A reader lives a thousand lives before he dies.
                        The man who never reads lives only one.”
                    </h2>

                    <p className="mt-8 text-white/60 text-xl">
                        — George R.R. Martin
                    </p>
                </div>


                {/* Footer */}
                <p className="text-white/40">
                    © 2026 Fable. All rights reserved.
                </p>

            </div>



            {/* RIGHT SIDE */}
            <div className="flex items-center justify-center p-6">

                <div className="w-full max-w-md">


                    {/* Header */}
                    <h1 className="text-5xl font-serif font-bold text-[#111c4e]">
                        Welcome back
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Sign in to your Fable account
                    </p>



                    {/* Demo Accounts */}
                    <div className="mt-8 rounded-2xl border bg-[#f3efe7] p-4">

                        <p className="text-sm text-gray-500 mb-3">
                            Demo accounts (click to autofill)
                        </p>


                        <div className="grid grid-cols-3 gap-2">

                            <button
                                type="button"
                                className="bg-red-700 text-white rounded-lg py-2 text-sm font-medium"
                            >
                                Admin
                            </button>


                            <button
                                type="button"
                                className="bg-blue-800 text-white rounded-lg py-2 text-sm font-medium"
                            >
                                Reader
                            </button>


                            <button
                                type="button"
                                className="bg-green-700 text-white rounded-lg py-2 text-sm font-medium"
                            >
                                Writer
                            </button>

                        </div>

                    </div>



                    {/* Form */}
                    <form
                        onSubmit={handleSignin}
                        className="mt-8 space-y-5"
                    >

                        {/* Email */}
                        <TextField className="flex flex-col gap-2">

                            <Label className="font-medium">
                                Email
                            </Label>

                            <InputGroup className="border rounded-xl px-4 bg-[#f3efe7] h-12">

                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    className="w-full bg-transparent outline-none"
                                />

                            </InputGroup>

                        </TextField>



                        {/* Password */}

                        <TextField className="flex flex-col gap-2">

                            <Label className="font-medium">
                                Password
                            </Label>


                            <InputGroup className="border rounded-xl px-4 bg-[#f3efe7] h-12">

                                <Input
                                    type={
                                        isVisible
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    className="w-full bg-transparent"
                                />


                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                    className="text-gray-500"
                                >
                                    {
                                        isVisible
                                            ? <EyeSlash size={18}/>
                                            : <Eye size={18}/>
                                    }
                                </button>

                            </InputGroup>

                        </TextField>


                        {/* Error */}
                        {
                            error &&
                            <p className="text-red-600 text-sm">
                                {error}
                            </p>
                        }


                        {
                            success &&
                            <p className="text-green-600 text-sm">
                                {success}
                            </p>
                        }



                        {/* Sign in Button */}
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full h-12 rounded-xl bg-[#111c4e] text-white font-semibold"
                        >
                            Sign In
                        </Button>



                        {/* Divider */}
                        <div className="flex items-center gap-3">

                            <div className="h-px bg-gray-300 flex-1"/>

                            <span className="text-gray-400 text-sm">
                                or
                            </span>

                            <div className="h-px bg-gray-300 flex-1"/>

                        </div>



                        {/* Google */}
                        <button
                            type="button"
                            className="w-full h-12 border rounded-xl bg-white flex items-center justify-center gap-3 hover:bg-gray-50 transition"
                        >
                            <FcGoogle size={20}/>
                            Continue with Google
                        </button>


                        {/* Register */}
                        <p className="text-center text-gray-500">

                            Don't have an account?{" "}

                            <Link
                                href={`/auth/signup?redirect=${redirectTo}`}
                                className="text-amber-600 font-semibold cursor-pointer"
                            >
                                Create one
                            </Link>

                        </p>


                    </form>


                </div>

            </div>

        </div>
    );
}
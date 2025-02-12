/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import useAuth from '@/modules/auth/hooks/useAuth';
// import useAuth from '@/modules/auth/hooks/useAuth'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Login() {
    const { login } = useAuth();

    const loginFormSchema = z.object({
        email: z.string().email().min(1, 'Email is required'),
        password: z.string().min(1, 'Password is required'),
        customError: z.string().optional(),
    });
    type Schema = z.infer<typeof loginFormSchema>;

    const {
        control,
        getValues,
        handleSubmit,
        // setError,
        formState: { errors },
    } = useForm<Schema>({
        resolver: zodResolver(loginFormSchema),
    });

    async function onSubmit() {
        const payload = {
            email: getValues('email'),
            password: getValues('password'),
        };
        login(payload);
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                <a
                    href="#"
                    className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                ></a>
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <input
                                            {...field}
                                            value={getValues('email') ?? ''}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            placeholder="name@company.com"
                                        />
                                    </div>
                                )}
                            ></Controller>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <input
                                            {...field}
                                            value={getValues('password') ?? ''}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                            // required=""
                                        />
                                    </div>
                                )}
                            ></Controller>
                            <div className="flex items-center justify-between">
                                <a
                                    href="#"
                                    className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <p color="red">
                                {errors.customError &&
                                    errors.customError.message}
                            </p>
                            <button
                                type="submit"
                                className="hover:bg-primary-700 focus:ring-primary-300 dark:focus:ring-primary-800 w-full rounded-lg bg-sky-500 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?
                                <a
                                    href="#"
                                    className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

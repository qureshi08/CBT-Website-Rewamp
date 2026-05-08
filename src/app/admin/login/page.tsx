"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/admin";
    const errorParam = searchParams.get("error");

    const initialError =
        errorParam === "domain"
            ? "That account isn't authorised for this portal."
            : errorParam === "session"
                ? "Your session expired. Please sign in again."
                : null;

    const [authError, setAuthError] = useState<string | null>(initialError);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (values: LoginFormValues) => {
        setAuthError(null);
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email: values.email.trim().toLowerCase(),
            password: values.password,
        });

        if (error) {
            setAuthError("Invalid email or password.");
            return;
        }

        router.refresh();
        router.replace(next);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-16">
            <div className="w-full max-w-md">
                <Link href="/" className="flex items-center gap-3 justify-center mb-10">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-bold text-white text-lg">C</div>
                    <span className="font-heading font-bold text-2xl text-text-heading tracking-tight">
                        CBT <span className="text-primary">Admin</span>
                    </span>
                </Link>

                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-8 sm:p-10">
                    <h1 className="font-heading text-3xl font-bold text-text-heading mb-2">Welcome back.</h1>
                    <p className="text-text-body/70 text-sm mb-8">Sign in to manage CBT website content.</p>

                    {authError && (
                        <div
                            role="alert"
                            className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-red-50 border border-red-100 text-red-800 text-sm"
                        >
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                            <span>{authError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-text-heading mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                disabled={isSubmitting}
                                {...register("email")}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition disabled:opacity-60"
                                placeholder="you@convergentbt.com"
                            />
                            {errors.email && (
                                <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-text-heading mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    disabled={isSubmitting}
                                    {...register("password")}
                                    className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-white text-text-body focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition disabled:opacity-60"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-heading transition-colors"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="hero-btn-primary"
                            style={{ display: "flex", width: "100%", justifyContent: "center", gap: 8 }}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in <span>→</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-text-muted mt-6">
                    Authorised CBT staff only. Access is logged.
                </p>
            </div>
        </div>
    );
}

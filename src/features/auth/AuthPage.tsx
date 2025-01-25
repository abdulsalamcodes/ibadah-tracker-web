"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRouter } from 'next/navigation';

// Types for our authentication
interface AuthFormData {
    email: string;
    password: string;
    name?: string;
}

// interface AuthProps {
//   onAuthSuccess: () => void;
// }

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data: AuthFormData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        };

        if (!isLogin) {
            data.name = formData.get('name') as string;
        }

        try {
            // Here you would integrate with your actual auth service
            // For now, we'll simulate a successful auth
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Auth success");
            // set localstorage token
            localStorage.setItem("auth_token", 'user-signed-in')
            router.push('/dashboard')
        } catch (err) {
            setError('Authentication failed. Please try again.');
            console.log("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </CardTitle>
                    <CardDescription>
                        {isLogin
                            ? 'Continue your spiritual journey'
                            : 'Start tracking your daily ibadah'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required={!isLogin}
                                    placeholder="Your name"
                                />
                            </div>
                        )}

                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
                        </Button>

                        <div className="text-center">
                            <Button
                                type="button"
                                variant="link"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin
                                    ? "Don't have an account? Sign up"
                                    : 'Already have an account? Sign in'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AuthPage;
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from '@/lib/constants';
import { getOrCreateUser } from '@/lib/db-actions';

// For this demo, we'll use a simple cookie to store the session.
// In a real app, you'd want to use a more secure session management solution.

const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsedCredentials = LoginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!parsedCredentials.success) {
    return 'Please enter a valid email and password.';
  }
  
  const { email, password } = parsedCredentials.data;

  // For demo purposes, all passwords are "password"
  if (password !== 'password') {
    return 'Invalid email or password.';
  }

  // Try to get or create user from database
  // First, try to find existing user by email
  const userResult = await getOrCreateUser({
    email,
    name: email.split('@')[0], // temporary name, will be updated by getOrCreateUser
    role: 'EMPLOYEE', // default role, will be updated by getOrCreateUser if user exists
  });

  if (!userResult.success || !userResult.user) {
    return 'Invalid email or password.';
  }

  const user = userResult.user;

  // Create session with user data
  const session = {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role.toLowerCase() as 'hr' | 'lead' | 'employee',
    }
  };

  try {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    });
  } catch (error) {
    return 'An unexpected error occurred. Please try again.';
  }
  
  redirect('/');
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!sessionCookie) {
    return null;
  }
  try {
    const session = JSON.parse(sessionCookie.value);
    // basic validation
    if (session && session.user && session.user.role) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect('/login');
}

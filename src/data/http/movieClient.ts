import  { env } from "@config/environment";

export async function apiGet<T>(path:string, init?:RequestInit): Promise<T> {
    const res = await fetch(`${env.apiBaseUrl}${path}}`, { next:{ revalidate: 60 }, ...init });
    if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
    return res.json();
}
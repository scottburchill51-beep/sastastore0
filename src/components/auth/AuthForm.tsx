"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export function AuthForm({ mode }: { mode: "login" | "register" }) {
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [message,setMessage]=useState(""); const [loading,setLoading]=useState(false); const router=useRouter();
 async function submit(e:FormEvent) { e.preventDefault(); setLoading(true); setMessage(""); try {
 const r=await fetch(`/api/auth/${mode}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})}); const data=await r.json();
 if(!r.ok) throw new Error(data.error||"Authentication failed");
 if(data.emailVerificationRequired) setMessage("Check your email for the verification link, then return to log in.");
 else {router.push("/account");router.refresh();}
 } catch(e) {setMessage(e instanceof Error?e.message:"Could not continue");} finally{setLoading(false);} }
 return <main className="min-h-[70vh] flex flex-col items-center justify-center bg-background text-foreground p-6"><form onSubmit={submit} className="w-full max-w-md rounded-2xl border border-white/15 p-8 shadow-xl space-y-5"><h1 className="text-3xl font-bold">{mode==="login"?"Welcome to SastaStore":"Create your SastaStore account"}</h1><p className="text-sm opacity-70">{mode==="login"?"Log in to explore our digital tools.":"Register to access our private digital storefront."}</p><label className="block text-sm">Email<input className="mt-2 w-full rounded-lg border p-3 bg-transparent" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label className="block text-sm">Password<input className="mt-2 w-full rounded-lg border p-3 bg-transparent" type="password" minLength={8} autoComplete={mode==="login"?"current-password":"new-password"} required value={password} onChange={e=>setPassword(e.target.value)}/></label>{message&&<p role="alert" className="text-sm">{message}</p>}<button disabled={loading} className="w-full bg-emerald-600 text-white rounded-lg p-3 font-semibold">{loading?"Please wait...":mode==="login"?"Log in":"Create account"}</button><p className="text-sm">{mode==="login"?<>New customer? <Link href="/register" className="underline">Register</Link></>:<>Already registered? <Link href="/login" className="underline">Log in</Link></>}</p></form></main>;
}

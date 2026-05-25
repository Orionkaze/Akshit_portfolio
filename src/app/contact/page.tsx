"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Required data streams missing. Please fill Name, Email, and Message.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "00000000-0000-0000-0000-000000000000";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          subject: subject || "Connect Request - Cinematic Portfolio",
          message,
          from_name: `${name} (Cinematic Portfolio)`,
        }),
      });

      const data = await response.json();

      if (response.status === 200 && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        // Fallback check: if key is unconfigured, show graceful mailto error screen
        if (accessKey === "00000000-0000-0000-0000-000000000000") {
          setErrorMessage("API Key unconfigured. We've compiled your message — click below to dispatch it using your system's email client directly.");
        } else {
          setErrorMessage(data.message || "Transmission pipeline failed. Please try again.");
        }
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("Network signal lost. Please check connection and try again.");
      setStatus("error");
    }
  };

  const getMailtoLink = () => {
    const subjectLine = encodeURIComponent(subject || "Connect Request - Portfolio");
    const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    return `mailto:akshit2046@gmail.com?subject=${subjectLine}&body=${bodyText}`;
  };

  return (
    <div className="min-h-screen bg-black text-pure-white relative overflow-hidden py-20 px-6 md:px-12 lg:px-24 flex items-center justify-center">
      {/* Cinematic grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,15,0.85)_0%,#000000_100%)] pointer-events-none -z-10" />

      <div className="max-w-xl w-full relative z-10">
        
        {/* Navigation back to control room */}
        <div className="mb-10 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-4 h-4 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Return to Control Room</span>
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <span className="font-mono text-[10px] text-electric-cyan uppercase tracking-[0.2em] mb-2 block">
            Communication Portal
          </span>
          <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-pure-white uppercase tracking-wider mb-2 text-shadow hero-text-glow">
            ESTABLISH CONNECTION
          </h1>
          <p className="font-inter font-light text-muted-silver text-sm">
            Fill in the details below to dispatch an encrypted message directly to Akshit&apos;s terminal.
          </p>
        </div>

        {/* Dynamic State Layouts */}
        {status === "success" ? (
          <div className="p-8 rounded-2xl border border-electric-cyan/20 bg-electric-cyan/[0.02] shadow-[0_0_30px_rgba(0,212,255,0.05)] text-center flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full border border-electric-cyan flex items-center justify-center glow-primary animate-pulse">
              <svg className="w-8 h-8 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="font-space font-bold text-lg text-electric-cyan uppercase tracking-widest mb-2">
                TRANSMISSION SUCCESSFUL
              </h2>
              <p className="font-inter font-light text-muted-silver text-sm leading-relaxed max-w-sm">
                Your message has been encoded and dispatched. The data packet has successfully bypassed security layers and landed directly in Akshit&apos;s inbox.
              </p>
            </div>
            <Link
              href="/"
              className="mt-4 px-6 py-3 rounded border border-electric-cyan bg-electric-cyan/15 hover:bg-electric-cyan/30 text-xs font-space uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)]"
            >
              Back to System
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl border border-white/10 bg-deep-space/55 backdrop-blur-md shadow-2xl flex flex-col gap-5"
          >
            {/* Input: Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-muted-silver uppercase tracking-widest">
                Identifier Name <span className="text-electric-cyan">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[#0A0A0F] border border-white/10 hover:border-electric-cyan/40 focus:border-electric-cyan/80 focus:ring-1 focus:ring-electric-cyan/55 rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none text-pure-white placeholder-white/20 font-inter font-light focus:shadow-[0_0_15px_rgba(0,212,255,0.08)]"
              />
            </div>

            {/* Input: Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-muted-silver uppercase tracking-widest">
                Return Signal Mail <span className="text-electric-cyan">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@domain.com"
                className="w-full bg-[#0A0A0F] border border-white/10 hover:border-electric-cyan/40 focus:border-electric-cyan/80 focus:ring-1 focus:ring-electric-cyan/55 rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none text-pure-white placeholder-white/20 font-inter font-light focus:shadow-[0_0_15px_rgba(0,212,255,0.08)]"
              />
            </div>

            {/* Input: Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-muted-silver uppercase tracking-widest">
                Packet Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Project proposal, feedback, etc."
                className="w-full bg-[#0A0A0F] border border-white/10 hover:border-electric-cyan/40 focus:border-electric-cyan/80 focus:ring-1 focus:ring-electric-cyan/55 rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none text-pure-white placeholder-white/20 font-inter font-light focus:shadow-[0_0_15px_rgba(0,212,255,0.08)]"
              />
            </div>

            {/* Input: Message */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-muted-silver uppercase tracking-widest">
                Data Message Payload <span className="text-electric-cyan">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message details here..."
                className="w-full bg-[#0A0A0F] border border-white/10 hover:border-electric-cyan/40 focus:border-electric-cyan/80 focus:ring-1 focus:ring-electric-cyan/55 rounded-lg px-4 py-3 text-sm transition-all duration-300 outline-none text-pure-white placeholder-white/20 font-inter font-light focus:shadow-[0_0_15px_rgba(0,212,255,0.08)] resize-none"
              />
            </div>

            {/* Error Message Fallback System */}
            {status === "error" && (
              <div className="p-4 rounded-lg border border-alert-red/20 bg-alert-red/[0.02] text-xs leading-relaxed text-[#FF8B8B] flex flex-col gap-3">
                <p>{errorMessage}</p>
                {/* Fallback button when API Key is missing or submission fails */}
                {errorMessage.includes("API Key") && (
                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center justify-center gap-1.5 self-start px-4 py-2 border border-[#FF8B8B] hover:bg-alert-red/10 rounded font-space font-semibold uppercase text-[10px] tracking-wider text-pure-white transition-colors duration-300"
                  >
                    <span>Dispatch Via Mail Client</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-2 w-full py-4 rounded border border-electric-cyan bg-electric-cyan/15 hover:bg-electric-cyan/30 text-xs font-space uppercase tracking-[0.2em] font-semibold text-pure-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.2)] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-t-transparent border-electric-cyan rounded-full animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <span>EXECUTE TRANSMISSION</span>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [state, setState] = useState<FormState>("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("submitting");

        const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            console.error("Missing PUBLIC_WEB3FORMS_ACCESS_KEY env variable");
            setState("error");
            return;
        }

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: subject || `New contact form message from ${name}`,
                    from_name: "Guzman 4 New York — Contact Form",
                    replyto: email,
                    botcheck: "",
                    Name: name,
                    Email: email,
                    Subject: subject || "(no subject)",
                    Message: message,
                }),
            });

            const result = (await response.json()) as { success?: boolean };
            if (response.ok && result.success) {
                setState("success");
            } else {
                setState("error");
            }
        } catch {
            setState("error");
        }
    };

    if (state === "success") {
        return (
            <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-200">
                <div className="text-5xl mb-4">✉️</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700">
                    Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                </label>
                <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy resize-none"
                />
            </div>

            {state === "error" && (
                <p className="text-red-600 text-sm">
                    Something went wrong. Please try again or email us directly.
                </p>
            )}

            <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full bg-brand-navy hover:bg-blue-900 disabled:opacity-60 text-white py-3 rounded-lg font-semibold text-base transition-colors"
            >
                {state === "submitting" ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
}

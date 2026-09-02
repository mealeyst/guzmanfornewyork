import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    interests: string[];
    message: string;
}

const volunteerOptions = [
    { value: "canvass", label: "Door-to-door canvassing" },
    { value: "phonebank", label: "Phone banking" },
    { value: "events", label: "Help at events" },
    { value: "social", label: "Social media support" },
    { value: "yardsign", label: "Yard sign" },
    { value: "other", label: "Other" },
];

export default function VolunteerForm() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interests: [],
        message: "",
    });
    const [state, setState] = useState<FormState>("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckbox = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            interests: prev.interests.includes(value)
                ? prev.interests.filter((i) => i !== value)
                : [...prev.interests, value],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("submitting");

        const accessKey = import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            console.error("Missing PUBLIC_WEB3FORMS_ACCESS_KEY env variable");
            setState("error");
            return;
        }

        const interestsLabels =
            formData.interests
                .map((v) => volunteerOptions.find((o) => o.value === v)?.label ?? v)
                .join(", ") || "(none selected)";

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    subject: `New volunteer signup: ${formData.firstName} ${formData.lastName}`,
                    from_name: "Guzman 4 New York — Volunteer Form",
                    replyto: formData.email,
                    botcheck: "",
                    "First Name": formData.firstName,
                    "Last Name": formData.lastName,
                    Email: formData.email,
                    Phone: formData.phone || "(not provided)",
                    "Interested In": interestsLabels,
                    Message: formData.message || "(no message)",
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
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Thank you!</h3>
                <p className="text-green-700">
                    We received your sign-up and will be in touch soon. Welcome to the team!
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        First Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                    />
                </div>
                <div>
                    <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Last Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-brand-red">*</span>
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
            </div>

            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone (optional)
                </label>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
            </div>

            <div>
                <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                        I'd like to help with:
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                        {volunteerOptions.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.interests.includes(option.value)}
                                    onChange={() => handleCheckbox(option.value)}
                                    className="rounded border-gray-300 text-brand-navy focus:ring-brand-navy"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Anything else you'd like us to know?
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
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
                {state === "submitting" ? "Submitting..." : "Sign Me Up!"}
            </button>
        </form>
    );
}

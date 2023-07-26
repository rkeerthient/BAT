// src/ContactForm.tsx
import * as React from "react";
import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  question: string;
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    question: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle the form submission, such as sending the data to a server.
    alert("Our team has been notified of your inquiry.");
  };

  return (
    <div className="w-full mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <div className="mb-4 w-1/2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
          </div>
          <div className="mb-4 w-1/2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question:
            <textarea
              name="question"
              id="question"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

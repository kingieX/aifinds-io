"use client";

import { useState } from "react";
import { categories } from "@/data/categories";
import { ToolSubmission } from "@/types/submission";
import { Loader2 } from "lucide-react";

export default function SubmitForm() {
  const [formData, setFormData] = useState<ToolSubmission>({
    name: "",
    description: "",
    website: "",
    github: "",
    categoryId: "",
    tags: [],
    image: null,
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Very basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.website ||
      !formData.email ||
      !formData.categoryId
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Mock async submit
    setTimeout(() => {
      console.log("Submitted Tool:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
        🎉 Tool submitted successfully! We’ll review and publish it shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tool Name */}
      <div>
        <label className="block font-medium mb-1">Tool Name *</label>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description *</label>
        <textarea
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* Website URL */}
      <div>
        <label className="block font-medium mb-1">Website URL *</label>
        <input
          name="website"
          type="url"
          required
          value={formData.website}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block font-medium mb-1">GitHub URL (optional)</label>
        <input
          name="github"
          type="url"
          value={formData.github}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category *</label>
        <select
          name="categoryId"
          required
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="block font-medium mb-1">Tags (comma separated)</label>
        <input
          name="tags"
          type="text"
          placeholder="e.g. ai, productivity, text"
          value={formData.tags.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              tags: e.target.value.split(",").map((tag) => tag.trim()),
            }))
          }
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block font-medium mb-1">Upload Image *</label>
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleImageChange}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:rounded file:border-border file:bg-muted"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block font-medium mb-1">Your Email *</label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-border rounded px-3 py-2 bg-background"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin" size={16} />}
          {isSubmitting ? "Submitting..." : "Submit Tool"}
        </button>
      </div>
    </form>
  );
}

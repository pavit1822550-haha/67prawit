"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ShopForm({
  initialData = null,
  mode = "add",
}: {
  initialData?: {
    id?: string;
    shopName?: string;
    shopname?: string;
    shoptype?: string;
    shopstatus?: boolean | string;
    shopstats?: boolean | string;
  } | null;
  mode?: "add" | "edit";
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    shopName: initialData?.shopname ?? initialData?.shopName ?? "",
    shoptype: initialData?.shoptype ?? "",
    shopstatus: String(initialData?.shopstatus ?? initialData?.shopstats ?? ""),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // HANDLE INPUT
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "add") {
        // Call the API to add store information.
  const response = await fetch(
    `http://localhost:2001/api/shops`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create Shop");
  }
  await response.json();
      } else {
        if (!initialData?.id) {
          throw new Error("Shop document ID is missing.");
        }

        const response = await fetch(
          `http://localhost:2001/api/shops/${encodeURIComponent(initialData.id)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              shopname: form.shopName.trim(),
              shoptype: form.shoptype.trim(),
              shopstatus: form.shopstatus,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json().catch(() => null);
          throw new Error(result?.message ?? "Failed to update shop.");
        }
        await response.json();
      }
      // Redirect to homepage
      router.push("/week07");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save shop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-bold">
     {mode === "add" ? "Add New Shop"  : "Update Shop"}
      </h2>
      {error && (
<p className="text-red-600">       
  {error}
</p>
     )}

      {/* Name */}
      <div>
  <label className="block font-semibold mb-1">
    Shop Name
  </label>
  <input
    type="text"
    name="shopName"
    value={form.shopName}
    onChange={handleChange}
    required
    className="w-full border rounded-lg p-3"
  />
      </div>

      {/* type */}
      <div>
  <label className="block font-semibold mb-1">
   type </label>
<input
    type="text"
    name="shoptype"
    value={form.shoptype}
    onChange={handleChange}
    required
    placeholder="fashion"
    className="w-full border rounded-lg p-3"
  />
      </div>

      {/* Contact
      <div>
  <label className="block font-semibold mb-1"> Contact </label>
  <input
    type=""
    name=""
    value={}
    onChange={handleChange}
    required
    placeholder="Enter contact information"
    className="w-full border rounded-lg p-3"
      />
      </div> */}

      {/* Status */}
  <div>
  <label className="block font-semibold mb-1">Status</label>
  <select
    name="shopstatus"
    value={form.shopstatus}
    onChange={handleChange}
    required
    className="w-full border rounded-lg p-3"
  >
    <option value="">Please select</option>
    <option value="true">Open</option>
    <option value="false">Close</option>
  </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
  <button type="submit"
    disabled={loading} className="bg-blue-600 text-white px-5 py-3 rounded-lg disabled:opacity-50">
    {
       loading ? 
         "Saving..." : 
         mode === "add" ? 
            "Add Shop" : 
            "Update Shop"
     }
  </button>

  <button type="button" onClick={() => router.push("/week07")} className="bg-gray-300 px-5 py-3 rounded-lg">
    Cancel
  </button>
      </div>
    </form>
  );
}
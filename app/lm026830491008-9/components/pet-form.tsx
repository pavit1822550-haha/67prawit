"use client";

import { useState, type FormEvent } from "react";
import { PET_SEXES, PET_SPECIES, type PetSex, type PetSpecies } from "./pet-types";
import { readApiResponse } from "./read-api-response";

const fieldClassName =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-100";

const maxImageSize = 400_000;

async function resizeImage(file: File): Promise<string> {
  const image = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 800 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("ไม่สามารถอ่านรูปภาพได้");
    }

    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.7, 0.55, 0.4]) {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", quality),
      );
      if (blob && blob.size <= maxImageSize) {
        return await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("ไม่สามารถเตรียมรูปภาพได้"));
            }
          };
          reader.onerror = () => reject(new Error("ไม่สามารถอ่านไฟล์รูปภาพได้"));
          reader.readAsDataURL(blob);
        });
      }
    }
    throw new Error("รูปภาพมีขนาดใหญ่เกินไป กรุณาเลือกรูปที่มีขนาดเล็กลง");
  } finally {
    image.close();
  }
}

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export default function PetForm() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<PetSpecies | "">("");
  const [details, setDetails] = useState("");
  const [owner, setOwner] = useState("");
  const [sex, setSex] = useState<PetSex>("other");
  const [imageData, setImageData] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleImageChange(file: File | undefined) {
    setError("");
    setImageData("");
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("กรุณาเลือกรูปภาพชนิด JPG, PNG หรือ WebP");
      return;
    }
    if (file.size > 10_000_000) {
      setError("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 10 MB");
      return;
    }

    try {
      setImageData(await resizeImage(file));
    } catch (imageError) {
      setError(
        imageError instanceof Error ? imageError.message : "ไม่สามารถอ่านไฟล์รูปภาพได้",
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !species || !details.trim() || !owner.trim()) {
      setError("กรุณากรอกชื่อ ประเภท รายละเอียด และข้อมูลเจ้าของให้ครบถ้วน");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, species, details, owner, sex, imageData }),
      });
      const result = await readApiResponse<{ message?: string }>(response);

      if (!response.ok) {
        throw new Error(result.message || "บันทึกข้อมูลไม่สำเร็จ");
      }

      setName("");
      setSpecies("");
      setDetails("");
      setOwner("");
      setSex("other");
      setImageData("");
      setSuccess("บันทึกข้อมูลสัตว์เลี้ยงเรียบร้อยแล้ว");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="pet-name" className="font-semibold text-slate-800">
          ชื่อสัตว์เลี้ยง <span className="text-rose-600">*</span>
        </label>
        <input
          id="pet-name"
          className={fieldClassName}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="เช่น มะลิ"
          required
        />
      </div>

      <div>
        <label htmlFor="pet-species" className="font-semibold text-slate-800">
          ประเภทสัตว์เลี้ยง <span className="text-rose-600">*</span>
        </label>
        <select
          id="pet-species"
          className={fieldClassName}
          value={species}
          onChange={(event) => setSpecies(event.target.value as PetSpecies | "")}
          required
        >
          <option value="" disabled>
            เลือกประเภทสัตว์เลี้ยง
          </option>
          {PET_SPECIES.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="font-semibold text-slate-800">
          เพศ <span className="text-rose-600">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-5">
          {PET_SEXES.map((item) => (
            <label key={item.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="pet-sex"
                value={item.value}
                checked={sex === item.value}
                onChange={() => setSex(item.value)}
                className="size-4 accent-sky-700"
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="pet-details" className="font-semibold text-slate-800">
          รายละเอียด <span className="text-rose-600">*</span>
        </label>
        <textarea
          id="pet-details"
          className={fieldClassName}
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="ระบุสายพันธุ์ อายุ หรือข้อมูลสุขภาพ"
          rows={4}
          required
        />
      </div>

      <div>
        <label htmlFor="pet-owner" className="font-semibold text-slate-800">
          ข้อมูลเจ้าของ <span className="text-rose-600">*</span>
        </label>
        <input
          id="pet-owner"
          className={fieldClassName}
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
          placeholder="ชื่อเจ้าของสัตว์เลี้ยง"
          required
        />
      </div>

      <div>
        <label htmlFor="pet-image" className="font-semibold text-slate-800">
          รูปภาพสัตว์เลี้ยง
        </label>
        <input
          id="pet-image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => void handleImageChange(event.target.files?.[0])}
          className={`${fieldClassName} file:mr-4 file:rounded-lg file:border-0 file:bg-sky-100 file:px-4 file:py-2 file:font-semibold file:text-sky-800`}
        />
        <p className="mt-2 text-sm text-slate-500">
          รองรับ JPG, PNG และ WebP ระบบจะย่อรูปก่อนบันทึก
        </p>
        {imageData && (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageData}
              alt="ตัวอย่างรูปสัตว์เลี้ยง"
              className="size-32 rounded-xl object-cover"
            />
            <button
              type="button"
              onClick={() => {
                setImageData("");
                const input = document.getElementById("pet-image");
                if (input instanceof HTMLInputElement) input.value = "";
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              นำรูปออก
            </button>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-rose-700">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-emerald-700">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={isSaving}
        className="w-full rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}

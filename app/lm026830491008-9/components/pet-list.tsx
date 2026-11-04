"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getSexLabel, getSpeciesLabel, type Pet } from "./pet-types";
import { readApiResponse } from "./read-api-response";

async function fetchPets(): Promise<Pet[]> {
  const response = await fetch("/api/pets", { cache: "no-store" });
  const result = await readApiResponse<{ pets?: Pet[]; message?: string }>(response);
  if (!response.ok) {
    throw new Error(result.message || "โหลดข้อมูลสัตว์เลี้ยงไม่สำเร็จ");
  }
  return result.pets ?? [];
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "เกิดข้อผิดพลาดในการโหลดข้อมูล";
}

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export default function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const loadPets = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      setPets(await fetchPets());
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchPets()
      .then((loadedPets) => {
        if (isMounted) {
          setPets(loadedPets);
        }
      })
      .catch((requestError: unknown) => {
        if (isMounted) {
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  async function deletePet(id: string) {
    setError("");
    setDeletingId(id);
    try {
      const response = await fetch(`/api/pets/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const result = await readApiResponse<{ message?: string }>(response);
      if (!response.ok) {
        throw new Error(result.message || "ลบข้อมูลไม่สำเร็จ");
      }
      setPets((currentPets) => currentPets.filter((pet) => pet.id !== id));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "เกิดข้อผิดพลาดในการลบข้อมูล",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-semibold text-sky-700">ทะเบียนประจำคลินิก</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">ข้อมูลสัตว์เลี้ยง</h1>
        </div>
        <p className="text-sm text-slate-500">
          {isLoading ? "กำลังโหลด..." : `ทั้งหมด ${pets.length} รายการ`}
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-rose-50 px-4 py-3 text-rose-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => void loadPets()}
            className="font-semibold underline"
          >
            ลองอีกครั้ง
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
          กำลังโหลดข้อมูลสัตว์เลี้ยง...
        </p>
      ) : pets.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-slate-700">ยังไม่มีข้อมูลสัตว์เลี้ยง</p>
          <p className="mt-2 text-sm text-slate-500">เพิ่มข้อมูลผ่านเมนู “เพิ่มข้อมูลสัตว์เลี้ยง”</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <article key={pet.id} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex justify-center bg-sky-50 p-5">
                <Image
                  src={pet.imageData || "/image/cat2.png"}
                  alt={`รูปภาพ${pet.name}`}
                  width={144}
                  height={144}
                  className="size-36 rounded-2xl object-cover"
                  unoptimized={Boolean(pet.imageData)}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-xl font-bold text-slate-900">{pet.name}</h2>
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-800">
                    {getSpeciesLabel(pet.species)}
                  </span>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-slate-600">เพศ:</dt>
                    <dd>{getSexLabel(pet.sex)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-600">รายละเอียด:</dt>
                    <dd className="mt-1 whitespace-pre-wrap text-slate-700">{pet.details}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-slate-600">เจ้าของ:</dt>
                    <dd className="mt-1 text-slate-700">{pet.owner}</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={() => void deletePet(pet.id)}
                  disabled={deletingId === pet.id}
                  className="mt-5 w-full rounded-xl bg-rose-600 px-4 py-2.5 font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === pet.id ? "กำลังลบ..." : "ลบข้อมูล"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

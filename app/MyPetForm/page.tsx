import PetAppShell from "../lm026830491008-9/components/pet-app-shell";
import PetForm from "../lm026830491008-9/components/pet-form";

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export default function MyPetFormPage() {
  return (
    <PetAppShell>
      <main className="mx-auto min-h-[calc(100vh-150px)] w-full max-w-3xl px-5 py-12">
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-9">
          <p className="font-semibold text-sky-700">ทะเบียนประจำคลินิก</p>
          <h1 className="mb-7 mt-1 text-3xl font-bold text-slate-900">
            เพิ่มข้อมูลสัตว์เลี้ยง
          </h1>
          <PetForm />
        </div>
      </main>
    </PetAppShell>
  );
}

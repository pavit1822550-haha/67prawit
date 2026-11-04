import Link from "next/link";
import PetAppShell from "./pet-app-shell";

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export default function PetHomePage() {
  return (
    <PetAppShell>
      <main className="mx-auto flex min-h-[calc(100vh-150px)] w-full max-w-6xl flex-col justify-center px-5 py-14">
        <section className="grid items-center gap-10 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:p-12">
          <div>
            <p className="font-semibold text-sky-700">ยินดีต้อนรับสู่</p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
              คลินิกสัตว์เลี้ยง
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              จัดเก็บข้อมูลสัตว์เลี้ยงและเจ้าของ เพื่อให้ดูแลและติดตามข้อมูลได้สะดวกในที่เดียว
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/MyPetForm"
                className="rounded-xl bg-sky-700 px-5 py-3 font-semibold text-white hover:bg-sky-800"
              >
                เพิ่มข้อมูลสัตว์เลี้ยง
              </Link>
              <Link
                href="/MyPetList"
                className="rounded-xl border border-sky-200 px-5 py-3 font-semibold text-sky-800 hover:bg-sky-50"
              >
                ดูข้อมูลสัตว์เลี้ยง
              </Link>
            </div>
          </div>
          <div className="rounded-2xl bg-sky-50 p-7">
            <h2 className="text-xl font-bold text-slate-900">ข้อมูลผู้พัฒนา</h2>
            <dl className="mt-5 space-y-4">
              <div>
                <dt className="text-sm text-slate-500">ชื่อ-นามสกุล</dt>
                <dd className="font-semibold">ประวิทย์ จิตสุวรรณ</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">รหัสนักศึกษา</dt>
                <dd className="font-semibold">026830491008-9</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">อีเมล</dt>
                <dd>
                  <a className="font-semibold text-sky-800 hover:underline" href="mailto:prawit.jit@rmutto.ac.th">
                    prawit.jit@rmutto.ac.th
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">ช่องทางติดต่ออื่น</dt>
                <dd className="font-semibold">ประวิทย์</dd>
              </div>
            </dl>
          </div>
        </section>
      </main>
    </PetAppShell>
  );
}

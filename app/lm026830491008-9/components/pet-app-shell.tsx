import Link from "next/link";
import type { ReactNode } from "react";

export default function PetAppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-sky-50 text-slate-800">
      <header className="border-b border-sky-100 bg-white">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="text-xl font-bold text-sky-800">
            คลินิกสัตว์เลี้ยง
          </Link>
          <div className="flex flex-wrap gap-2 text-sm font-medium">
            <Link className="rounded-full px-4 py-2 hover:bg-sky-50" href="/">
              หน้าแรก
            </Link>
            <Link className="rounded-full px-4 py-2 hover:bg-sky-50" href="/MyPetForm">
              เพิ่มข้อมูลสัตว์เลี้ยง
            </Link>
            <Link className="rounded-full px-4 py-2 hover:bg-sky-50" href="/MyPetList">
              ข้อมูลสัตว์เลี้ยง
            </Link>
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-sky-100 bg-white px-5 py-5 text-center text-sm text-slate-500">
        ประวิทย์ จิตสุวรรณ · 026830491008-9 · คลินิกสัตว์เลี้ยง
      </footer>
    </div>
  );
}

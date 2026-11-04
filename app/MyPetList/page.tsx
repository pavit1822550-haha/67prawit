import PetAppShell from "../lm026830491008-9/components/pet-app-shell";
import PetList from "../lm026830491008-9/components/pet-list";

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export default function MyPetListPage() {
  return (
    <PetAppShell>
      <main className="mx-auto min-h-[calc(100vh-150px)] w-full max-w-6xl px-5 py-12">
        <PetList />
      </main>
    </PetAppShell>
  );
}

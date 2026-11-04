import db from "../../../server/config/firebase.js";
import { PET_SEXES, PET_SPECIES } from "../../lm026830491008-9/components/pet-types";

export const runtime = "nodejs";

const petsCollection = db.collection("pets-026830491008-9");

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export async function GET() {
  try {
    const snapshot = await petsCollection.orderBy("createdAt", "desc").get();
    const pets = snapshot.docs.map((document) => ({
      ...document.data(),
      id: document.id,
    }));

    return Response.json({ pets });
  } catch (error) {
    console.error("Failed to load pets from Firestore:", error);
    return Response.json({ message: "ไม่สามารถอ่านข้อมูลสัตว์เลี้ยงได้" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return Response.json({ message: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
  }

  const input = payload as Record<string, unknown>;
  const name = typeof input.name === "string" ? input.name.trim() : "";
  const details = typeof input.details === "string" ? input.details.trim() : "";
  const owner = typeof input.owner === "string" ? input.owner.trim() : "";
  const species =
    typeof input.species === "string" &&
    PET_SPECIES.some((item) => item.value === input.species)
      ? input.species
      : "";
  const sex =
    typeof input.sex === "string" && PET_SEXES.some((item) => item.value === input.sex)
      ? input.sex
      : "";
  const imageData = input.imageData === undefined ? "" : input.imageData;

  if (
    !name ||
    !species ||
    !details ||
    !owner ||
    !sex ||
    typeof imageData !== "string" ||
    imageData.length > 600_000 ||
    (imageData !== "" &&
      !/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(imageData))
  ) {
    return Response.json(
      { message: "กรุณาระบุข้อมูลให้ครบถ้วนและตรวจสอบรูปภาพอีกครั้ง" },
      { status: 400 },
    );
  }

  try {
    const pet = {
      name,
      species,
      details,
      owner,
      sex,
      ...(imageData ? { imageData } : {}),
      createdAt: new Date().toISOString(),
    };
    const document = await petsCollection.add(pet);

    return Response.json({ pet: { id: document.id, ...pet } }, { status: 201 });
  } catch (error) {
    console.error("Failed to save pet to Firestore:", error);
    return Response.json({ message: "ไม่สามารถบันทึกข้อมูลสัตว์เลี้ยงได้" }, { status: 500 });
  }
}

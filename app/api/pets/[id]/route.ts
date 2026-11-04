import db from "../../../../server/config/firebase.js";

export const runtime = "nodejs";

const petsCollection = db.collection("pets-026830491008-9");

/* 026830491008-9 ประวิทย์ จิตสุวรรณ */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!id.trim()) {
    return Response.json({ message: "ไม่พบรหัสสัตว์เลี้ยง" }, { status: 400 });
  }

  try {
    const document = petsCollection.doc(id);
    const existing = await document.get();
    if (!existing.exists) {
      return Response.json({ message: "ไม่พบข้อมูลสัตว์เลี้ยง" }, { status: 404 });
    }

    await document.delete();
    return Response.json({ message: "ลบข้อมูลสัตว์เลี้ยงเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Failed to delete pet from Firestore:", error);
    return Response.json({ message: "ไม่สามารถลบข้อมูลสัตว์เลี้ยงได้" }, { status: 500 });
  }
}

export async function readApiResponse<T extends object>(
  response: Response,
): Promise<T> {
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error(
      `เซิร์ฟเวอร์ส่งข้อมูลกลับมาไม่ถูกต้อง (HTTP ${response.status}) กรุณาลองอีกครั้ง`,
    );
  }

  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error(`เซิร์ฟเวอร์ส่งข้อมูลกลับมาไม่ถูกต้อง (HTTP ${response.status})`);
  }

  return result as T;
}

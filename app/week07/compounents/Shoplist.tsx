"use client";
import { useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoginButton from "../login/components/Login";
import LogoutButton from "../components/Logout";
import UserProfile from "../components/UserProfile";
import { useSession } from "../hooks/useSession";

type Shop = {
  id?: string | number;
  shopid?: string | number;
  shopname: string;
  shopstats?: boolean | string;
  shopstatus?: boolean | string;
  shoploc?: { lat: number; lon: number };
};

interface ShoplistProps {
  data: Shop[];
}
export default function Shoplist({ data }: ShoplistProps) {

  const [Keyword, setKeyword] = useState("");
  const { isLoggedIn } = useSession();

  const filtershops: Shop[] = data.filter((item: Shop) => {
    const searchTxt = Keyword.toLowerCase();
    return item.shopname.toLowerCase().includes(searchTxt);
  });
   const router = useRouter();

const handleDelete = async (id: Shop["id"] | Shop["shopid"]) => {
    if (id === undefined) {
      alert("Shop ID is missing");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this shop?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
  `http://localhost:2001/api/shops/${id}`,
  {
    method: "DELETE",
  }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Shop");
      }
      // Refresh page
      router.refresh();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to delete Shop");
    }
};
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-4 text-gray-600">
        <div className="mb-6">
          <input
            type="text"
            value={Keyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
            placeholder="Search shop..."
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        found {filtershops.length} shop(s)
      </div>
      {/* เพิ่มปุ่มเพื่อสร้างร้านค้า โดยระบุไว้ในของส่วนการแสดงผลไปยังผู้ใช้ตำแหน่งใด ๆ */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <Link
          href="/week07/new"
          className="rounded-lg bg-green-600 px-4 py-2 text-white"
        >
          + Add New
        </Link>
        <div className="flex items-center gap-2">
          <UserProfile />
          {isLoggedIn ? <LogoutButton /> : <LoginButton />}
        </div>
      </div>

      <div className="space-y-4">
        {filtershops.map((shop: Shop) => (
          <div key={shop.id ?? shop.shopid ?? shop.shopname} className="border rounded-lg p-4">
            <h2 className="font-semibold">{shop.shopname}</h2>
            <p>
              open Status: {(shop.shopstatus ?? shop.shopstats) === true || (shop.shopstatus ?? shop.shopstats) === "true" ? "Open" : "Closed"}
            </p>
            <Link
              href={`/week07/${shop.id ?? shop.shopid}`}
              className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
              view Details
            </Link>
            <Link
              href={`/week07/${shop.id ?? shop.shopid}/edit`}
              className="inline-block ms-1 mt-3 bg-yellow-500 text-white px-3 py-2 rounded"
            >
              Update
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(shop.id ?? shop.shopid)}
              className="ms-1 mt-3 bg-red-500 text-white px-3 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
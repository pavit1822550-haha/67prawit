import Link from "next/link";
import Loading from "../compounents/loading";
import { Suspense } from "react";

type ShopLocation = {
  lat: number;
  lon: number;
};

type Shop = {
  id?: string;
  shopid?: string | number;
  shopname?: string;
  shopName?: string;
  shoptype?: string;
  shopstatus?: boolean | string;
  shopstats?: boolean | string;
  shoploc?: ShopLocation | null;
};

export default async function ShopDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let shop: Shop = {};
  let notFound = false;
  try {
    const resdata = await fetch(`http://localhost:2001/api/shops/${id}`, {
      cache: 'no-store'
    });

    if (resdata.status === 404) {
      notFound = true;
    } else if (resdata.ok) {
      shop = (await resdata.json()) as Shop;
    }
  } catch (error) {
    console.log(`error fetching data: ${error}`);
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold">Shop Detail</h1>

        <div className="border rounded-lg p-4 my-4">
          <p className="mt-2 font-semibold">
            Document ID: {shop.id ?? id}
          </p>
          {notFound ? (
            <p className="my-2">Shop not found</p>
          ) : (
            <>
              <p className="my-2">Shop ID: {shop.shopid ?? "-"}</p>
              <p className="my-2">Title: {shop.shopname ?? shop.shopName ?? "-"}</p>
              <p className="my-2">Type: {shop.shoptype ?? "-"}</p>
              <p className="my-2">
                Status: {(() => {
                  const status = shop.shopstatus ?? shop.shopstats;
                  if (status === true || status === "true") return "Open";
                  if (status === false || status === "false") return "Closed";
                  return "-";
                })()}
              </p>
          <p className="my-2">
            Location: Lat {shop.shoploc?.lat ?? "-"}, Lon {shop.shoploc?.lon ?? "-"}
          </p>
            </>
          )}
        </div>

        <Link
          href="/week07"
          className="bg-gray-600 text-white px-4 py-2 rounded inline-block"
        >
          Back
        </Link>
      </div>
    </Suspense>
  );
}
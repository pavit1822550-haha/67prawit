// Import create / update form
import ShopForm from "../../compounents/shopfrom";

type Shop = {
  id: string;
  shopname?: string;
  shoptype?: string;
  shopstatus?: boolean | string;
  shopstats?: boolean | string;
};

export default async function EditShopPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  let shop;

  try {

    const resData = await fetch(`http://localhost:2001/api/shops/${id}`, {
      cache: "no-store",
    });

    if(!resData.ok){
      throw new Error(`Update: Network response was not ok.`);
    }

    // Server response data into JSON


    shop = (await resData.json()) as Shop;

  } catch (error) {

    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">
          Shop Not Found
        </h1>
      </div>
    );

  }

  return (

    <main className="min-h-screen bg-slate-200 p-6">
      <div className="max-w-2xl mx-auto">

        {/* Call create and update form component */}
        <ShopForm mode="edit" initialData={shop} />

      </div>
    </main>

  );

}
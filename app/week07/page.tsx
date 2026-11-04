import { Suspense } from "react";
import Loading from "./compounents/loading";
import Shoplist from "./compounents/Shoplist";

type Shop = {
  id?: string | number;
  shopid: string | number;
  shopname: string;
  shopstats: boolean;
  shoploc?: { lat: number; lon: number };
};

export default async function Shoppage() {
    let shopsData: Shop[] = [];
    
    try {
        const resdata = await fetch("http://localhost:2001/api/shops/");
        
        if (!resdata.ok) {
            throw new Error("Network response was not ok.");
        }
        
        const result = await resdata.json();
        shopsData = Array.isArray(result) ? result as Shop[] : [];
        console.log(shopsData);
    } catch (error) {
        console.log(`Error fetching data: ${error}`);
    }

    return (
        <div className="max-w-3xl mx-auto mt-6">
            <h1 className="text-3xl font-bold">
                Shoplist
            </h1>
            <Suspense fallback={<Loading />}>
                <Shoplist data={shopsData} />
            </Suspense>
        </div>
    );
}
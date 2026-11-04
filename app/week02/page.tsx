import Header from "../compounents/headers";
import Footer from "../compounents/footer";
export default function Mypage(){
return(
    <>
<Header />
      <div 
  className="flex flex-col items-center p-7 rounded-2xl bg-cover bg-center"
  style={{ backgroundImage: "url('/image/cat.png')" }}
>
   <div>
     <img className="size-48 shadow-xl rounded-md" alt="" src="/image/cat2.png" />
  </div>
  <div className="flex">
    <span className="text-2xl font-medium"></span>
    <span className="font-medium text-sky-500"></span>
    <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
      <span>No. 4</span>
      <span>·</span>
      <span>2025</span>
    </span>
  </div>
</div>
     <h1>prawit</h1>
     <Footer />
    </>
    );
}
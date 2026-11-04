import Header from "../compounents/headers";
import Footer from "../compounents/footer";

export default function Profile(){
    return (

<>
<div className="max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden mt-20 mb-6">
  <div className="h-32 bg-gradient-to-r from-orange-500 to-pink-500"></div>
 
  <div className="relative flex flex-col items-center px-6 pb-6">
    <div className="-mt-16 mb-4">
      <img className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
           src="/image/cat2.png"
           alt="" />
    </div>
   
    <h3 className="text-xl font-bold text-emerald-600 dark:text-white">prawit</h3>
    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">หลุดเรท</p>
    <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-3">
    เราจะทำยังไงให้ตังงอกเองโดยเเค่นั่งเฉยๆ</p>
<div className="flex mt-6 space-x-4">
      <a href="https://facebook.com/prawit" target="_blank" rel="noopener noreferrer">
        <img 
          className="w-10 h-10 rounded-full border border-white dark:border-slate-800 shadow-md object-cover hover:opacity-80 transition"
          src="https://img.icons8.com/color/48/facebook-new.png" 
          alt="Facebook" 
        />
      </a>

      {/* ปุ่ม Instagram */}
      <a href="https://instagram.com/prawit" target="_blank" rel="noopener noreferrer">
        <img 
          className="w-10 h-10 rounded-full border border-white dark:border-slate-800 shadow-md object-cover hover:opacity-80 transition"
          src="https://img.icons8.com/color/48/instagram-new.png" 
          alt="Instagram" 
        />
      </a>

      {/* ปุ่ม GitHub */}
      <a href="http://localhost:3000/week02" target="_blank" rel="noopener noreferrer">
        <img 
          className="w-10 h-10 rounded-full border border-white dark:border-slate-800 shadow-md object-cover hover:opacity-80 transition"
          src="https://img.icons8.com/glyph-neue/64/github.png"
          alt="GitHub"
        />
      </a>
      {/* Display the facebook icon or logo. */}
      {/* Display the instagram icon or logo. */}
      {/* Display the github icon or logo. */}
    </div>
  </div>
</div>
</>

    );
}
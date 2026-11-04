import { TODOLIST } from "../beta/todolist2"
import Header from "../compounents/headers";
import Footer from "../compounents/footer";
export default function TodoList() {
  const name = "ประวิทย์";
  const major = "เทคโนโลยีสารสนเทศ (information technology)";
  const classyear = 2;
  const room = "ทส.ท";
  const active = true;

  const renderStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
        กำลังศึกษา
      </span>
    ) : (
      <span className="inline-flex rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white">
        ไม่ได้ศึกษา
      </span>
    );
  };

  const todoItems = TODOLIST.map((item, index) => (
    <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm text-slate-500">หัวข้อ</div>
      <div className="font-semibold text-slate-900">{item.title}</div>
      <div className="mt-2 text-sm text-slate-600">{item.desc}</div>
      <div className="mt-3 text-xs text-slate-500">วันที่เพิ่ม: {item.date_added}</div>
      <div className="mt-1 text-xs text-slate-500">ผู้เขียน: {item.author}</div>
      <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
      </div>
    </div>
  ));

  return (
    <>
    <Header />
    <main className=" bg-[#00ffff] flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full rounded-[28px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(15,23,42,0.35)] bg-white transition-shadow duration-300 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.4)]">
        <div className="grid grid-cols-1 gap-6">
          <div
            className=" w-full bg-cover bg-center shadow-inner"
            style={{ backgroundImage: "url('/img/card-left.jpg')" }}
            title="Woman holding a mug"
          />
          <div className="p-8 flex flex-col gap-8">
            <div>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <svg className="fill-current text-slate-500 w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                TO DO LIST
              </p>
              <div className="mt-4 space-y-2 text-slate-900 font-semibold text-lg">
                <div>ชื่อ: {name}</div>
                <div>สาขา: {major}</div>
                <div>ชั้นปี: {classyear}</div>
                <div>ห้อง: {room}</div>
              </div>
              <div className="mt-4">{renderStatusBadge(active)}</div>
            </div>
            <div className="mt-8">
              <h2 className="text-base font-semibold text-slate-900 mb-3">รายการ TODO</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {todoItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

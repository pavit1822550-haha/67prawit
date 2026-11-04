"use client";

import { useState } from "react";
import Header from "../compounents/headers";
import Footer from "../compounents/footer";
import Modal from "./components/modal";
import Mypetfrom from "./components/mypetfrom";

export default function HerbPage() {
  const [Tasks, setTasks] = useState<any[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);

  const resetEditingTask = () => setEditingTask(null);

  const filteredTasks =
    status === null
      ? Tasks
      : Tasks.filter((item) => item.status === status);

  const isActive = (act: string) => {
    if (act === "internal") return <span className="text-green-600 font-semibold">เพศผู้</span>;
    if (act === "external") return <span className="text-red-500 font-semibold">เพศเมีย</span>;
    if (act === "both") return <span className="text-purple-600 font-semibold">อื่นๆ</span>;
    return null;
  };

  const addTask = (title: string, desc: string, author: string,alter: string,type:string, taskStatus: string) => {
    const newTask = {
      id: Date.now(),
      title,
      desc,
      author,
      alter,
      type,
      status: taskStatus,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const onEdit = (t: any) => setEditingTask(t);

  const updateTask = (id: number, title: string, desc: string, author: string,alter:string,type:string,taskStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, title, desc, author,alter,type, status: taskStatus } : t
      )
    );
    setEditingTask(null);
  };

  const onDelete = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header />

      <main className="bg-[#63b3ed] flex flex-col items-center p-6 min-h-screen">
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 w-full max-w-5xl">
          <div className="w-full max-w-md rounded-[28px] overflow-hidden shadow-lg bg-white p-6 border border-gray-200">
            <Mypetfrom
              addTask={addTask}
              editingTask={editingTask}
              updateTask={updateTask}
              resetEditingTask={resetEditingTask}
              
            />

            <div className="mt-4 text-black font-medium text-sm">
              รายการสัส: {Tasks.length} รายการ
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <button
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 font-medium rounded-full text-xs px-3 py-1.5"
                onClick={() => setStatus(null)}
              >
                [A] ทั้งหมด
              </button>
              <button
                className="text-white bg-gradient-to-r from-green-400 to-green-600 font-medium rounded-full text-xs px-3 py-1.5"
                onClick={() => setStatus("internal")}
              >
                [I] เพศผู้
              </button>
              <button
                className="text-white bg-gradient-to-r from-purple-500 to-purple-700 font-medium rounded-full text-xs px-3 py-1.5"
                onClick={() => setStatus("external")}
              >
                [E] เพศเมีย
              </button>
              <button
                className="text-white bg-gradient-to-r from-indigo-500 to-indigo-700 font-medium rounded-full text-xs px-3 py-1.5"
                onClick={() => setStatus("both")}
              >
                [B] อื่นๆ
              </button>
            </div>
          </div>

          <div className="w-full max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((item) => {
                const { id, title, desc, author, alter,status } = item;
                return (
                  <div
                    className="w-full p-6 bg-white border border-gray-200 rounded-xl shadow-md text-black flex flex-col justify-between"
                    key={id}
                  >
                    <div>
                      <h3 className="font-bold text-lg">{title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{desc || "-"}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        เจ้าของ: {author || "-"}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                       ว/ด/ป: {alter || "-"}
                      </p>
                       <p className="text-xs text-gray-400 mt-2">
                     
                      </p>
                      <div className="mt-2">{isActive(status)}</div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedTask(item)}
                        className="bg-emerald-500 text-white px-3 py-1 rounded text-sm hover:bg-emerald-600 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Modal open={Boolean(selectedTask)} onClose={() => setSelectedTask(null)}>
        {selectedTask && (
          <div className="p-4 flex flex-col gap-2 text-black">
            <p><strong>ชื่อสัตว์เลี้ยง:</strong> {selectedTask.title}</p>
            <p><strong>รายละเอียด:</strong> {selectedTask.desc || "-"}</p>
            <p><strong>เจ้าของ:</strong> {selectedTask.author || "-"}</p>
            <p><strong>ว/ด/ป:</strong> {selectedTask.alter || "-"}</p>
            <p><strong>type:</strong> {selectedTask.type || "-"}</p>
            <p><strong></strong> {isActive(selectedTask.status)}</p>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}
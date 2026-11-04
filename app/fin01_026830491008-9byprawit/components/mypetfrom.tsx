"use cient";

import { useState, useEffect } from "react";

export default function Mypetfrom({ addTask, editingTask, updateTask, resetEditingTask }: any) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [author, setAuthor] = useState('');
  const [alter, setalter] = useState('');
  const [type, settype] = useState('');
  const [taskStatus, setTaskstatus] = useState('internal');
  
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDesc(editingTask.desc || '');
      setAuthor(editingTask.author || '');
      setalter(editingTask.alter)
      settype(editingTask.type)
      setTaskstatus(editingTask.status || 'internal');
    } else {
      handleCancel();
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editingTask) {
      updateTask(editingTask.id, title, desc, author,alter,type, taskStatus);
    } else {
      addTask(title, desc, author, alter,type,taskStatus);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setTitle('');
    setDesc('');
    setAuthor('');
    setalter('');
    settype(''),
    setTaskstatus('internal');
    resetEditingTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2 bg-white rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingTask ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูลสมุนไพร'}
        </h3>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="ชื่อสัตว์เลี้ยง"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="รายละเอียด"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            type="text"
            placeholder="ว/ด/ป"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            value={alter}
            onChange={(e) => setalter(e.target.value)}
          />
          <input
            type="text"
            placeholder="type"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            value={type}
            onChange={(e) => settype(e.target.value)}
          />
          <input
            type="text"
            placeholder="เจ้าของ"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-400 shadow-sm"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        <div 
         className="flex flex-col items-center p-7 rounded-2xl bg-cover bg-center"
           style={{ backgroundImage: "url('//')" }}
>         </div>
        </div>
         
        
        <div className="flex flex-wrap gap-3 mt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="taskStatus"
              checked={taskStatus === 'internal'}
              onChange={() => setTaskstatus('internal')}
              className="accent-blue-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">อื่นๆ</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="taskStatus"
              checked={taskStatus === 'external'}
              onChange={() => setTaskstatus('external')}
              className="accent-blue-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">เพศผู้</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="taskStatus"
              checked={taskStatus === 'both'}
              onChange={() => setTaskstatus('both')}
              className="accent-blue-600 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">เพศเมีย</span>
          </label>
        </div>

        <div className="flex mt-4 gap-2 justify-center">
          <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
            {editingTask ? 'อัปเดตข้อมูล' : 'เพิ่มข้อมูล'}
          </button>
          <button type="button" className="bg-gray-500 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-600 transition-colors" onClick={handleCancel}>
            ยกเลิก
          </button>
        </div>
      </div>
    </form>
  );
}
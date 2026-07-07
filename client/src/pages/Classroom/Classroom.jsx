import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import ClassroomForm from "../../components/classroom/ClassroomForm";
import ClassroomCard from "../../components/classroom/ClassroomCard";

import {
  getClassrooms,
  createClassroom,
  joinClassroom,
} from "../../services/classroomService";

const Classroom = () => {
  const [classrooms,
    setClassrooms] =
    useState([]);

  const loadClassrooms =
    async () => {
      try {

        const data =
          await getClassrooms();

        setClassrooms(
          data.classrooms
        );

      } catch (error) {

        toast.error(
          "Failed to load classrooms"
        );

      }
    };

  useEffect(() => {
    loadClassrooms();
  }, []);

  const handleCreate =
    async (classroomData) => {
      try {

        const data =
          await createClassroom(
            classroomData
          );

        toast.success(
          `Room created (${data.classroom.roomCode})`
        );

        loadClassrooms();

      } catch (error) {

        toast.error(
          "Failed to create classroom"
        );

      }
    };

  const handleJoin =
    async (roomCode) => {
      try {

        await joinClassroom(
          roomCode
        );

        toast.success(
          "Joined classroom"
        );

        loadClassrooms();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Failed to join classroom"
        );

      }
    };

 return (
  <DashboardLayout>
    <div className="space-y-8">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

  <div>

    <h1 className="text-4xl font-bold text-slate-900">

      📚 Classrooms

    </h1>

    <p className="mt-2 text-slate-500">

      Create classrooms, collaborate with classmates and manage your study groups.

    </p>

  </div>

  <div className="mt-5 lg:mt-0">

    <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-white shadow-lg">

      <p className="text-sm opacity-90">

        Active Classrooms

      </p>

      <h2 className="text-3xl font-bold">

        {classrooms.length}

      </h2>

    </div>

  </div>

</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">

<p className="text-slate-500 text-sm">

Joined Classrooms

</p>

<h2 className="mt-3 text-4xl font-bold text-violet-600">

{classrooms.length}

</h2>

</div>

<div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">

<p className="text-slate-500 text-sm">

Study Groups

</p>

<h2 className="mt-3 text-4xl font-bold text-green-600">

{classrooms.length}

</h2>

</div>

<div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm">

<p className="text-slate-500 text-sm">

Status

</p>

<h2 className="mt-3 text-4xl font-bold text-orange-500">

Active

</h2>

</div>

</div>

      {/* Form Section */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-400"></div>

      <div className="p-6">
        <ClassroomForm
          onCreate={handleCreate}
          onJoin={handleJoin}
        />
      </div>
      </div>

      {/* Classroom List */}
      <div className="space-y-5">

        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            Your Classrooms
          </h2>

          <span className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-md">
            {classrooms.length} Classroom{classrooms.length !== 1 ? "s" : ""}
          </span>
        </div>

        {classrooms.length === 0 ? (
         <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center shadow-sm">

<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-violet-100">

<span className="text-5xl">

📚

</span>

</div>

<h2 className="mt-8 text-2xl font-bold text-slate-900">

No Classrooms Yet

</h2>

<p className="mx-auto mt-3 max-w-md text-slate-500">

Create your own classroom or join an existing one using a room code.

</p>

</div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {classrooms.map((classroom) => (
              <ClassroomCard
                key={classroom._id}
                classroom={classroom}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  </DashboardLayout>
); 
};

export default Classroom;
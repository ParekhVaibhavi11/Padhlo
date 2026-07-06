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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Classrooms
        </h1>

        <p className="mt-2 text-slate-500">
          Create a classroom, join using a code, and collaborate with your classmates.
        </p>
      </div>

      {/* Form Section */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
        <ClassroomForm
          onCreate={handleCreate}
          onJoin={handleJoin}
        />
      </div>

      {/* Classroom List */}
      <div className="space-y-5">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Your Classrooms
          </h2>

          <span className="rounded-full bg-violet-100 px-4 py-1 text-sm font-medium text-violet-700">
            {classrooms.length} Classroom{classrooms.length !== 1 ? "s" : ""}
          </span>
        </div>

        {classrooms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-4xl">
              📚
            </div>

            <h3 className="text-xl font-semibold text-slate-800">
              No Classrooms Yet
            </h3>

            <p className="mt-2 text-slate-500">
              Create a new classroom or join one using a classroom code.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
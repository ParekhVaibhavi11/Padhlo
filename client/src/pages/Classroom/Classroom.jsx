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

      <div className="space-y-6">

        <ClassroomForm
          onCreate={
            handleCreate
          }
          onJoin={
            handleJoin
          }
        />

        <div className="grid md:grid-cols-2 gap-4">

          {classrooms.length === 0 ? (
            <div className="bg-white p-6 rounded-2xl border border-gray-100">

              <p className="text-gray-500">
                No classrooms joined yet.
              </p>

            </div>
          ) : (
            classrooms.map(
              (classroom) => (
                <ClassroomCard
                  key={
                    classroom._id
                  }
                  classroom={
                    classroom
                  }
                />
              )
            )
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Classroom;
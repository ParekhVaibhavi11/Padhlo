import { useEffect, useState } from "react";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

import DashboardLayout from "../../layouts/DashboardLayout";

import toast from "react-hot-toast";

import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../../services/eventService";

import {
  getTasks,
} from "../../services/taskService";

const localizer =
  momentLocalizer(moment);

const CalendarPage = () => {

  const [calendarEvents,
    setCalendarEvents] =
    useState([]);

  const [upcomingItems,
    setUpcomingItems] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      title: "",
      date: "",
    });

  const loadData =
    async () => {
      try {

        const eventData =
          await getEvents();

        const taskData =
          await getTasks();

        const events =
          eventData.events.map(
            (event) => ({
              id: event._id,
              title: event.title,
              start: new Date(
                event.date
              ),
              end: new Date(
                event.date
              ),
              type: "event",
            })
          );

        const tasks =
  taskData.tasks
    .filter(
      (task) =>
        task.deadline
    )
    .map(
      (task) => ({
        id: task._id,

        title:
          task.completed
            ? `✓ ${task.title}`
            : `Task: ${task.title}`,

        start:
          new Date(
            task.deadline
          ),

        end:
          new Date(
            task.deadline
          ),

        type: task.completed
          ? "completedTask"
          : "task",
      })
    );

        const merged =
          [...events, ...tasks];

        merged.sort(
          (a, b) =>
            a.start - b.start
        );

        setCalendarEvents(
          merged
        );

        setUpcomingItems(
          merged
        );

      } catch {

        toast.error(
          "Failed to load calendar"
        );

      }
    };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {

        await createEvent(
          formData
        );

        toast.success(
          "Event Added"
        );

        setFormData({
          title: "",
          date: "",
        });

        loadData();

      } catch {

        toast.error(
          "Failed to add event"
        );

      }
    };

  return (
    <DashboardLayout>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Calendar */}

        <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4">

          <Calendar
  localizer={localizer}
  events={calendarEvents}
  startAccessor="start"
  endAccessor="end"

  eventPropGetter={(event) => {

    let style = {};

    if (
      event.type ===
      "event"
    ) {
      style = {
        backgroundColor:
          "#7C3AED",
      };
    }

    if (
      event.type ===
      "task"
    ) {
      style = {
        backgroundColor:
          "#DC2626",
      };
    }

    if (
      event.type ===
      "completedTask"
    ) {
      style = {
        backgroundColor:
          "#16A34A",
      };
    }

    return {
      style,
    };
  }}

  style={{
    height: "800px",
  }}
/>

        </div>

        {/* Sidebar */}

        <div className="space-y-6">

          {/* Add Event */}

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

            <h2 className="text-xl font-semibold mb-4">
              Add Event
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-3"
            >

              <input
                type="text"
                placeholder="Event Title"
                value={
                  formData.title
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-lg p-3"
                required
              />

              <input
                type="date"
                value={
                  formData.date
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date:
                      e.target
                        .value,
                  })
                }
                className="w-full border rounded-lg p-3"
                required
              />

              <button
                className="w-full bg-purple-600 text-white py-3 rounded-lg"
              >
                Add Event
              </button>

            </form>

          </div>

          {/* Upcoming */}

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">

            <h2 className="text-xl font-semibold mb-4">
              Upcoming
            </h2>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">

              {upcomingItems
                .slice(0, 10)
                .map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item.id
                      }
                      className="border rounded-lg p-3"
                    >

                      <p
                        className={`font-medium ${
                          item.type === "event"
                            ? "text-purple-700"
                            : item.type ===
                              "completedTask"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        {moment(
                          item.start
                        ).format(
                          "DD MMM YYYY"
                        )}
                      </p>

                    </div>
                  )
                )}

            </div>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default CalendarPage;
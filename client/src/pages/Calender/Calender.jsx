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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Calendar
          </h1>
          <p className="mt-2 text-slate-500">
            Organize your schedule, track deadlines and manage upcoming events.
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 shadow-sm">
            <span className="h-3 w-3 rounded-full bg-violet-600"></span>
            <span className="text-sm text-slate-600">Events</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 shadow-sm">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-slate-600">Tasks</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2 shadow-sm">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-slate-600">
              Completed
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Calendar */}
        {/* Calendar */}

<div className="xl:col-span-9">
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Schedule Overview
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          View all your events, deadlines and reminders.
        </p>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center">
          📅
        </div>
      </div>
    </div>

    {/* Calendar */}
    <div className="p-5">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        popup
        selectable
        views={["month", "week", "day", "agenda"]}
        defaultView="month"

        eventPropGetter={(event) => {
          let style = {
            border: "none",
            borderRadius: "10px",
            color: "#fff",
            fontSize: "13px",
            fontWeight: "600",
            padding: "3px 8px",
          };

          if (event.type === "event") {
            style = {
              ...style,
              backgroundColor: "#7C3AED",
            };
          }

          if (event.type === "task") {
            style = {
              ...style,
              backgroundColor: "#EF4444",
            };
          }

          if (event.type === "completedTask") {
            style = {
              ...style,
              backgroundColor: "#22C55E",
            };
          }

          return { style };
        }}

        style={{
          height: "720px",
        }}
      />
    </div>
  </div>
</div>

        {/* Right Sidebar */}
        <div className="xl:col-span-3 space-y-6">
          {/* Add Event */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Add Event
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Create a new calendar event.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Event Title
                </label>

                <input
                  type="text"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Date
                </label>

                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100"
                  required
                />
              </div>

              <button
                className="w-full rounded-xl bg-violet-600 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg"
              >
                Add Event
              </button>
            </form>
          </div>

          {/* Upcoming */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Upcoming
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your next scheduled activities.
              </p>
            </div>

            <div className="max-h-[500px] space-y-4 overflow-y-auto pr-1">
              {upcomingItems.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p
                        className={`font-semibold ${
                          item.type === "event"
                            ? "text-violet-700"
                            : item.type === "completedTask"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        {moment(item.start).format("DD MMM YYYY")}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.type === "event"
                          ? "bg-violet-100 text-violet-700"
                          : item.type === "completedTask"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.type === "event"
                        ? "Event"
                        : item.type === "completedTask"
                        ? "Done"
                        : "Task"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">
              Legend
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-violet-600"></span>
                <span className="text-slate-600">Events</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-red-500"></span>
                <span className="text-slate-600">Pending Tasks</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-green-500"></span>
                <span className="text-slate-600">
                  Completed Tasks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);
};

export default CalendarPage;
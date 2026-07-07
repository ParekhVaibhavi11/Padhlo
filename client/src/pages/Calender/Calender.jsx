import { useEffect, useState } from "react";

import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";

import moment from "moment";

import {
  CalendarDays,
  Plus,
} from "lucide-react";

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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

  <div>

    <h1 className="text-4xl font-bold text-slate-900">
      📅 Calendar
    </h1>

    <p className="mt-2 text-slate-500">
      Organize your events, assignments and study schedule.
    </p>

  </div>

  <div className="mt-6 lg:mt-0">

    <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-4 text-white shadow-lg">

      <p className="text-sm opacity-90">

        Total Items

      </p>

      <h2 className="text-3xl font-bold">

        {calendarEvents.length}

      </h2>

    </div>

  </div>

</div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Calendar */}
        {/* Calendar */}

<div className="xl:col-span-9">
  <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
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

  <div className="h-12 w-12 rounded-2xl bg-violet-100 flex items-center justify-center">

    <CalendarDays
      size={24}
      className="text-violet-600"
    />

  </div>

</div>
    </div>

    {/* Calendar */}
    <div className="p-6 bg-slate-50">
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
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

        <div className="p-6">
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
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-violet-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Add Event
              </button>
            </form>
          </div>
          </div>

          {/* Upcoming */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

          <div className="p-6">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Upcoming
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your next scheduled activities.
              </p>
            </div>

            <div className="max-h-[720px] space-y-4 overflow-y-auto pr-1">
              {upcomingItems.slice(0, 10).map((item) => (
                <div
                  key={item.id}
                 className="rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
          </div>

          {/* Legend */}
              {/* Legend */}

<div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

  <div className="h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>

  <div className="p-6">

    <h3 className="text-xl font-bold text-slate-900">
      Legend
    </h3>

    <p className="text-sm text-slate-500 mt-1">
      Calendar color guide
    </p>

    <div className="mt-6 space-y-4">

      <div className="flex items-center gap-3">

        <div className="h-4 w-4 rounded-full bg-violet-600"></div>

        <span className="text-slate-700 font-medium">
          Events
        </span>

      </div>

      <div className="flex items-center gap-3">

        <div className="h-4 w-4 rounded-full bg-red-500"></div>

        <span className="text-slate-700 font-medium">
          Pending Tasks
        </span>

      </div>

      <div className="flex items-center gap-3">

        <div className="h-4 w-4 rounded-full bg-green-500"></div>

        <span className="text-slate-700 font-medium">
          Completed Tasks
        </span>

      </div>

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
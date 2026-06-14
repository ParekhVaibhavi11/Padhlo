import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getEvents,
  createEvent,
  deleteEvent,
} from "../../services/eventService";

const Calendar = () => {

  const [events,
    setEvents] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      title: "",
      emoji: "📚",
      date: "",
    });

  const loadEvents =
    async () => {
      try {

        const data =
          await getEvents();

        setEvents(
          data.events
        );

      } catch {

        toast.error(
          "Failed to load events"
        );

      }
    };

  useEffect(() => {
    loadEvents();
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
          emoji: "📚",
          date: "",
        });

        loadEvents();

      } catch {

        toast.error(
          "Failed to add event"
        );

      }
    };

  const handleDelete =
    async (id) => {
      try {

        await deleteEvent(id);

        toast.success(
          "Event Deleted"
        );

        loadEvents();

      } catch {

        toast.error(
          "Failed to delete event"
        );

      }
    };

  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <h1 className="text-2xl font-bold mb-4">
            Calendar & Planning
          </h1>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
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
                    e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="text"
              placeholder="Emoji"
              value={
                formData.emoji
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emoji:
                    e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
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
                    e.target.value,
                })
              }
              className="w-full border p-3 rounded-lg"
              required
            />

            <button
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
            >
              Add Event
            </button>

          </form>

        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Upcoming Events
          </h2>

          <div className="space-y-3">

            {events.length === 0 ? (
              <p className="text-gray-500">
                No events added.
              </p>
            ) : (
              events.map(
                (event) => (
                  <div
                    key={event._id}
                    className="border rounded-xl p-4 flex justify-between items-center"
                  >
                    <div>

                      <h3 className="font-medium">
                        {event.emoji}
                        {" "}
                        {event.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          event.date
                        ).toLocaleDateString()}
                      </p>

                    </div>

                    <button
                      onClick={() =>
                        handleDelete(
                          event._id
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>
                )
              )
            )}

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default Calendar;
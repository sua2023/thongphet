"use client";
import { FormatTime } from "@/helps/dateFormat";
import { IScheduleTypes } from "@/interfaces";
import moment from "moment";
import React from "react";
import {
  Calendar,
  EventProps,
  momentLocalizer,
  ToolbarProps,
  View,
  Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface TypeProps {
  data: IScheduleTypes[];
  onChange: (startDate: string, endDate: string) => void;
  onViewMore: (data: any) => void;
}
export default function Schedules({ data, onChange, onViewMore }: TypeProps) {
  const localizer = momentLocalizer(moment);
  const [activeButton, setActiveButton] = React.useState<string>("today");
  const [view, setView] = React.useState<View>(Views.WEEK);
  const [date, setDate] = React.useState(new Date());
  const [openMore, setOpenMore] = React.useState<boolean>(false);
  const [dataEvents, setDataEvents] = React.useState<any>(null);

  const [navLabels, setNavLabels] = React.useState({
    today: "This Month",
    back: "Back",
    next: "Next",
  });

  React.useEffect(() => {
    setView(Views.MONTH);
  }, []);

  const handleEditClose = () => {
    setOpenMore(false);
  };

  const handleNavigate = (action: string) => {
    let newDate = new Date(date);

    switch (action) {
      case "today":
        newDate = new Date();
        if (view == Views.MONTH) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth(), 1)
          );
          const endDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 2)
          );
          setDate(startDate);
          onChange(startDate.toDateString(), endDate.toDateString());
        }

        break;

      case "prev":
        if (view === Views.MONTH) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth() - 1, 1)
          );
          const endDate = new Date(
            Date.UTC(
              newDate.getFullYear(),
              newDate.getMonth(),
              0,
              23,
              59,
              59,
              999
            )
          );
          setDate(startDate);
          onChange(startDate.toDateString(), endDate.toDateString());
        }
        break;

      case "next":
        if (view === Views.MONTH) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 1)
          );
          const endDate = new Date(
            Date.UTC(
              newDate.getFullYear(),
              newDate.getMonth() + 2,
              0,
              23,
              59,
              59,
              999
            )
          );
          setDate(startDate);
          onChange(startDate.toDateString(), endDate.toDateString());
        }
        break;
      default:
        break;
    }
  };

  const calendarEvents = data.map((event) => {
    const start = moment(`${event.date}T${event.startTime}`).toDate();
    const end = moment(`${event.date}T${event.endTime}`).toDate();
    return {
      id: event.id,
      title: event.doctor?.firstName || "Unknown",
      start: start,
      end: end,
      allDay: false,
      resource: event,
    };
  });

  const handleShowMore = (events: any) => {
    setOpenMore(true);
    setDataEvents(events);
    onViewMore(events);
  };

  const CustomEvent = ({ event }: EventProps<any>) => {
    return (
      <div className="text-[12px]">
        <p>{`${FormatTime(event.resource?.startTime)}-${FormatTime(event.resource?.endTime)}`}</p>
        <p className="text-[10px]">{event.resource?.doctor?.firstName}</p>
      </div>
    );
  };

  const CustomToolbar = (toolbar: ToolbarProps) => {
    const { view, label } = toolbar;

    return (
      <div className="lg:py-4 lg:flex gap-x-10 block">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium ${
              activeButton === "prev"
                ? "bg-primary text-white rounded-s-md"
                : "text-gray700 border border-gray300 rounded-s-md"
            }`}
            onClick={() => {
              handleNavigate("prev");
              setActiveButton("prev");
            }}
          >
            {navLabels.back}
          </button>
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium ${
              activeButton === "today"
                ? "bg-primary text-white"
                : "text-gray700 border border-gray300"
            }`}
            onClick={() => {
              handleNavigate("today");
              setActiveButton("today");
            }}
          >
            {navLabels.today}
          </button>
          <button
            type="button"
            className={`px-4 py-1 text-sm font-medium ${
              activeButton === "next"
                ? "bg-primary text-white rounded-e-md"
                : "text-gray700 border border-gray300 rounded-e-md"
            }`}
            onClick={() => {
              handleNavigate("next");
              setActiveButton("next");
            }}
          >
            {navLabels.next}
          </button>
        </div>
        <div>{label}</div>
      </div>
    );
  };

  const CustomAgendaEvent = ({ event }: any) => {
    return (
      <div>
        <p className="text-sm">By: {event.resource?.doctor?.firstName}</p>
      </div>
    );
  };

  return (
    <>
      <div>
        <div>
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            date={date}
            view={view}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            style={{ height: "600px" }}
            components={{
              toolbar: CustomToolbar,
              event: CustomEvent,
              agenda: {
                event: CustomAgendaEvent,
              },
            }}
            onShowMore={handleShowMore}
          />
        </div>
      </div>
    </>
  );
}

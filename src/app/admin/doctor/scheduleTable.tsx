"use client";
import FormModal from "@/components/modal/formModal";
import { FormatDateString, formatDateToYYYYMMDD } from "@/helps/dateFormat";
import { IScheduleTypes } from "@/interfaces/schedule";
import { useFetchByDoctorSchedule, useFetchDoctor } from "@/lib/doctor/useFetchDoctor";
import useScheduleFilter from "@/lib/schedule/useFilterSchedule";
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
import DetailsSchedule from "../schedule/detials";

export default function ScheduleTable({ userId }: { userId: string }) {
  const localizer = momentLocalizer(moment);
  const {
    state: filter,
    dispatch: filterDispatch,
    ACTION_TYPE,
  } = useScheduleFilter();
  const { data:doctor, loading, error, refresh } = useFetchDoctor(userId);

  const { data } = useFetchByDoctorSchedule(filter, userId);
  const [activeButton, setActiveButton] = React.useState<string>("This Week");
  const [view, setView] = React.useState<View>(Views.WEEK);
  const [date, setDate] = React.useState(new Date());
  const [openMore, setOpenMore] = React.useState<boolean>(false);
  const [dataEvents, setDataEvents] = React.useState<any>(null);
  const [labelDate, setLabelDate] = React.useState<{
    labelStartDate: Date | null;
    labelEndDate: Date | null;
  }>({
    labelStartDate: null,
    labelEndDate: null,
  });

  const [navLabels, setNavLabels] = React.useState({
    today: "Today",
    back: "Back",
    next: "Next",
  });

  React.useEffect(() => {
    const newDate = new Date();

    let startDate: Date;
    let endDate: Date;
    setView(Views.WEEK);
    setActiveButton("This Week");
    const firstDayOfWeek = newDate.getDate() - newDate.getDay();
    startDate = new Date(newDate.setDate(firstDayOfWeek));
    endDate = new Date(newDate.setDate(firstDayOfWeek + 6));

    filterDispatch({
      type: ACTION_TYPE.START_DATE,
      payload: formatDateToYYYYMMDD(startDate),
    });
    filterDispatch({
      type: ACTION_TYPE.END_DATE,
      payload: formatDateToYYYYMMDD(endDate),
    });
    handleViewChange(Views.WEEK);
  }, []);

  const handleEditClose = () => {
    setOpenMore(false);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);

    const newDate = new Date();

    let startDate: Date;
    let endDate: Date;
    if (newView === Views.DAY) {
      setNavLabels({
        today: "Today",
        back: "Back",
        next: "Next",
      });
    } else if (newView === Views.WEEK) {
      setNavLabels({
        today: "This Week",
        back: "Back",
        next: "Next",
      });
    } else if (newView === Views.MONTH) {
      setNavLabels({
        today: "This Month",
        back: "Back",
        next: "Next",
      });
    } else if (newView === Views.AGENDA) {
      setNavLabels({
        today: "Week",
        back: "Month",
        next: "Today",
      });
    }

    switch (newView) {
      case Views.DAY:
        startDate = new Date(newDate.setHours(0, 0, 0, 0));
        endDate = new Date(newDate.setHours(23, 59, 59, 999));

        filterDispatch({
          type: ACTION_TYPE.START_DATE,
          payload: formatDateToYYYYMMDD(startDate),
        });
        filterDispatch({
          type: ACTION_TYPE.END_DATE,
          payload: formatDateToYYYYMMDD(endDate),
        });

        break;
      case Views.WEEK:
        const firstDayOfWeek = newDate.getDate() - newDate.getDay();
        startDate = new Date(newDate.setDate(firstDayOfWeek));
        endDate = new Date(newDate.setDate(firstDayOfWeek + 6));

        filterDispatch({
          type: ACTION_TYPE.START_DATE,
          payload: formatDateToYYYYMMDD(startDate),
        });
        filterDispatch({
          type: ACTION_TYPE.END_DATE,
          payload: formatDateToYYYYMMDD(endDate),
        });

        break;
      case Views.MONTH:
        startDate = new Date(
          Date.UTC(newDate.getFullYear(), newDate.getMonth(), 1)
        );
        endDate = new Date(
          Date.UTC(
            newDate.getFullYear(),
            newDate.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
          )
        );

        filterDispatch({
          type: ACTION_TYPE.START_DATE,
          payload: formatDateToYYYYMMDD(startDate),
        });
        filterDispatch({
          type: ACTION_TYPE.END_DATE,
          payload: formatDateToYYYYMMDD(endDate),
        });

        break;
      case Views.AGENDA:
        const agendaWeek = newDate.getDate() - newDate.getDay();
        startDate = new Date(newDate.setDate(agendaWeek));
        endDate = new Date(newDate.setDate(agendaWeek + 6));
        setLabelDate({ labelStartDate: startDate, labelEndDate: endDate });
        filterDispatch({
          type: ACTION_TYPE.START_DATE,
          payload: formatDateToYYYYMMDD(startDate),
        });
        filterDispatch({
          type: ACTION_TYPE.END_DATE,
          payload: formatDateToYYYYMMDD(endDate),
        });

        break;
      default:
        startDate = newDate;
        endDate = newDate;
        filterDispatch({
          type: ACTION_TYPE.START_DATE,
          payload: formatDateToYYYYMMDD(startDate),
        });
        filterDispatch({
          type: ACTION_TYPE.END_DATE,
          payload: formatDateToYYYYMMDD(endDate),
        });

        break;
    }
  };

  const handleNavigate = (action: string) => {
    let newDate = new Date(date);

    switch (action) {
      case "today":
        const currentDate = new Date();
        if (view === Views.DAY) {
          const startDate = new Date(currentDate.setHours(23, 59, 59, 999));
          const endDate = new Date(currentDate.setHours(23, 59, 0, 0));
          setDate(startDate);
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        } else if (view == Views.WEEK) {
          const startWeek = new Date(currentDate);
          const dayOfWeek = startWeek.getDay();
          const startDate = new Date(
            startWeek.setDate(startWeek.getDate() - dayOfWeek)
          );
          const endDate = new Date(startWeek.setDate(startDate.getDate() + 6));
          setDate(startDate);
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        } else if (view == Views.MONTH) {
          const startDate = new Date(
            Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 1)
          );
          const endDate = new Date(
            Date.UTC(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999
            )
          );
          setDate(startDate)
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });

          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        } else if (view == Views.AGENDA) {
          const agendaWeek = newDate.getDate() - newDate.getDay();
          const startDate = new Date(newDate.setDate(agendaWeek));
          const endDate = new Date(newDate.setDate(agendaWeek + 6));
          setLabelDate({ labelStartDate: startDate, labelEndDate: endDate });
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        }

        break;

      case "prev":
        if (view === Views.MONTH) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth() - 1, 1)
          );
          setDate(startDate);
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
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
          newDate.setMonth(newDate.getMonth() - 1);
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });
        } else if (view === Views.WEEK) {
          newDate.setDate(newDate.getDate() - newDate.getDay() - 1);
          setDate(newDate);
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
          newDate.setDate(newDate.getDate() - 6);
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
        } else if (view === Views.DAY) {
          setDate(newDate);

          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
          newDate.setDate(newDate.getDate() - 1);
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
        } else if (view === Views.AGENDA) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth(), 1)
          );
          setDate(startDate);

          const endDate = new Date(
            Date.UTC(
              newDate.getFullYear(),
              newDate.getMonth() + 1,
              0,
              23,
              59,
              59,
              999
            )
          );
          setLabelDate({ labelStartDate: startDate, labelEndDate: endDate });

          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        }
        break;

      case "next":
        if (view === Views.MONTH) {
          const startDate = new Date(
            Date.UTC(newDate.getFullYear(), newDate.getMonth() + 1, 1)
          );
          setDate(startDate);
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
          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });

          newDate.setMonth(newDate.getMonth() + 1);
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        } else if (view === Views.WEEK) {
          newDate.setDate(newDate.getDate() - newDate.getDay() + 7);
          setDate(newDate);

          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
          newDate.setDate(newDate.getDate() + 6);
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
        } else if (view === Views.DAY) {
          setDate(newDate);

          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
          newDate.setDate(newDate.getDate() + 1);
          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(newDate),
          });
        } else if (view === Views.AGENDA) {
          const startDate = new Date(newDate.setHours(23, 59, 59, 999));
          setDate(startDate);

          const endDate = new Date(newDate.setHours(0, 0, 0, 0));
          setLabelDate({ labelStartDate: startDate, labelEndDate: endDate });

          filterDispatch({
            type: ACTION_TYPE.END_DATE,
            payload: formatDateToYYYYMMDD(startDate),
          });

          filterDispatch({
            type: ACTION_TYPE.START_DATE,
            payload: formatDateToYYYYMMDD(endDate),
          });
        }
        break;

      default:
        break;
    }
  };

  const calendarEvents: any = data.map((event) => {
    const start = moment(`${event.date}T${event.startTime}`).toDate();
    const end = moment(`${event.date}T${event.endTime}`).toDate();
    return {
      id: event.id,
      title: doctor?.firstName || "Unknown",
      start: start,
      end: end,
      allDay: false,
      resource: event,
    };
  });

  const handleShowMore = (events: any, date: any) => {
    setOpenMore(true);
    setDataEvents(events);
  };

  const CustomEvent = ({ event }: EventProps<IScheduleTypes>) => {
    
    return (
      <span>
        {event?.resource?.available && (
          <strong className="text-sm">{event?.resource.available}</strong>
        )}
        <br />
        <span className="text-sm">
          By: {doctor?.firstName || "Unknown"}
        </span>
      </span>
    );
  };

  const CustomToolbar = (toolbar: ToolbarProps) => {
    const { view, label, date } = toolbar;

    return (
      <div className="lg:py-4 lg:flex justify-between block">
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
        <div>
          {view === "agenda" &&
          labelDate?.labelEndDate &&
          labelDate?.labelStartDate
            ? `${FormatDateString(
                labelDate.labelStartDate
              )} - ${FormatDateString(labelDate.labelEndDate)}`
            : label}
        </div>
        <div className="inline-flex rounded-md shadow-sm lg:0" role="group">
          <button
            className={`px-4 py-1 text-sm font-medium  ${
              view === Views.MONTH
                ? "bg-primary text-white rounded-s-md"
                : "text-gray700 border border-gray300 rounded-s-md"
            }`}
            onClick={() => handleViewChange(Views.MONTH)}
          >
            Month
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium ${
              view === Views.WEEK
                ? "bg-primary text-white"
                : "text-gray700 border border-gray300"
            }`}
            onClick={() => handleViewChange(Views.WEEK)}
          >
            Week
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium ${
              view === Views.DAY
                ? "bg-primary text-white"
                : "text-gray700 border border-gray300"
            }`}
            onClick={() => handleViewChange(Views.DAY)}
          >
            Day
          </button>
          <button
            className={`px-4 py-1 text-sm font-medium ${
              view === Views.AGENDA
                ? "bg-primary text-white rounded-e-md"
                : "text-gray700 border border-gray300 rounded-e-md"
            }`}
            onClick={() => handleViewChange(Views.AGENDA)}
          >
            Agenda
          </button>
        </div>
      </div>
    );
  };

  const CustomAgendaEvent = ({ event }: any) => {
    return (
      <div>
        <p className="text-sm">By: {doctor?.firstName}</p>
      </div>
    );
  };

  return (
    <>
      <div>
        <p className="mt-2 pb-4 text-base">All Schedule</p>
        <div className="mt-5">
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
        <FormModal isOpen={openMore} onClose={handleEditClose}>
          {dataEvents && <DetailsSchedule data={dataEvents} />}
        </FormModal>
      </div>
    </>
  );
}

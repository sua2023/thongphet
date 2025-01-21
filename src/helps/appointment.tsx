import { appointmentEnum } from "@/enum/appointment.enum";

export const AppointmentOptions: { value: string; label: string }[] = [
  { value: appointmentEnum.PENDING, label: "Pending" },
  { value: appointmentEnum.COMPLETE, label: "Complete" },
  { value: appointmentEnum.CANCELLED, label: "Cancelled" },
  { value: appointmentEnum.RESCHEDULED, label: "Reschedule" },
  
];

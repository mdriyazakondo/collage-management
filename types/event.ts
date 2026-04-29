export interface TEvents {
  _id?: string;
  title: string;
  description: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  organizer: string;
  image?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

export interface TEventFormValues {
  title: string;
  description: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  organizer: string;
  image?: FileList;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
}

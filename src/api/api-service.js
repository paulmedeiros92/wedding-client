import axios from "axios";

// const baseURL = 'https://us-central1-wedding-63917.cloudfunctions.net/app/api';
const baseURL = "http://localhost:5001/wedding-63917/us-central1/app/api";
const api = axios.create({ baseURL });

export function getSearchHousehold(firstName, lastName) {
  return api.get("/search", { params: { firstName, lastName } });
}

export function postAttendees(attendees) {
  return api.post(`/attendees`, attendees);
}

export function markForDeletion(attendeeId) {
  return api.delete(`/attendee/${attendeeId}`);
}

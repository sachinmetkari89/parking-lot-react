// // import * as constants from "./constants";
import axios from "../utils/axios";
import { FetchTicketNumbersProps, CarRegNosWithCarColorProps } from "./types";

// This fetchTicketNumbers action is usefull for fetching api to get registration numbers.
export function carRegistrationNumbersWithCarColor({ url, color }: CarRegNosWithCarColorProps) {
  return () => axios({
    url: `${url}?color=${color}`,
    method: 'get',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}


// This fetchTicketNumbers action is usefull for fetching api to get ticket number(s).
export function fetchTicketNumbers({ url: newUrl, color, reg_number }: FetchTicketNumbersProps) {
  let url = newUrl
  if (color) {
    url = `${url}?color=${color}`
  }

  if (reg_number) {
    url = `${url}?reg_number=${reg_number}`
  }

  return () => axios({
    url: url,
    method: 'get',
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error.response;
    });
}
import { useSelector } from "react-redux";
import {
  getAuthorizationStatus,
  getAuthorizationLoadingStatus,
  getUser,
} from "../selectors";
import { UserLogged } from "../../../utilities/types";

export const useAuthorizationStatus = (): boolean => {
  return useSelector(getAuthorizationStatus);
};

export const useAuthorizationLoadingStatus = (): boolean => {
  return useSelector(getAuthorizationLoadingStatus);
};

export const useUser = (): UserLogged => {
  return useSelector(getUser);
};

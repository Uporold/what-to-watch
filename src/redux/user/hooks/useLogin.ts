import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Operation } from "../user";
import { LoginData } from "../../../utilities/types";

export const useLogin = (): ((authData: LoginData) => void) => {
  const dispatch = useDispatch();

  return useCallback(
    (authData) => {
      dispatch(Operation.login(authData));
    },
    [dispatch],
  );
};

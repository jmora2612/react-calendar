export const initialState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authenticated = {
  status: "authenticated", //authenticated, not-authenticated
  user: {
    _id: "abc",
    name: "jessi",
  },
  errorMessage: undefined,
};

export const notAuthenticated = {
  status: "not-authenticated", //authenticated, not-authenticated
  user: {},
  errorMessage: undefined,
};

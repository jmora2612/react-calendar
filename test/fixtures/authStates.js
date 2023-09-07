export const initialState = {
  status: "not-authenticated",
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

export const authenticatedTest = {
  status: "authenticated", //authenticated, not-authenticated
  user: {
    _id: "64f8c524f1034d8a4789b4c5",
    name: "test",
  },
  errorMessage: undefined,
};

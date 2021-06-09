const authReducer = (state, action) => {
  switch (action.type) {
    case "VERIFY_USER":
      return {
        user: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;

const UpdatesReduser = (state = '', action) => {
    switch (action.type) {
      case "REMOVE":
        return action.payload;
      case "ADDED":
        return action.payload;
      case "CLEAR_UPDATES":
        return "";
      default:
        return state;
    }
  };
  export default UpdatesReduser;
  
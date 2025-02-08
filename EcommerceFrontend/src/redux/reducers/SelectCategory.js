const SelectCategory = (state = [], action) => {
    switch (action.type) {
      case "TAKE_CATEGORY":
        return action.payload;
      default:
        return state;
    }
  };
  export default SelectCategory;
  
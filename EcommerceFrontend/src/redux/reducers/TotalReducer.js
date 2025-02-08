const TotalReducer = (state = [], action) => {
    switch (action.type) {
      case "TOTAL":
        console.log("action.payload" ,action.payload)
        return ( Math.floor(action.payload + action.payload * 0.09 - action.payload * 0.05)); 
      default:
        return state;
    }
  };
  export default TotalReducer;
  
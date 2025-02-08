import { combineReducers } from "redux";
import CartReduser from "./CartReduser";
import UpdatesReduser from "./UpdatesReducer";
import TotalReducer from "./TotalReducer";
const rootReducer = combineReducers({
  CartReduser,
  UpdatesReduser,
  TotalReducer,
});

export default rootReducer;

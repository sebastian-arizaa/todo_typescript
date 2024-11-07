import { useDispatch, useSelector, useStore } from "react-redux"
import { AppDispatch, AppStore } from "../../main"
import { RootReducer } from "../reducer/rootReducer";


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootReducer>();
export const useAppStore = useStore.withTypes<AppStore>();
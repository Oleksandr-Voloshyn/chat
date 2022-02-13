import { configureStore } from "@reduxjs/toolkit";
import reduxUsers from "./reduxUsers";

export default configureStore({
    reducer: {
        reduxUsers
    }
})
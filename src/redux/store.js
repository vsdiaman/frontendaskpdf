// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./reducers/fileReducer"; // Certifique-se de que o caminho está correto

const store = configureStore({
  reducer: {
    file: fileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar valores não serializáveis para essas ações
        ignoredActions: ["FETCH_PDF_LIST_SUCCESS"],
        ignoredPaths: ["file.pdfList.0.uploadDate"],
      },
    }),
});

export default store;

import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
} from "../actions/fileActions";

const initialState = {
  uploading: false,
  fileUrl: "",
  latestPdfUrl: null, // Adicione esta linha
  error: null,
  uploading: false,
  pdfList: [],
  pdfText: "",
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PDF_LIST_SUCCESS":
      return {
        ...state,
        pdfList: action.payload.map((pdf) => ({
          ...pdf,
          uploadDate: new Date(pdf.uploadDate).toISOString(), // Converta de volta para string ISO, se necessário
        })),
      };
    case "FETCH_LATEST_PDF_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "FETCH_PDF_LIST_SUCCESS":
      return {
        ...state,
        pdfList: action.payload,
      };

    case "FETCH_PDF_LIST_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "UPLOAD_FILE_REQUEST":
      return { ...state, uploading: true };
    case "UPLOAD_FILE_SUCCESS":
      return {
        ...state,
        uploading: false,
        fileUrl: action.payload.fileUrl,
        pdfId: action.payload.pdfId,
        latestPdfUrl: action.payload.fileUrl,
        pdfText: action.payload.pdfText, // 🔥 Salva o texto do PDF
      };

    case "UPLOAD_FILE_FAILURE":
      return { ...state, uploading: false, error: action.payload.error };

    default:
      return state;
  }
};

export default fileReducer;

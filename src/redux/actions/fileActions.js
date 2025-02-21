import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import backendUrls from "../../config/config.js";
import { storage } from "../../config/FirebaseConfig"; // Corrija o caminho se necessário

// Actions do Redux
export const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";
export const FETCH_PDF_LIST_SUCCESS = "FETCH_PDF_LIST_SUCCESS";
export const FETCH_PDF_LIST_FAILURE = "FETCH_PDF_LIST_FAILURE";

// 🔥 Estado Global para armazenar o fileId (Em Redux)
export const uploadFile = (file) => async (dispatch) => {
  const formData = new FormData();
  // const apiUrl = backendUrls.local;
  const apiUrl = backendUrls.production;
  formData.append("file", file);

  try {
    dispatch({ type: "UPLOAD_FILE_REQUEST" });

    console.log("BACKEND URL:", apiUrl);

    const response = await fetch(`${apiUrl}/files/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.fileId) {
      console.log(
        "Aquivo do conteudo pdfTxt pra ve se o conteudo esta armazenando.",
        data.pdfText
      );
      dispatch({
        type: "UPLOAD_FILE_SUCCESS",
        payload: {
          fileId: data.fileId, // Guarda o fileId no Redux
          pdfText: data.pdfText, // Já exibe o texto do PDF extraído
        },
      });
    }
    console.log("📄 Arquivo salvo:", data);
  } catch (error) {
    dispatch({
      type: "UPLOAD_FILE_FAILURE",
      payload: { error: error.message },
    });

    console.error("❌ Erro no upload:", error);
  }
};

// 🔥 Buscar PDF sem reenviar o arquivo
export const fetchPdfText = (fileId) => async (dispatch) => {
  const apiUrl = backendUrls.local;
  try {
    const response = await fetch(`${apiUrl}/files/${fileId}`);
    const data = await response.json();

    if (data.fileId) {
      dispatch({
        type: "UPLOAD_FILE_SUCCESS",
        payload: {
          fileId: data.fileId,
          pdfText: data.data.text, // 🔥 Busca texto do PDF salvo no Firebase
        },
      });
    }
  } catch (error) {
    console.error("❌ Erro ao buscar os dados do PDF:", error);
  }
};

// 🔥 Buscar a lista de PDFs salvos no Firebase
export const fetchPdfList = () => async (dispatch) => {
  try {
    const pdfListRef = ref(storage, `pdfs/`);
    const response = await listAll(pdfListRef);

    const pdfs = await Promise.all(
      response.items.map(async (item) => {
        const url = await getDownloadURL(item);

        let uploadDateString = null;
        try {
          const metadata = await getMetadata(item);
          uploadDateString = metadata.customMetadata?.uploadDate
            ? new Date(metadata.customMetadata.uploadDate).toISOString()
            : new Date().toISOString();
        } catch (error) {
          console.error("Erro ao buscar metadados:", error);
          uploadDateString = new Date().toISOString();
        }

        return {
          url,
          name: item.name,
          uploadDate: uploadDateString,
        };
      })
    );

    pdfs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    dispatch({ type: FETCH_PDF_LIST_SUCCESS, payload: pdfs });
  } catch (error) {
    console.error("❌ Erro ao buscar PDFs:", error);
    dispatch({ type: FETCH_PDF_LIST_FAILURE, payload: error.message });
  }
};

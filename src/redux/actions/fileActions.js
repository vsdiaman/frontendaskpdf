import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import backendUrl from "../../config/config.js";
import { storage } from "../../config/FirebaseConfig"; // Corrija o caminho se necessário

export const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";

export const uploadFile = (file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    dispatch({ type: "UPLOAD_FILE_REQUEST" });
    console.log("BACKEND URL:", backendUrl);

    const response = await fetch(`${backendUrl}/files/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar o arquivo: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({
      type: "UPLOAD_FILE_SUCCESS",
      payload: {
        fileUrl: data.url, // URL do JSON salvo no Firebase
        pdfId: data.fileName, // Nome do arquivo salvo
        pdfText: data.pdfText, // 🔥 Salva o texto extraído no Redux
      },
    });

    console.log("📄 Arquivo salvo:", data);
  } catch (error) {
    dispatch({
      type: "UPLOAD_FILE_FAILURE",
      payload: { error: error.message },
    });

    console.error("❌ Erro no upload:", error);
  }
};

export const fetchPdfList = () => async (dispatch) => {
  try {
    const pdfId = uuidv4();
    const pdfListRef = ref(storage, `pdfs/${pdfId}`);
    const response = await listAll(pdfListRef);

    const pdfs = await Promise.all(
      response.items.map(async (item) => {
        const url = await getDownloadURL(item);

        let uploadDateString = null;
        try {
          const metadata = await getMetadata(item);
          // Armazene a data como uma string ISO
          uploadDateString = metadata.customMetadata?.uploadDate
            ? new Date(metadata.customMetadata.uploadDate).toISOString()
            : new Date().toISOString();
        } catch (error) {
          console.error("Error fetching metadata:", error);
          uploadDateString = new Date().toISOString(); // Data padrão em formato ISO
        }

        return {
          url,
          name: item.name,
          uploadDate: uploadDateString,
        };
      })
    );

    pdfs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));

    dispatch({ type: "FETCH_PDF_LIST_SUCCESS", payload: pdfs });
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    dispatch({ type: "FETCH_PDF_LIST_FAILURE", payload: error.message });
  }
};

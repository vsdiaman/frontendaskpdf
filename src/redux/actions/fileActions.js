import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

import { storage } from "../../config/FirebaseConfig"; // Corrija o caminho se necessário

export const UPLOAD_FILE_REQUEST = "UPLOAD_FILE_REQUEST";
export const UPLOAD_FILE_SUCCESS = "UPLOAD_FILE_SUCCESS";
export const UPLOAD_FILE_FAILURE = "UPLOAD_FILE_FAILURE";

const BASE_URL = "https://backend-chatpdf-production.up.railway.app";

// export const uploadFile = (file) => async (dispatch) => {
//   try {
//     const pdfId = uuidv4();
//     const fileRef = ref(storage, `pdfs/${pdfId}_${file.name}`);

//     const metadata = {
//       customMetadata: {
//         uploadDate: new Date().toISOString(),
//         pdfId: pdfId, // Adiciona a data de upload
//       },
//     };
//     await uploadBytes(fileRef, file, metadata);
//     console.log("File uploaded with metadata");

//     const url = await getDownloadURL(fileRef);

//     dispatch({
//       type: "UPLOAD_FILE_SUCCESS",
//       payload: { fileUrl: url, pdfId: pdfId },
//     }); // Atualize o estado com a URL e pdfId
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     dispatch({ type: "UPLOAD_FILE_FAILURE", payload: error.message });
//   }
// };

export const uploadFile = (file) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    dispatch({ type: "UPLOAD_FILE_REQUEST" });

    const url = BASE_URL
      ? `${BASE_URL}/files/upload`
      : "http://localhost:4000/files/upload";

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao enviar o arquivo: ${response.status} - ${response.statusText}`
      );
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error("Resposta do servidor não é um JSON válido.");
    }

    dispatch({
      type: "UPLOAD_FILE_SUCCESS",
      payload: {
        fileUrl: data.url,
        pdfId: data.fileName,
        pdfText: data.pdfText,
      },
    });

    console.log("📄 Arquivo salvo:", data);
  } catch (error) {
    dispatch({
      type: "UPLOAD_FILE_FAILURE",
      payload: { error: error.message || "Erro desconhecido" },
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

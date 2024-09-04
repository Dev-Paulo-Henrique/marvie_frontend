import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Header } from "../Admin/Header";
import { Title } from "../../utils/Title";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export function AddProduct() {
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  Title({ title: "Novo Produto" });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles);
    const newImgPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setImgPreviews((prev) => [...prev, ...newImgPreviews]);
    setFiles((prev) => [...prev, ...newFiles]);

    event.target.value = "";
  };

  const handleRemove = (index: number) => {
    setImgPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length === 0) return;

    setUploading(true);
    setProgresspercent(0);

    const totalFiles = files.length;
    let completedUploads = 0;

    files.forEach((file) => {
      const storageRef = ref(storage, `products/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgresspercent(progress);
        },
        (error) => {
          alert(error.message);
          setUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            completedUploads += 1;
            if (completedUploads === totalFiles) {
              setUploading(false);
              setImgPreviews([]);
              setFiles([]);
            }
          });
        }
      );
    });
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <Header title="Novo Produto" />
      <div className="bg-white shadow rounded p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            multiple
            className="dashed"
            onChange={handleFileChange}
            ref={fileInputRef}
            hidden
          />
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn btn-primary"
          >
            Escolher arquivos
          </button>
          {!uploading && imgPreviews.length > 0 && imgPreviews.length > 0 && (
            <div className="mt-4">
              <h4>Preview</h4>
              <div className="d-flex flex-wrap">
                {imgPreviews.map((url, index) => (
                  <div
                    key={index}
                    className="position-relative me-2 mb-2 gap-1 d-flex flex-column"
                  >
                    <img src={url} alt={`preview ${index}`} height={200} />
                    <button
                      type="button"
                      className="btn btn-danger bottom-0 start-0 end-0"
                      onClick={() => handleRemove(index)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {uploading && (
            <div className="mt-4 d-flex justify-content-center">
              <div className="outerbar">
                <div
                  className="innerbar w-100"
                  style={{ width: `${progresspercent}%` }}
                >
                  Uploading: {progresspercent}%
                </div>
              </div>
            </div>
          )}
          <div className="d-flex gap-2 mt-4 justify-content-end">
            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="btn btn-danger"
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

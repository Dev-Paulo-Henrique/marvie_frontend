import { useState, useRef, FormEvent, ChangeEvent, KeyboardEvent } from "react";
import { Header } from "../Admin/Header";
import { Title } from "../../utils/Title";
import { useNavigate } from "react-router-dom";
import { storage } from "../../services/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

export function AddProduct() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [estoque, setEstoque] = useState(0);
  const [valor, setValor] = useState(0);
  const [catId, setCatId] = useState("");
  const [status, setStatus] = useState("Novidade");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [progresspercent, setProgresspercent] = useState<number>(0);
  const [imgPreviews, setImgPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const { token } = useAuth();

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

  const handleSizeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const newSize = input.value.trim();
      if (newSize && !sizes.includes(newSize)) {
        setSizes((prev) => [...prev, newSize]);
        input.value = "";
      }
      event.preventDefault();
    }
  };

  const handleColorKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const input = event.target as HTMLInputElement;
      const newColor = input.value.trim();
      if (newColor && !colors.includes(newColor)) {
        setColors((prev) => [...prev, newColor]);
        input.value = "";
      }
      event.preventDefault();
    }
  };

  const handleSizeRemove = (index: number) => {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleColorRemove = (index: number) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(sizes.length <= 0) {
      toast.error("O campo tamanho está vazio", {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
      return;
    } else if(colors.length <= 0){
      toast.error("O campo cores está vazio", {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
      return;
    }

    if (files.length < 2) {
      toast.error("É necessário ao menos enviar duas imagens do produto", {
        position: "top-center",
        toastId: "create",
        hideProgressBar: true,
        autoClose: 3000,
        pauseOnHover: false,
        closeButton: false,
        className: "text-center",
      });
      return;
    }

    setUploading(true);
    setProgresspercent(0);

    const totalFiles = files.length;
    let completedUploads = 0;
    const uploadedImageUrls: string[] = [];

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
            uploadedImageUrls.push(downloadURL);
            completedUploads += 1;
            if (completedUploads === totalFiles) {
              const productData = {
                nome,
                descricao,
                estoque,
                valor,
                cat_id: catId,
                status,
                image_id: JSON.stringify(uploadedImageUrls),
                sizes: JSON.stringify(sizes),
                colors: JSON.stringify(colors),
              };

              api
                .post("/products", productData, {
                  headers: {
                    "x-access-token": token,
                  },
                })
                .then(() => {
                  setUploading(false);
                  setImgPreviews([]);
                  setFiles([]);
                  setSizes([]);
                  setColors([]);
                  navigate("/admin/products");
                })
                .catch((error) => {
                  console.error("Erro ao criar produto:", error);
                  setUploading(false);
                });
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
          <div className="row">
            <div className="col-lg-6 form-group">
              <label htmlFor="productName">Nome do Produto</label>
              <input
                type="text"
                id="productName"
                className={`form-control ${
                  nome === "" ? "is-invalid" : "is-valid"
                }`}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="productName">Imagens do Produto</label>
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
                className="btn btn-primary w-100"
              >
                Escolher arquivos
              </button>
            </div>
          </div>
          <div className="form-group mt-2">
            <label htmlFor="productDescription">Descrição</label>
            <textarea
              id="productDescription"
              className={`form-control ${
                descricao === "" ? "is-invalid" : "is-valid"
              }`}
              maxLength={255}
              value={descricao}
              placeholder="Detalhe o produto em até no máximo 255 caracteres."
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
            {descricao.length === 255 ? <small className="text-danger">Você atingiu o limite de caracteres.</small> : <small>{255 - descricao.length} caracteres restantes.</small>}
          </div>
          <div className="row">
            <div className="col-lg-3 col-6 form-group mt-2">
              <label htmlFor="productStock">Estoque</label>
              <input
                type="number"
                id="productStock"
                className={`form-control ${
                  estoque === null ? "is-invalid" : "is-valid"
                }`}
                value={estoque}
                onChange={(e) => setEstoque(parseInt(e.target.value))}
                required
              />
            </div>
            <div className="col-lg-3 col-6 form-group mt-2">
              <label htmlFor="productPrice">Valor</label>
              <div className="input-group mb-3">
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  id="productPrice"
                  className={`form-control ${
                    valor <= 0 ? "is-invalid" : "is-valid"
                  }`}
                  value={valor}
                  onChange={(e) => setValor(parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="col-lg-3 col-6 form-group mt-2">
              <label htmlFor="productCategory">Categoria</label>
              <input
                type="text"
                id="productCategory"
                className={`form-control ${
                  catId === "" ? "is-invalid" : "is-valid"
                }`}
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                required
              />
            </div>
            <div className="col-lg-3 col-6 form-group mt-2">
              <label htmlFor="productStatus">Status</label>
              <select
                id="productStatus"
                className={`form-control ${
                  status === "" ? "is-valid" : "is-valid"
                }`}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" selected disabled>
                  Escolha uma opção...
                </option>
                <option value="Novidade">Novidade</option>
                <option value="Últimas unidades">Últimas unidades</option>
                <option value="Promoção">Promoção</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className=" col-6 form-group mt-2">
              <label htmlFor="productSizes">Tamanhos</label>
              <input
                type="text"
                id="productSizes"
                className={`form-control ${
                  sizes.length <= 0 ? "is-invalid" : "is-valid"
                }`}
                placeholder="Pressione Enter para adicionar"
                onKeyDown={handleSizeKeyDown}
              />
              <ul className="list-group mt-2">
                {sizes.map((size, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {size}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleSizeRemove(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-6 form-group mt-2">
              <label htmlFor="productColors">Cores</label>
              <input
                type="text"
                id="productColors"
                className={`form-control ${
                  colors.length <= 0 ? "is-invalid" : "is-valid"
                }`}
                placeholder="Pressione Enter para adicionar"
                onKeyDown={handleColorKeyDown}
              />
              <ul className="list-group mt-2">
                {colors.map((color, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {color}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleColorRemove(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {!uploading && imgPreviews.length > 0 && (
            <div className="mt-4">
              <h4>Preview</h4>
              <div className="d-flex justify-content-around flex-wrap">
                {imgPreviews.map((url, index) => (
                  <div
                    key={index}
                    className="position-relative me-2 mb-4 gap-1 d-flex flex-column"
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

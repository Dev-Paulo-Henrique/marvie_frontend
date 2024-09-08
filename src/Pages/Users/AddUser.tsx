import { useState, useEffect } from "react";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { Header } from "../Admin/Header";
import { Title } from "../../utils/Title";
import { isAxiosError } from "axios";
import { useMask } from '@react-input/mask';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMediaQuery } from "react-responsive";

export function AddUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [CEP, setCEP] = useState("");
  const [numero, setNumero] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const { userId } = useParams<{ userId?: string }>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const inputTelefoneRef = useMask({ mask: '+__ (__) _____-____', replacement: { _: /\d/ } });
  const inputCEPRef = useMask({ mask: '_____-___', replacement: { _: /\d/ } });

  Title({ title: isEdit ? "Editar cliente" : "Novo cliente" });
  const isDesktop = useMediaQuery({ minWidth: 992 });

  useEffect(() => {
    if (userId) {
      setIsEdit(true);
      (async () => {
        try {
          const response = await api.get(`/users/${userId}`, {
            headers: { 'x-access-token': token },
          });
          const user = response.data;
          setNome(user.nome);
          setEmail(user.email);
          // setNascimento(user.data_nascimento);
          setTelefone(user.telefone);
          setCEP(user.cep);
          setNumero(user.numero);
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
          toast.error("Erro ao carregar dados do usuário.");
        }
      })();
    }
  }, [userId, token]);

  const formatDateForMySQL = (date: Date) => {
    const padTo2Digits = (num: number) => {
      return num.toString().padStart(2, '0');
    };
  
    return (
      date.getFullYear() + '-' +
      padTo2Digits(date.getMonth() + 1) + '-' +
      padTo2Digits(date.getDate()) + ' ' +
      padTo2Digits(date.getHours()) + ':' +
      padTo2Digits(date.getMinutes()) + ':' +
      padTo2Digits(date.getSeconds())
    );
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (senha !== confirmarSenha) {
      toast.error('Senhas não coincidem.');
      return;
    }
    const customerData = {
      nome,
      email,
      senha,
      // data_nascimento: nascimento,
      telefone,
      CEP,
      numero,
      createdAt: isEdit ? undefined : formatDateForMySQL(new Date()),
    };

    try {
      if (isEdit) {
        await api.put(`/users/${userId}`, customerData, { headers: { 'x-access-token': token } });
        toast.success("Cliente atualizado com sucesso!");
      } else {
        await api.post("/users", customerData, { headers: { 'x-access-token': token } });
        toast.success("Cliente criado com sucesso!");
      }
      navigate('/admin/users');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      if (isAxiosError(error)) {
        if (error.response) {
          toast.error(error.response.data, {
            position: "top-center",
            hideProgressBar: true,
            autoClose: 3000,
            pauseOnHover: false,
            closeButton: false,
            className: 'text-center',
          });
        }
      } else {
        console.log("Erro desconhecido:", error);
      }
    }
  };

  return (
    <>
      <Header title={isEdit ? "Editar cliente" : "Novo cliente"} />
      <div className="bg-white shadow rounded p-4">
        <form onSubmit={handleSubmit}>
          <div className={`form-row ${isDesktop && "row"}`}>
            <div className="form-group col mb-3">
              <label htmlFor="nomeCompleto">Nome Completo</label>
              <input
                type="text"
                className="form-control"
                id="nomeCompleto"
                placeholder="Nome completo"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div className="form-group col mb-3">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {!isEdit && <div className="form-row row">
            <div className="form-group col mb-3">
              <label htmlFor="inputPassword4">Senha</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Senha"
                minLength={8}
                required={!isEdit}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <small id="passwordHelp" className={`form-text ${senha && senha.length < 8 ? "text-danger" :"text-muted"}`}>
                {senha.length >= 8 ? "Número de caracteres aceitáveis." : "Deve conter no mínimo 8 caracteres."}
              </small>
            </div>
            <div className="form-group col mb-3">
              <label htmlFor="inputPasswordConfirm4">
                Confirmação de senha
              </label>
              <input
                type="password"
                className={`form-control ${(senha !== confirmarSenha) && (confirmarSenha.length > 0) && "is-invalid"}`}
                id="inputPasswordConfirm4"
                minLength={8}
                placeholder="Confirmação de senha"
                required={!isEdit}
                value={confirmarSenha}
                disabled={!senha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              {(senha !== confirmarSenha) && (confirmarSenha.length > 0) && <small id="passwordHelp" className="form-text text-danger">
                As senhas devem ser iguais.
              </small>}
            </div>
          </div>}
          <div className="form-row row">
            {!isEdit && <div className="form-group col-md-3 mb-3">
              <label htmlFor="inputNascimento">Data de Nascimento</label>
              <input
                type="date"
                className="form-control"
                id="inputNascimento"
                placeholder="Data de nascimento"
                required
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </div>}
            <div className={`form-group ${isEdit ? "col-md-4" : "col-md-3"} mb-3`}>
              <label htmlFor="inputTelefone">Telefone</label>
              <input
                type="tel"
                className="form-control"
                id="inputTelefone"
                placeholder="Telefone"
                required
                ref={inputTelefoneRef}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>
            <div className={`form-group ${isEdit ? "col-md-4" : "col-md-3"} mb-3`}>
              <label htmlFor="inputCEP">CEP</label>
              <input
                type="text"
                className="form-control"
                id="inputCEP"
                placeholder="CEP"
                maxLength={9}
                required
                ref={inputCEPRef}
                value={CEP}
                onChange={(e) => setCEP(e.target.value)}
              />
            </div>
            <div className={`form-group ${isEdit ? "col-md-4" : "col-md-3"} mb-3`}>
              <label htmlFor="inputNumero">Número</label>
              <input
                type="text"
                className="form-control"
                id="inputNumero"
                placeholder="Número"
                required
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex gap-2 mt-4 justify-content-end">
            <button onClick={() => navigate("/admin/users")} className="btn btn-danger">
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

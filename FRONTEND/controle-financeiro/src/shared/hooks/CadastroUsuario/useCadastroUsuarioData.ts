import { useState } from "react";
import { toast } from 'react-toastify';
import api from "../../services/axios";
import { useNavigate } from "react-router-dom";
import { useFotoUsuarioUpload } from "../FotoUsuario/useFotoUsuarioUpload";


export const useCadastroUsuarioData = (usuarioId: number | string) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaRepetida, setSenhaRepetida] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const { uploadFoto } = useFotoUsuarioUpload();


  // Cadastrar novo usuário
const handleCadastrar = async (fotoFile?: File) => {
    setErro('');

    if (!nome || !email || !senha || !senhaRepetida) {
      setErro("Preencha todos os campos.");
      toast.error("Preencha todos os campos.");
      return;
    }

    if (senha !== senhaRepetida) {
      setErro("As senhas não coincidem.");
      toast.error("As senhas não coincidem.");
      return;
    }

    try {
      const payload = { nome, email, senha };
      const response = await api.post("/usuario", payload);

      const usuarioId = response.data.id; // garante que pega o ID novo

      // Se existir foto, envia
      if (fotoFile) {
        await uploadFoto(usuarioId, fotoFile);
      }

      toast.success("Usuário cadastrado com sucesso!");
      setNome('');
      setEmail('');
      setSenha('');
      setSenhaRepetida('');
      navigate('/tela-login');
      return usuarioId;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      toast.error("Erro ao cadastrar usuário");
    }
  };


  // Editar usuário existente
  const handleEditar = async () => {
    const payload = { nome, email, senha };

    try {
      console.log("Editando usuário: ", payload);
      const response = await api.put(`/usuario/${usuarioId}`, payload);
      console.log(response.data);
      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao editar usuário: ", error);
      toast.error("Erro ao editar usuário");
    }
  };

  // Deletar usuário
  const handleDelete = async () => {
    try {
      const response = await api.delete(`/usuario/${usuarioId}`);
      console.log(response.data);
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário: ", error);
      toast.error("Erro ao deletar usuário");
    }
  };

  return {
    nome,
    email,
    senha,
    senhaRepetida,
    erro,
    setNome,
    setEmail,
    setSenha,
    setSenhaRepetida,
    setErro,
    handleCadastrar,
    handleDelete,
    handleEditar,
  };
};

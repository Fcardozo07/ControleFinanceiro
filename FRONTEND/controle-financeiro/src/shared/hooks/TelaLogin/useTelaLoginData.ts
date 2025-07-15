
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppThemeContext } from "../../contexts";
import { useFotoUsuarioContext } from "../../contexts/FotoUsuarioContext";
import api from "../../services/axios";
import { toast } from "react-toastify";

export const useTelaLoginData = () => {

  const navigate = useNavigate();



  const menuItems = ["Início", "Sobre", "Contato"];

  const [email, setEmail] = useState(""); 
  const [usuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const {toggleTheme} = useAppThemeContext();
  const { reloadFoto } = useFotoUsuarioContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
 const [imagem, setImagem] = useState<File | null>(null);


const toggleDrawer = (open: boolean) => () => {
  setDrawerOpen(open);
};

    const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
   
   
    try {
      const response = await api.post('/auth/login',{email, senha});
      const data = response.data;
      console.log(data)
        if (data.message === "Login realizado com sucesso") {
          toast.success("Login realizado com sucesso!")
          sessionStorage.setItem("id", data.id);
          sessionStorage.setItem("nome", data.nome);
          sessionStorage.setItem("email", data.email);
          await reloadFoto(); // 👈 carrega a foto certa do usuário logado
          navigate('/pagina-inicial');
        }else{
          setErro("Email ou senha incorretos")
        }
      
    } catch (error: any) {
      setErro("Email ou senha incorretos")
       toast.error("erro ao fazer login", error.message )

    }
    
  }

  return{
  menuItems,
  email,
  setEmail,
  usuario,
  senha,
  setSenha,
  erro,
  setErro,
  toggleTheme,
  handleLogin,
  drawerOpen,
  toggleDrawer,
  imagem,
  setImagem
  }

}
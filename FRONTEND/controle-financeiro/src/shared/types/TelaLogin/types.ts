export interface ITelaLoginAppbarProps{
   toggleDrawer: (boolean: boolean) => () => void;
   drawerOpen: boolean;
   menuItems: string[];
   imagem: File| null;
   setImagem: React.Dispatch<React.SetStateAction<File | null>>;
   
}


export interface IFormLoginProps{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    senha: string;
    setSenha: React.Dispatch<React.SetStateAction<string>>;
    erro: string;
    setErro: React.Dispatch<React.SetStateAction<string>>;
    handleLogin: (e: React.FormEvent) => void;
}




export interface ICadastroUsuarioAppbarProps{
   toggleDrawer: (boolean: boolean) => () => void;
   drawerOpen: boolean;
   menuItems: string[];
   imagem: File | null;
   setImagem: React.Dispatch<React.SetStateAction<File | null>>;
   
}

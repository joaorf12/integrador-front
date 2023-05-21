import {Permissao} from "./permissao";

export class Usuario{
  id!: number;
  nome!: string | undefined
  email!: string | undefined;
  senha!: string | undefined;
  permissao!: Permissao;
  ativo!: boolean | undefined;
  token!: boolean | undefined;
  foto!: string;
}

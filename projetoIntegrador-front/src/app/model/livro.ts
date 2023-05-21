import {Usuario} from "./usuario";

export class Livro{


  id!: number;
  nome!: string | any;
  autor!: string;
  num_pag?: number | any;
  ano_publi?: number | any;
  genero?: string | any;
  interesse!: boolean;
  capa?: string;
  pdf?: string;
  imagem?: string;
  num_download?: number;
  avaliacao?: number;
  usuario!: Usuario;
  status!: string;
  dt_ult_atualizacao!: Date;
  old_capa!: string | undefined;
  old_pdf!: string  | undefined;



  /*constructor(id?: number, nome?: string, autor?: string, ano_publi?: string, num_pag?: string, genero?: string) {
    this.id = id;
    this.nome = nome;
    this.autor = autor;
    this.num_pag = num_pag;
    this.ano_publi = ano_publi;
    this.genero = genero;
  }*/
}

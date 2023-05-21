import {Livro} from "./livro";
import {Usuario} from "./usuario";

export class Comentario{
  id?: number;
  livro?: Livro;
  usuario?: Usuario;
  texto?: string;
  dt_hr?: Date;
}

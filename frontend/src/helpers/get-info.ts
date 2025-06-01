import { tiposFinanca } from '../models/TiposFinanca';

export const getTipoInfo = (tipo: string) => {
    return tiposFinanca.find(t => t.value === tipo) || tiposFinanca[5];
};

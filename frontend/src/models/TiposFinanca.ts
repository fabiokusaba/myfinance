import { Briefcase, Receipt, Zap, Phone, Home, MoreHorizontal } from 'lucide-react';

export const tiposFinanca = [
    { value: 'SALARIO', label: 'Salário', icon: Briefcase, color: 'text-green-600' },
    { value: 'AGUA', label: 'Água', icon: Receipt, color: 'text-blue-600' },
    { value: 'LUZ', label: 'Luz', icon: Zap, color: 'text-yellow-600' },
    { value: 'TELEFONE', label: 'Telefone', icon: Phone, color: 'text-purple-600' },
    { value: 'ALUGUEL', label: 'Aluguel', icon: Home, color: 'text-red-600' },
    { value: 'OUTROS', label: 'Outros', icon: MoreHorizontal, color: 'text-gray-600' }
];
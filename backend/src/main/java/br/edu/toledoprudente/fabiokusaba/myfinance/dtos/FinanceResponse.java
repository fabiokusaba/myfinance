package br.edu.toledoprudente.fabiokusaba.myfinance.dtos;

import br.edu.toledoprudente.fabiokusaba.myfinance.enums.FinanceType;

import java.math.BigDecimal;

public record FinanceResponse(
        Long id,
        String nome,
        String descricao,
        BigDecimal valor,
        FinanceType tipo
) {
}

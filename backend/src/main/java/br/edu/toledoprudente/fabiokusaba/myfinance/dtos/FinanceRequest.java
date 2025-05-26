package br.edu.toledoprudente.fabiokusaba.myfinance.dtos;

import br.edu.toledoprudente.fabiokusaba.myfinance.enums.FinanceType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Schema(name = "FinanceDTO")
public record FinanceRequest(
        @NotBlank(message = "O campo 'nome' deve ser preenchido.")
        @Size(min = 3, max = 100, message = "O campo 'nome' deve ter entre 3 e 100 caracteres.")
        @Schema(name = "nome")
        String nome,

        @Size(min = 3, max = 255, message = "O campo 'descricao' deve ter entre 3 e 255 caracteres.")
        @Schema(name = "descricao")
        String descricao,

        @NotNull(message = "O campo 'valor' deve ser preenchido.")
        @Schema(name = "valor")
        BigDecimal valor,

        @NotNull(message = "O campo 'tipo' deve ser preenchido.")
        @Schema(name = "tipo")
        FinanceType tipo
) {
}

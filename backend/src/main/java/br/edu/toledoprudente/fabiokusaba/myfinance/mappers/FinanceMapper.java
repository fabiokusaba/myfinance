package br.edu.toledoprudente.fabiokusaba.myfinance.mappers;

import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceRequest;
import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceResponse;
import br.edu.toledoprudente.fabiokusaba.myfinance.models.Finance;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface FinanceMapper {

    Finance toEntity(FinanceRequest dto);
    FinanceResponse toResponse(Finance entity);
}

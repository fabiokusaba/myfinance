package br.edu.toledoprudente.fabiokusaba.myfinance.services;

import br.edu.toledoprudente.fabiokusaba.myfinance.exceptions.FinanceNotFoundException;
import br.edu.toledoprudente.fabiokusaba.myfinance.models.Finance;
import br.edu.toledoprudente.fabiokusaba.myfinance.repositories.FinanceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FinanceService {

    private final FinanceRepository financeRepository;

    public FinanceService(FinanceRepository financeRepository) {
        this.financeRepository = financeRepository;
    }

    public Finance save(Finance finance) {
        return financeRepository.save(finance);
    }

    public List<Finance> findAll() {
        return financeRepository.findAll();
    }

    public Finance findById(Long id) {
        return financeRepository.findById(id)
                .orElseThrow(() -> new FinanceNotFoundException("Finance not found"));
    }

    public Finance update(Long id, Finance finance) {
        var financeToUpdate = findById(id);

        financeToUpdate.setNome(finance.getNome());
        financeToUpdate.setDescricao(finance.getDescricao());
        financeToUpdate.setValor(finance.getValor());
        financeToUpdate.setTipo(finance.getTipo());

        return save(financeToUpdate);
    }

    public void delete(Long id) {
        var finance = findById(id);
        financeRepository.delete(finance);
    }
}

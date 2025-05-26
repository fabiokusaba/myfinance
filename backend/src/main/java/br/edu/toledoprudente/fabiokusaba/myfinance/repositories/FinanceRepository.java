package br.edu.toledoprudente.fabiokusaba.myfinance.repositories;

import br.edu.toledoprudente.fabiokusaba.myfinance.models.Finance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRepository extends JpaRepository<Finance, Long> {
}

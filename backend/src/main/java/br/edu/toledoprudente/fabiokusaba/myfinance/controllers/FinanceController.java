package br.edu.toledoprudente.fabiokusaba.myfinance.controllers;

import br.edu.toledoprudente.fabiokusaba.myfinance.configs.FinanceOpenAPI;
import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceRequest;
import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceResponse;
import br.edu.toledoprudente.fabiokusaba.myfinance.mappers.FinanceMapper;
import br.edu.toledoprudente.fabiokusaba.myfinance.services.FinanceService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/finances")
public class FinanceController implements FinanceOpenAPI {

    private final FinanceService financeService;
    private final FinanceMapper financeMapper;

    public FinanceController(FinanceService financeService, FinanceMapper financeMapper) {
        this.financeService = financeService;
        this.financeMapper = financeMapper;
    }

    public ResponseEntity<FinanceResponse> save(@RequestBody @Valid FinanceRequest dto) {
        var newFinance = financeService.save(financeMapper.toEntity(dto));
        return ResponseEntity.status(HttpStatus.CREATED).body(financeMapper.toResponse(newFinance));
    }

    public ResponseEntity<List<FinanceResponse>> findAll() {
        var finances = financeService.findAll().stream().map(financeMapper::toResponse).toList();
        return ResponseEntity.ok(finances);
    }

    public ResponseEntity<FinanceResponse> findById(@PathVariable Long id) {
        var finance = financeService.findById(id);
        return ResponseEntity.ok(financeMapper.toResponse(finance));
    }

    public ResponseEntity<FinanceResponse> update(@PathVariable Long id, @RequestBody @Valid FinanceRequest dto) {
        var updatedFinance = financeService.update(id, financeMapper.toEntity(dto));
        return ResponseEntity.ok(financeMapper.toResponse(updatedFinance));
    }

    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        financeService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Finance deleted successfully!"));
    }
}

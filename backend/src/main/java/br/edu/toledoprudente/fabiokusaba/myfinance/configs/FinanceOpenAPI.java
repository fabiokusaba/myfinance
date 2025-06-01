package br.edu.toledoprudente.fabiokusaba.myfinance.configs;

import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceRequest;
import br.edu.toledoprudente.fabiokusaba.myfinance.dtos.FinanceResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Tag(name = "Finance", description = "API para gerenciamento de financas pessoais")
public interface FinanceOpenAPI {

    @PostMapping
    @Operation(summary = "Cadastrar uma nova finança")
    @ApiResponse(responseCode = "201", description = "Finança cadastrada com sucesso")
    @ApiResponse(responseCode = "400", description = "Erro de validação")
    @ApiResponse(responseCode = "500", description = "Erro interno de servidor")
    ResponseEntity<FinanceResponse> save(@RequestBody FinanceRequest dto);

    @GetMapping
    @Operation(summary = "Listar todas as finanças")
    @ApiResponse(responseCode = "200", description = "Finanças listadas com sucesso")
    @ApiResponse(responseCode = "500", description = "Erro interno de servidor")
    ResponseEntity<List<FinanceResponse>> findAll();

    @GetMapping("/{id}")
    @Operation(summary = "Buscar uma finança por ID")
    @ApiResponse(responseCode = "200", description = "Finança encontrada com sucesso")
    @ApiResponse(responseCode = "404", description = "Finança não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno de servidor")
    ResponseEntity<FinanceResponse> findById(@PathVariable Long id);

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar finança")
    @ApiResponse(responseCode = "200", description = "Finança atualizada com sucesso")
    @ApiResponse(responseCode = "400", description = "Erro de validação")
    @ApiResponse(responseCode = "500", description = "Erro interno de servidor")
    ResponseEntity<FinanceResponse> update(@PathVariable Long id, @RequestBody FinanceRequest dto);

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar uma finança por ID")
    @ApiResponse(responseCode = "204", description = "Finança deletada com sucesso")
    @ApiResponse(responseCode = "404", description = "Finança não encontrada")
    @ApiResponse(responseCode = "500", description = "Erro interno de servidor")
    ResponseEntity<Map<String, String>> delete(@PathVariable Long id);
}

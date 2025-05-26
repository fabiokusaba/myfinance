package br.edu.toledoprudente.fabiokusaba.myfinance.controllers;

import br.edu.toledoprudente.fabiokusaba.myfinance.exceptions.FinanceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(FinanceNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleFinanceNotFoundException(FinanceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        var fieldErrors = ex.getFieldErrors();

        var errors = fieldErrors.stream()
                .map(error -> Map.of(
                        "field", error.getField(),
                        "message", error.getDefaultMessage())
                ).toList();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("errors", errors));
    }
}

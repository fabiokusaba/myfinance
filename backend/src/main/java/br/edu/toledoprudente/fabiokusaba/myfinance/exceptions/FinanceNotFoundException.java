package br.edu.toledoprudente.fabiokusaba.myfinance.exceptions;

public class FinanceNotFoundException extends RuntimeException {
    public FinanceNotFoundException(String message) {
        super(message);
    }
}

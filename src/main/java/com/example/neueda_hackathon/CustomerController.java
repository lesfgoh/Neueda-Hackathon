package com.example.neueda_hackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<CustomerData> getAllCustomers() throws IOException {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{customerId}")
    public Optional<CustomerData> getCustomerById(@PathVariable String customerId) throws IOException {
        return customerService.getCustomerById(customerId);
    }

    @PostMapping
    public CustomerData createCustomer(@RequestBody CustomerData customerData) throws IOException {
        return customerService.createCustomer(customerData);
    }

    @PutMapping("/{customerId}")
    public Optional<CustomerData> updateCustomer(@PathVariable String customerId, @RequestBody CustomerData updatedCustomerData) throws IOException {
        return customerService.updateCustomer(customerId, updatedCustomerData);
    }

    @DeleteMapping("/{customerId}")
    public boolean deleteCustomer(@PathVariable String customerId) throws IOException {
        return customerService.deleteCustomer(customerId);
    }
}

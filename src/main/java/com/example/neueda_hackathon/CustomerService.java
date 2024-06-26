package com.example.neueda_hackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository CustomerRepository;

    public List<CustomerData> getAllCustomers() throws IOException {
        return CustomerRepository.findAll();
    }

    public Optional<CustomerData> getCustomerById(String customerId) throws IOException {
        return CustomerRepository.findAll().stream()
                .filter(customer -> customer.getCustomerId().equals(customerId))
                .findFirst();
    }

    public CustomerData createCustomer(CustomerData customerData) throws IOException {
        List<CustomerData> customers = CustomerRepository.findAll();
        customers.add(customerData);
        CustomerRepository.saveAll(customers);
        return customerData;
    }

    public Optional<CustomerData> updateCustomer(String customerId, CustomerData updatedCustomerData) throws IOException {
        List<CustomerData> customers = CustomerRepository.findAll();
        for (CustomerData customer : customers) {
            if (customer.getCustomerId().equals(customerId)) {
                customer.setName(updatedCustomerData.getName());
                customer.setStatus(updatedCustomerData.getStatus());
                customer.setAddress(updatedCustomerData.getAddress());
                customer.setEmail(updatedCustomerData.getEmail());
                customer.setAge(updatedCustomerData.getAge());
                customer.setPhoneNumber(updatedCustomerData.getPhoneNumber());
                CustomerRepository.saveAll(customers);
                return Optional.of(customer);
            }
        }
        return Optional.empty();
    }

    public boolean deleteCustomer(String customerId) throws IOException {
        List<CustomerData> customers = CustomerRepository.findAll();
        boolean removed = customers.removeIf(customer -> customer.getCustomerId().equals(customerId));
        if (removed) {
            CustomerRepository.saveAll(customers);
        }
        return removed;
    }
}

package com.example.neueda_hackathon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private JsonFileUtil jsonFileUtil;

    public List<CustomerData> getAllCustomers() throws IOException {
        return jsonFileUtil.readCustomers();
    }

    public Optional<CustomerData> getCustomerById(String customerId) throws IOException {
        return jsonFileUtil.readCustomers().stream()
                .filter(customer -> customer.getCustomerId().equals(customerId))
                .findFirst();
    }

    public CustomerData createCustomer(CustomerData customerData) throws IOException {
        List<CustomerData> customers = jsonFileUtil.readCustomers();
        customers.add(customerData);
        jsonFileUtil.writeCustomers(customers);
        return customerData;
    }

    public Optional<CustomerData> updateCustomer(String customerId, CustomerData updatedCustomerData) throws IOException {
        List<CustomerData> customers = jsonFileUtil.readCustomers();
        for (CustomerData customer : customers) {
            if (customer.getCustomerId().equals(customerId)) {
                customer.setName(updatedCustomerData.getName());
                customer.setStatus(updatedCustomerData.getStatus());
                customer.setAddress(updatedCustomerData.getAddress());
                customer.setEmail(updatedCustomerData.getEmail());
                customer.setAge(updatedCustomerData.getAge());
                customer.setPhoneNumber(updatedCustomerData.getPhoneNumber());
                jsonFileUtil.writeCustomers(customers);
                return Optional.of(customer);
            }
        }
        return Optional.empty();
    }

    public boolean deleteCustomer(String customerId) throws IOException {
        List<CustomerData> customers = jsonFileUtil.readCustomers();
        boolean removed = customers.removeIf(customer -> customer.getCustomerId().equals(customerId));
        if (removed) {
            jsonFileUtil.writeCustomers(customers);
        }
        return removed;
    }
}

package com.example.neueda_hackathon;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends MongoRepository<CustomerData, String> {
    List<CustomerData> findByName(String lastName);
    CustomerData findByEmail(String email);
}

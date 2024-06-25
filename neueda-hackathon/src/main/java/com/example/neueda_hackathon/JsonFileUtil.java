package com.example.neueda_hackathon;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Component
public class JsonFileUtil {

    @Value("${json.file.path}")
    private String filePath;

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public List<CustomerData> readCustomers() throws IOException {
        File file = new File(filePath);
        if (!file.exists()) {
            Files.createDirectories(Paths.get(filePath).getParent());
            file.createNewFile();
            return List.of();
        }
        return objectMapper.readValue(file, new TypeReference<List<CustomerData>>() {});
    }

    public void writeCustomers(List<CustomerData> customers) throws IOException {
        File file = new File(filePath);
        objectMapper.writeValue(file, customers);
    }
}

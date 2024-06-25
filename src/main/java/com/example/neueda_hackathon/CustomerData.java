package com.example.neueda_hackathon;

import java.util.Objects;

public class CustomerData {
    private String customerId;
    private String name;
    private String status;
    private String address;
    private String email;
    private int age;
    private String phoneNumber;

    public CustomerData() {
    }

    public CustomerData(String customerId, String name, String status, String address, String email, int age, String phoneNumber) {
        this.customerId = customerId;
        this.name = name;
        this.status = status;
        this.address = address;
        this.email = email;
        this.age = age;
        this.phoneNumber = phoneNumber;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerData that = (CustomerData) o;
        return age == that.age &&
                Objects.equals(customerId, that.customerId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(status, that.status) &&
                Objects.equals(address, that.address) &&
                Objects.equals(email, that.email) &&
                Objects.equals(phoneNumber, that.phoneNumber);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId, name, status, address, email, age, phoneNumber);
    }

    @Override
    public String toString() {
        return "CustomerData{" +
                "customerId='" + customerId + '\'' +
                ", name='" + name + '\'' +
                ", status='" + status + '\'' +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", age=" + age +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}

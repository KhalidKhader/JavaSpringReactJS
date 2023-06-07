package com.fullstack.fullstackbackend.repository;

import com.fullstack.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {



}

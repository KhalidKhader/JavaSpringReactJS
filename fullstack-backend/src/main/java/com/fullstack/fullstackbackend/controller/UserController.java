package com.fullstack.fullstackbackend.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.fullstack.fullstackbackend.exception.UserNotFoundException;
import com.fullstack.fullstackbackend.model.User;
import com.fullstack.fullstackbackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id).orElseThrow(()-> new UserNotFoundException(id));
    }

    @PutMapping("/user/{id}")
    User UpdateUser(@RequestBody User newUser,@PathVariable Long id){
        return userRepository.findById(id).map(user -> {
            user.setName(newUser.getName());
            user.setEmail(newUser.getEmail());
            user.setMajor(newUser.getMajor());
            user.setPhone(newUser.getPhone());
            user.setAge(newUser.getAge());
            return userRepository.save(user);
        }).orElseThrow(()-> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    String deleteUserById(@PathVariable Long id){
        if (!userRepository.existsById(id))
            new UserNotFoundException(id);
        userRepository.deleteById(id);
        return "User "+id+" Deleted !";
    }

}

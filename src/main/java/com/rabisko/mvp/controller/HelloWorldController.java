package com.rabisko.mvp.controller;

import com.rabisko.mvp.service.HelloWorldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hello-world")
public class HelloWorldController {

    @Autowired
    private HelloWorldService helloWorldService;

    @GetMapping
    public String helloWorld(String name){
        return helloWorldService.helloWorld("Bruno");
    }

    @PostMapping("")
    public String helloWorldPost(@RequestBody String body){
        return "Hello World Post";
    }
}

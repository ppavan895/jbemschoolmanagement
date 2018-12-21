package com.school.management.cucumber.stepdefs;

import com.school.management.JbemSchoolManagementApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JbemSchoolManagementApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}

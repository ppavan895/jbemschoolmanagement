package com.school.management.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ClassName.
 */
@Entity
@Table(name = "class_name")
public class ClassName implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "class_number")
    private Long classNumber;

    @ManyToOne
    @JsonIgnoreProperties("classTeachers")
    private Teacher teacher;

    @OneToMany(mappedBy = "className")
    private Set<Section> sections = new HashSet<>();
    @OneToMany(mappedBy = "className")
    private Set<Student> studentIds = new HashSet<>();
    @OneToMany(mappedBy = "className")
    private Set<Subject> subjects = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public ClassName name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getClassNumber() {
        return classNumber;
    }

    public ClassName classNumber(Long classNumber) {
        this.classNumber = classNumber;
        return this;
    }

    public void setClassNumber(Long classNumber) {
        this.classNumber = classNumber;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public ClassName teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Set<Section> getSections() {
        return sections;
    }

    public ClassName sections(Set<Section> sections) {
        this.sections = sections;
        return this;
    }

    public ClassName addSection(Section section) {
        this.sections.add(section);
        section.setClassName(this);
        return this;
    }

    public ClassName removeSection(Section section) {
        this.sections.remove(section);
        section.setClassName(null);
        return this;
    }

    public void setSections(Set<Section> sections) {
        this.sections = sections;
    }

    public Set<Student> getStudentIds() {
        return studentIds;
    }

    public ClassName studentIds(Set<Student> students) {
        this.studentIds = students;
        return this;
    }

    public ClassName addStudentId(Student student) {
        this.studentIds.add(student);
        student.setClassName(this);
        return this;
    }

    public ClassName removeStudentId(Student student) {
        this.studentIds.remove(student);
        student.setClassName(null);
        return this;
    }

    public void setStudentIds(Set<Student> students) {
        this.studentIds = students;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public ClassName subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public ClassName addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.setClassName(this);
        return this;
    }

    public ClassName removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.setClassName(null);
        return this;
    }

    public void setSubjects(Set<Subject> subjects) {
        this.subjects = subjects;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ClassName className = (ClassName) o;
        if (className.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), className.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassName{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", classNumber=" + getClassNumber() +
            "}";
    }
}

package com.school.management.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Markes.
 */
@Entity
@Table(name = "markes")
public class Markes implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "markes")
    private Long markes;

    @ManyToOne
    @JsonIgnoreProperties("markes")
    private Student student;

    @OneToMany(mappedBy = "markes")
    private Set<Subject> subjects = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMarkes() {
        return markes;
    }

    public Markes markes(Long markes) {
        this.markes = markes;
        return this;
    }

    public void setMarkes(Long markes) {
        this.markes = markes;
    }

    public Student getStudent() {
        return student;
    }

    public Markes student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Set<Subject> getSubjects() {
        return subjects;
    }

    public Markes subjects(Set<Subject> subjects) {
        this.subjects = subjects;
        return this;
    }

    public Markes addSubject(Subject subject) {
        this.subjects.add(subject);
        subject.setMarkes(this);
        return this;
    }

    public Markes removeSubject(Subject subject) {
        this.subjects.remove(subject);
        subject.setMarkes(null);
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
        Markes markes = (Markes) o;
        if (markes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), markes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Markes{" +
            "id=" + getId() +
            ", markes=" + getMarkes() +
            "}";
    }
}

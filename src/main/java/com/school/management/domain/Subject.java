package com.school.management.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Subject.
 */
@Entity
@Table(name = "subject")
public class Subject implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "markes")
    private Long markes;

    @ManyToOne
    @JsonIgnoreProperties("subjects")
    private ClassName className;

    @ManyToOne
    @JsonIgnoreProperties("subjects")
    private Markes markes;

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

    public Subject name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getMarkes() {
        return markes;
    }

    public Subject markes(Long markes) {
        this.markes = markes;
        return this;
    }

    public void setMarkes(Long markes) {
        this.markes = markes;
    }

    public ClassName getClassName() {
        return className;
    }

    public Subject className(ClassName className) {
        this.className = className;
        return this;
    }

    public void setClassName(ClassName className) {
        this.className = className;
    }

    public Markes getMarkes() {
        return markes;
    }

    public Subject markes(Markes markes) {
        this.markes = markes;
        return this;
    }

    public void setMarkes(Markes markes) {
        this.markes = markes;
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
        Subject subject = (Subject) o;
        if (subject.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subject.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Subject{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", markes=" + getMarkes() +
            "}";
    }
}

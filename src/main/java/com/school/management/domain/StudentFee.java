package com.school.management.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A StudentFee.
 */
@Entity
@Table(name = "student_fee")
public class StudentFee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total_fee")
    private Long totalFee;

    @Column(name = "fee_paid")
    private Long feePaid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTotalFee() {
        return totalFee;
    }

    public StudentFee totalFee(Long totalFee) {
        this.totalFee = totalFee;
        return this;
    }

    public void setTotalFee(Long totalFee) {
        this.totalFee = totalFee;
    }

    public Long getFeePaid() {
        return feePaid;
    }

    public StudentFee feePaid(Long feePaid) {
        this.feePaid = feePaid;
        return this;
    }

    public void setFeePaid(Long feePaid) {
        this.feePaid = feePaid;
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
        StudentFee studentFee = (StudentFee) o;
        if (studentFee.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentFee.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentFee{" +
            "id=" + getId() +
            ", totalFee=" + getTotalFee() +
            ", feePaid=" + getFeePaid() +
            "}";
    }
}

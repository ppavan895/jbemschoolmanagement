package com.school.management.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "admission_number")
    private String admissionNumber;

    @Column(name = "phone_number")
    private Long phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "photo_path")
    private String photoPath;

    @OneToOne    @JoinColumn(unique = true)
    private StudentFee fee;

    @OneToMany(mappedBy = "student")
    private Set<Attendence> attendences = new HashSet<>();
    @OneToMany(mappedBy = "student")
    private Set<Markes> markes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("studentIds")
    private ClassName className;

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

    public Student name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdmissionNumber() {
        return admissionNumber;
    }

    public Student admissionNumber(String admissionNumber) {
        this.admissionNumber = admissionNumber;
        return this;
    }

    public void setAdmissionNumber(String admissionNumber) {
        this.admissionNumber = admissionNumber;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public Student phoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public Student address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhotoPath() {
        return photoPath;
    }

    public Student photoPath(String photoPath) {
        this.photoPath = photoPath;
        return this;
    }

    public void setPhotoPath(String photoPath) {
        this.photoPath = photoPath;
    }

    public StudentFee getFee() {
        return fee;
    }

    public Student fee(StudentFee studentFee) {
        this.fee = studentFee;
        return this;
    }

    public void setFee(StudentFee studentFee) {
        this.fee = studentFee;
    }

    public Set<Attendence> getAttendences() {
        return attendences;
    }

    public Student attendences(Set<Attendence> attendences) {
        this.attendences = attendences;
        return this;
    }

    public Student addAttendence(Attendence attendence) {
        this.attendences.add(attendence);
        attendence.setStudent(this);
        return this;
    }

    public Student removeAttendence(Attendence attendence) {
        this.attendences.remove(attendence);
        attendence.setStudent(null);
        return this;
    }

    public void setAttendences(Set<Attendence> attendences) {
        this.attendences = attendences;
    }

    public Set<Markes> getMarkes() {
        return markes;
    }

    public Student markes(Set<Markes> markes) {
        this.markes = markes;
        return this;
    }

    public Student addMarkes(Markes markes) {
        this.markes.add(markes);
        markes.setStudent(this);
        return this;
    }

    public Student removeMarkes(Markes markes) {
        this.markes.remove(markes);
        markes.setStudent(null);
        return this;
    }

    public void setMarkes(Set<Markes> markes) {
        this.markes = markes;
    }

    public ClassName getClassName() {
        return className;
    }

    public Student className(ClassName className) {
        this.className = className;
        return this;
    }

    public void setClassName(ClassName className) {
        this.className = className;
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", admissionNumber='" + getAdmissionNumber() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            ", address='" + getAddress() + "'" +
            ", photoPath='" + getPhotoPath() + "'" +
            "}";
    }
}

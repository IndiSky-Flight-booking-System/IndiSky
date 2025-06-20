package com.sunbeam.entities;

import com.sunbeam.enums.PersonRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "person_role")
    @Enumerated(EnumType.STRING)
    private PersonRole personRole;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;

    private String password;

    @Column(name = "phone_no",unique = true,length = 10)
    private String phoneNo;

    private LocalDate birthDate;

    @CreationTimestamp
    @Column(name = "created_on")
    private Date createdOn;

    @UpdateTimestamp
    @Column(name = "update_on")
    private Date updatedOn;

    public Person(PersonRole ps){
        this.personRole = ps;
    }

}

package com.sunbeam.entities;

import com.sunbeam.enums.PersonRole;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter

public class Admin extends Person{
    public Admin(){
        super(PersonRole.ADMIN);
    }
}

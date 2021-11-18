package com.example.testserver.entity;

import com.example.testserver.entity.template.AbsEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Client  extends AbsEntity {
    private String name;
    private String phoneNumber;
}

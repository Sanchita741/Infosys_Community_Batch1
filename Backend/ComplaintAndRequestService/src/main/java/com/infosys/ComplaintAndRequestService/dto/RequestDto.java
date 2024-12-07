package com.infosys.complaintandrequestservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestDto {
    private String address;
    private String description;
    private String service;
    private String phoneNo;
}
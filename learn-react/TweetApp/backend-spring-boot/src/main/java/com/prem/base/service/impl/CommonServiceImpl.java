package com.prem.base.service.impl;


import com.prem.base.service.CommonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommonServiceImpl implements CommonService {

    @Override
    public String getUniqueID(String prefix) {
        String uuid = UUID.randomUUID().toString()
                .replace("-", "")
                .substring(0, 5); // 5 characters from UUID
        String randomDigits = String.format("%05d", (int) (Math.random() * 100000)); // 5 random digits
        return (String.valueOf(prefix) + uuid + randomDigits).toUpperCase();
    }
}

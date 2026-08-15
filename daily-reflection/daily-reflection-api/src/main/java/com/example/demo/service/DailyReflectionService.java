package com.example.demo.service;

import com.example.demo.entity.DailyReflection;
import com.example.demo.repository.DailyReflectionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DailyReflectionService {

    private final DailyReflectionRepository repository;

    public DailyReflectionService(DailyReflectionRepository repository) {
        this.repository = repository;
    }

    public DailyReflection create(DailyReflection reflection) {
        return repository.save(reflection);
    }

    public DailyReflection getById(String id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reflection not found: " + id));
    }

    public DailyReflection getByDate(LocalDate date) {
        return repository.findByDate(date)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Reflection not found for date: " + date));
    }

    public List<DailyReflection> getAll() {
        return repository.findAll();
    }

    public DailyReflection update(
            String id,
            DailyReflection updatedReflection) {

        DailyReflection existing = getById(id);

        existing.setDate(updatedReflection.getDate());
        existing.setWhatIDidToday(
                updatedReflection.getWhatIDidToday()
        );
        existing.setGoodThingToday(
                updatedReflection.getGoodThingToday()
        );

        return repository.save(existing);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Reflection not found: " + id
            );
        }

        repository.deleteById(id);
    }
}

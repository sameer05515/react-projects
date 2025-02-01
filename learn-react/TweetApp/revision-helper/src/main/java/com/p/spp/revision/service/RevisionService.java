package com.p.spp.revision.service;

import com.p.spp.revision.dto.RevisionRequest;
import com.p.spp.revision.entity.Revision;
import com.p.spp.revision.repository.RevisionRepository;
import com.p.spp.revision.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RevisionService {
    private final RevisionRepository revisionRepository;


    public Revision save(RevisionRequest revisionRequest) {
        Revision revision = Revision.builder()
                .text(revisionRequest.getText())
                .revisionAfter(revisionRequest.getRevisionAfter())
                .createdDate(
                        (revisionRequest.getCreatedDate() == null || revisionRequest.getCreatedDate().trim().isBlank()) ?
                                LocalDate.now() :
                                LocalDate.parse(revisionRequest.getCreatedDate(), Constants.ddMMMyyyyDateFormatter))
                .build();


        revision.setRevisionDates(getRevisionDatesForMonth(revision.getCreatedDate(),revisionRequest.getRevisionAfter(),YearMonth.now()));

        return revisionRepository.save(revision);
    }

    public List<Revision> findAll(){
        return revisionRepository.findAll();
    }

    // Fetch today's due revisions
    public List<Revision> getRevisionsForDate(String targetDate) {

        LocalDate date = targetDate == null ? LocalDate.now() : LocalDate.parse(targetDate, Constants.ddMMMyyyyDateFormatter);
        return revisionRepository.findByRevisionDatesContaining(date);
    }

    public boolean generateRevisionsForMonth(int year, int month){
        List<Revision> revisions = revisionRepository.findAll();

        for(Revision revision:revisions){
            List<LocalDate> revisionDates=getRevisionDatesForMonth(revision.getCreatedDate(),revision.getRevisionAfter(),YearMonth.of(year,month));
            revision.getRevisionDates().addAll(revisionDates);

            revision.setRevisionDates(revision.getRevisionDates().stream().distinct().toList());
            revisionRepository.save(revision);
        }

        return true;
    }

    /**
     * Finds revision dates for a given month based on createdDate and revisionAfter days.
     *
     * @param createdDate The date when revision starts.
     * @param revisionAfter Interval in days between each revision.
     * @param targetMonth Target YearMonth (e.g. YearMonth.of(2025, 9)).
     * @return List of LocalDate revisions in the given month.
     */
    private static List<LocalDate> getRevisionDatesForMonth(
            LocalDate createdDate, int revisionAfter, YearMonth targetMonth) {
        List<LocalDate> revisions = new ArrayList<>();
        LocalDate date = createdDate;

        // Keep generating dates until we pass the end of targetMonth
        LocalDate monthStart = targetMonth.atDay(1);
        LocalDate monthEnd = targetMonth.atEndOfMonth();

        while (!date.isAfter(monthEnd)) {
            if (!date.isBefore(monthStart)) {
                revisions.add(date);
            }
            date = date.plusDays(revisionAfter);
        }

        return revisions;
    }
}

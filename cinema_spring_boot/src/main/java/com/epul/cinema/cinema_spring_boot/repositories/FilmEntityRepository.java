package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.FilmEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilmEntityRepository extends JpaRepository<FilmEntity, Integer> {
    @Query("Select f" +
            " from FilmEntity f" +
            " where  f.filmId= :filmId"
    )
    Object findFilmById(@Param("filmId") short filmId);
}

package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.FilmCategoryEntity;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface FilmCategoryEntityRepository extends JpaRepository<FilmCategoryEntity, Integer> {
    @Query(" Select fc " +
            " from FilmCategoryEntity fc "+
            " where fc.filmId=:filmId"
    )
    List<FilmCategoryEntity> getFilmCategoriesByFilmId(@Param("filmId") short filmId);

    @Query(" Select fc " +
            " from FilmCategoryEntity fc "+
            " where fc.categoryId=:categoryId"
    )
    List<FilmCategoryEntity> getFilmCategoriesByCategoryId(@Param("categoryId") Byte categoryId);

    @Transactional
    @Modifying
    @Query(" DELETE from FilmCategoryEntity fc  "+
            " where fc.filmId=:filmId"
    )
    void deleteByFilmId(@Param("filmId") Short filmId);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends FilmCategoryEntity> S save(S s);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends FilmCategoryEntity> List<S> saveAll(Iterable<S> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void delete(FilmCategoryEntity user);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll(Iterable<? extends FilmCategoryEntity> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll();
}

package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.FilmEntity;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FilmEntityRepository extends JpaRepository<FilmEntity, Short> {
    @Query("Select f" +
            " from FilmEntity f" +
            " where  f.filmId= :filmId"
    )
    Object findFilmById(@Param("filmId") short filmId);

    @Query("Select f, c,a" +
            " from CategoryEntity c " +
            "left join FilmCategoryEntity fc ON c.categoryId = fc.categoryId " +
            "left join FilmEntity f ON fc.filmId = f.filmId" +
            " join FilmActorEntity fa ON f.filmId = fa.filmId " +
            " JOIN ActorEntity a ON fa.actorId = a.actorId " +
            "group by f.filmId"

    )
    List<Object> findComplexFilmById(@Param("filmId") short filmId);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends FilmEntity> S save(S s);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends FilmEntity> List<S> saveAll(Iterable<S> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void delete(FilmEntity user);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll(Iterable<? extends FilmEntity> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll();
}

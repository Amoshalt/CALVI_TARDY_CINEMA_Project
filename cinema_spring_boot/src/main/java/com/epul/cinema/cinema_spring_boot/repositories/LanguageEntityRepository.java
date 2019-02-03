package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.LanguageEntity;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LanguageEntityRepository extends JpaRepository<LanguageEntity, Byte> {
    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends LanguageEntity> S save(S s);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends LanguageEntity> List<S> saveAll(Iterable<S> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void delete(LanguageEntity user);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll(Iterable<? extends LanguageEntity> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll();
}

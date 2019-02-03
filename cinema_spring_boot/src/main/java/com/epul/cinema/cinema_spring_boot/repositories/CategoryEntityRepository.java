package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.CategoryEntity;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryEntityRepository extends JpaRepository<CategoryEntity, Byte> {
    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends CategoryEntity> S save(S s);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends CategoryEntity> List<S> saveAll(Iterable<S> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void delete(CategoryEntity user);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll(Iterable<? extends CategoryEntity> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll();
}

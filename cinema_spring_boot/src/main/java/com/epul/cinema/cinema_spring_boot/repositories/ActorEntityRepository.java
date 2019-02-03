package com.epul.cinema.cinema_spring_boot.repositories;

import com.epul.cinema.cinema_spring_boot.domains.ActorEntity;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActorEntityRepository extends JpaRepository<ActorEntity, Short> {
    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends ActorEntity> S save(S s);

    @Override
    @CacheEvict(value="list", allEntries=true)
    <S extends ActorEntity> List<S> saveAll(Iterable<S> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void delete(ActorEntity user);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll(Iterable<? extends ActorEntity> iterable);

    @Override
    @CacheEvict(value="list", allEntries=true)
    void deleteAll();
}

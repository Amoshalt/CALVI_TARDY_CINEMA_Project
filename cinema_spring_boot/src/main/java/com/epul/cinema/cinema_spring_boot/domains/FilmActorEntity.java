package com.epul.cinema.cinema_spring_boot.domains;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "film_actor", schema = "cinema", catalog = "")
@IdClass(FilmActorEntityPK.class)
public class FilmActorEntity {
    private Short actorId;
    private Short filmId;
    private Timestamp lastUpdate = new Timestamp(System.currentTimeMillis());
    private ActorEntity actorByActorId;
    private FilmEntity filmByFilmId;

    @Id
    @Column(name = "actor_id", nullable = false)
    public Short getActorId() {
        return actorId;
    }

    public void setActorId(Short actorId) {
        this.actorId = actorId;
    }

    @Id
    @Column(name = "film_id", nullable = false)
    public Short getFilmId() {
        return filmId;
    }

    public void setFilmId(Short filmId) {
        this.filmId = filmId;
    }

    @Basic
    @Column(name = "last_update", nullable = false)
    public Timestamp getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Timestamp lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FilmActorEntity that = (FilmActorEntity) o;
        return Objects.equals(actorId, that.actorId) &&
                Objects.equals(filmId, that.filmId) &&
                Objects.equals(lastUpdate, that.lastUpdate);
    }

    @Override
    public int hashCode() {

        return Objects.hash(actorId, filmId, lastUpdate);
    }

    @ManyToOne
    @JoinColumn(name = "actor_id", referencedColumnName = "actor_id", nullable = false, insertable = false, updatable = false)
    public ActorEntity getActorByActorId() {
        return actorByActorId;
    }

    public void setActorByActorId(ActorEntity actorByActorId) {
        this.actorByActorId = actorByActorId;
    }

    @ManyToOne
    @JoinColumn(name = "film_id", referencedColumnName = "film_id", nullable = false, insertable = false, updatable = false)
    public FilmEntity getFilmByFilmId() {
        return filmByFilmId;
    }

    public void setFilmByFilmId(FilmEntity filmByFilmId) {
        this.filmByFilmId = filmByFilmId;
    }
}

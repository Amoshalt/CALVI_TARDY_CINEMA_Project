package com.epul.cinema.cinema_spring_boot.domains;

import java.sql.Timestamp;

public class Language {

    private Byte languageId;
    private String name;
    private Timestamp last_update = new Timestamp(System.currentTimeMillis());

    public Language(Byte languageId, String name, Timestamp last_update) {
        this.languageId = languageId;
        this.name = name;
        this.last_update = last_update;
    }

    public Language() {
        this.name = "";
        this.languageId = 0;
        this.last_update = new Timestamp(System.currentTimeMillis());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Byte getLanguageId() {
        return languageId;
    }

    public void setLanguageId(Byte languageId) {
        this.languageId = languageId;
    }

    public Timestamp getLast_update() {
        return last_update;
    }

    public void setLast_update(Timestamp last_update) {
        this.last_update = last_update;
    }
}

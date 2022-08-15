package com.dejssa.radioserver.storage.requests;

import com.dejssa.radioserver.storage.domain.StationInfo;

import java.util.UUID;

public class StationRequest {
    public String URL;
    public String Title;

    public StationRequest(String URL, String title) {
        this.URL = URL;
        this.Title = title;
    }

    public StationInfo toDomain() {
        return new StationInfo(
                UUID.randomUUID().toString(),
                this.URL,
                this.Title
        );
    }
}

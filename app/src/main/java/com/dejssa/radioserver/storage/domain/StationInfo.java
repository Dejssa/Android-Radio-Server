package com.dejssa.radioserver.storage.domain;

import com.dejssa.radioserver.storage.responses.StationInfoResponse;

public class StationInfo {
    public String UUID;
    public String URL;
    public String Title;

    public StationInfo() {
    }

    public StationInfo(String UUID, String URL, String title) {
        this.UUID = UUID;
        this.URL = URL;
        this.Title = title;
    }

    public StationInfoResponse toResponse() {
        return new StationInfoResponse(
                this.UUID,
                this.URL,
                this.Title
        );
    }
}

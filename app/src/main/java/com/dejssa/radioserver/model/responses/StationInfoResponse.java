package com.dejssa.radioserver.model.responses;

public class StationInfoResponse {
    public String UUID;
    public String URL;
    public String Title;

    public StationInfoResponse(String UUID, String URL, String Title) {
        this.UUID = UUID;
        this.URL = URL;
        this.Title = Title;
    }
}

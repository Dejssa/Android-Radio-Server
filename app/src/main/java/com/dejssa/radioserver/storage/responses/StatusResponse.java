package com.dejssa.radioserver.storage.responses;

import com.dejssa.radioserver.storage.domain.StationInfo;

import java.util.ArrayList;

public class StatusResponse {
    public int Volume;
    public StationInfoResponse StationInfo;
    public ArrayList<StationInfo> Stations;

    public StatusResponse(int volume, StationInfoResponse stationInfo, ArrayList<StationInfo> stations) {
        Volume = volume;
        StationInfo = stationInfo;
        Stations = stations;
    }
}

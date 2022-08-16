package com.dejssa.radioserver.storage.responses;

import com.dejssa.radioserver.storage.domain.StationInfo;

import java.util.ArrayList;

public class StatusResponse {
    public int Volume;
    public StationInfoResponse StationInfo;
    public ArrayList<StationInfo> Stations;
    public Boolean IsPlaying;

    public StatusResponse(int volume, StationInfoResponse stationInfo, ArrayList<StationInfo> stations, Boolean isPlaying) {
        Volume = volume;
        StationInfo = stationInfo;
        Stations = stations;
        IsPlaying = isPlaying;
    }
}

package com.dejssa.radioserver.provider;

import com.dejssa.radioserver.repository.StationRepository;
import com.dejssa.radioserver.storage.domain.StationInfo;
import com.dejssa.radioserver.storage.requests.StationRequest;

import java.util.ArrayList;
import java.util.List;

public class StationProvider {

    private Providers providers;
    private StationRepository repository;

    public StationProvider(Providers providers) {
        this.providers = providers;
        this.repository = new StationRepository(providers.getContext());
    }

    public StationInfo getByUUID(String UUID) {
        return this.repository.getByUUID(UUID);
    }

    public ArrayList<StationInfo> find() {
        return this.repository.find();
    }

    public void save(StationInfo station) {
        this.repository.save(station);
    }

    public void saveMany(List<StationInfo> stations) {
        stations.forEach(this::save);
    }

    public void delete(String UUID) {
        this.repository.delete(UUID);
    }
}

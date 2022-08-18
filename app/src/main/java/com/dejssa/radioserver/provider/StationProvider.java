package com.dejssa.radioserver.provider;

import com.dejssa.radioserver.handlers.RequestParser;
import com.dejssa.radioserver.repository.StationRepository;
import com.dejssa.radioserver.storage.domain.StationInfo;

import java.util.ArrayList;

public class StationProvider {

    private Providers providers;
    private StationRepository repository;

    public StationProvider(Providers providers) {
        this.providers = providers;
        this.repository = new StationRepository(providers.getContext());
    }

    public ArrayList<StationInfo> find() {
        return this.repository.find();
    }

    public void save(StationInfo station) {
        this.repository.save(station);
    }

    public void delete(String UUID) {
        this.repository.delete(UUID);
    }
}

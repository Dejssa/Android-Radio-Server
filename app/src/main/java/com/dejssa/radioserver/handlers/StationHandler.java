package com.dejssa.radioserver.handlers;

import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.repository.StationRepository;
import com.dejssa.radioserver.storage.domain.StationInfo;
import com.dejssa.radioserver.storage.requests.StationRequest;
import com.dejssa.radioserver.storage.requests.StationUUIDRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;

import fi.iki.elonen.NanoHTTPD.IHTTPSession;
import fi.iki.elonen.NanoHTTPD.Response;

import static fi.iki.elonen.NanoHTTPD.newFixedLengthResponse;

public class StationHandler {
    public final static String REQUEST_SAVE = "/station/save";
    public final static String REQUEST_DELETE = "/station/delete";
    public final static String REQUEST_EXPORT_MASS = "/stations/export";
    public final static String REQUEST_IMPORT = "/stations/import";

    private Providers providers;

    public StationHandler(Providers providers) {
        this.providers = providers;
    }

    public Response serveSave(IHTTPSession session) {
        StationRequest request = RequestParser.parseObject(session, StationRequest.class);

        this.providers.station.save(request.toDomain());

        ArrayList<StationInfo> stations = this.providers.station.find();

        return newFixedLengthResponse(new Gson().toJson(stations));
    }

    public Response serveDelete(IHTTPSession session) {
        StationUUIDRequest request = RequestParser.parseObject(session, StationUUIDRequest.class);

        this.providers.station.delete(request.UUID);

        ArrayList<StationInfo> stations = this.providers.station.find();

        return newFixedLengthResponse(new Gson().toJson(stations));
    }

    public Response serveExportMass(IHTTPSession session) {
        ArrayList<StationInfo> stations = this.providers.station.find();

        return newFixedLengthResponse(new Gson().toJson(stations));
    }

    public Response serveImport(IHTTPSession session) {
        List<StationRequest> request = RequestParser.parseArray(session, StationRequest[].class);

        ArrayList<StationInfo> newStations = new ArrayList<>();

        for (int i = 0; i < request.size(); i++) {
            newStations.add(request.get(i).toDomain());
        }

        this.providers.station.saveMany(newStations);

        ArrayList<StationInfo> stations = this.providers.station.find();

        return newFixedLengthResponse(new Gson().toJson(stations));
    }
}

package com.dejssa.radioserver.handlers;

import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.repository.StationRepository;
import com.dejssa.radioserver.storage.requests.StationRequest;
import com.dejssa.radioserver.storage.requests.StationUUIDRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;
import com.google.gson.Gson;

import fi.iki.elonen.NanoHTTPD.IHTTPSession;
import fi.iki.elonen.NanoHTTPD.Response;

import static fi.iki.elonen.NanoHTTPD.newFixedLengthResponse;

public class StationHandler {
    public final static String REQUEST_SAVE = "/station/save";
    public final static String REQUEST_DELETE = "/station/delete";

    private Providers providers;

    public StationHandler(Providers providers) {
        this.providers = providers;
    }

    public Response serverSave(IHTTPSession session) {
        StationRequest request = RequestParser.parseObject(session, StationRequest.class);

        this.providers.station.save(request.toDomain());

        StatusResponse state = this.providers.radio.state();

        return newFixedLengthResponse(new Gson().toJson(state));
    }

    public Response serverDelete(IHTTPSession session) {
        StationUUIDRequest request = RequestParser.parseObject(session, StationUUIDRequest.class);

        this.providers.station.delete(request.UUID);

        StatusResponse state = this.providers.radio.state();

        return newFixedLengthResponse(new Gson().toJson(state));
    }
}

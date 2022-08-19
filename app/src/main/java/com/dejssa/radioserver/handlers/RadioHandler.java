package com.dejssa.radioserver.handlers;

import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.storage.requests.StationUUIDRequest;
import com.dejssa.radioserver.storage.requests.VolumeLevelRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;
import com.google.gson.Gson;

import java.util.UUID;

import fi.iki.elonen.NanoHTTPD.Response;
import fi.iki.elonen.NanoHTTPD.IHTTPSession;

import static fi.iki.elonen.NanoHTTPD.newFixedLengthResponse;

public class RadioHandler {
    public final static String REQUEST_VOLUME = "/radio/volume/level";
    public final static String REQUEST_PLAY = "/radio/play";
    public final static String REQUEST_PAUSE = "/radio/pause";
    public final static String REQUEST_STATE = "/radio/state";
    public final static String REQUEST_PLAY_STATION = "/radio/play/station";

    private Providers providers;

    public RadioHandler(Providers providers) {
        this.providers = providers;
    }

    public Response serveVolume(IHTTPSession session) {
        VolumeLevelRequest request = RequestParser.parseObject(session, VolumeLevelRequest.class);

        this.providers.radio.setVolume(request);

        return newFixedLengthResponse("");
    }

    public Response servePlayStation(IHTTPSession session) {
        StationUUIDRequest request = RequestParser.parseObject(session, StationUUIDRequest.class);

        this.providers.radio.playStation(request.UUID);

        StatusResponse state = this.providers.radio.state();

        return newFixedLengthResponse(new Gson().toJson(state));
    }

    public Response servePlay(IHTTPSession session) {
        this.providers.radio.play();

        return newFixedLengthResponse("");
    }

    public Response servePause(IHTTPSession session) {
        this.providers.radio.stop();

        return newFixedLengthResponse("");
    }

    public Response serveState(IHTTPSession session) {
        StatusResponse state = this.providers.radio.state();

        return newFixedLengthResponse(new Gson().toJson(state));
    }
}

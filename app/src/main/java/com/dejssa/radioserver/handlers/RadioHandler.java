package com.dejssa.radioserver.handlers;

import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.storage.requests.VolumeLevelRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;
import com.google.gson.Gson;

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

    public Response serverVolume(IHTTPSession session) {
        VolumeLevelRequest request = RequestParser.parseObject(session, VolumeLevelRequest.class);

        this.providers.radio.setVolume(request);

        return newFixedLengthResponse("");
    }

    public Response serverPlay(IHTTPSession session) {
        this.providers.radio.play();

        return newFixedLengthResponse("");
    }

    public Response serverPause(IHTTPSession session) {
        this.providers.radio.stop();

        return newFixedLengthResponse("");
    }

    public Response serverState(IHTTPSession session) {
        StatusResponse state = this.providers.radio.state();

        return newFixedLengthResponse(new Gson().toJson(state));
    }
}

package com.dejssa.radioserver.Service;

import android.content.Context;
import android.media.AudioManager;

import com.dejssa.radioserver.handlers.RadioHandler;
import com.dejssa.radioserver.handlers.StationHandler;
import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.provider.RadioProvider;
import com.dejssa.radioserver.provider.StationProvider;
import com.dejssa.radioserver.storage.domain.StationInfo;
import com.dejssa.radioserver.storage.model.WebProjectFiles;

import java.io.IOException;
import java.util.ArrayList;

import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD{
    public WebProjectFiles files;
    public AudioManager audioManager;
    public Context context;

    public Providers providers;
    public RadioHandler radioHandler;
    public StationHandler stationHandler;

    public Server() {
        super(8080);
    }

    @Override
    public Response serve(IHTTPSession session) {
        switch (session.getUri()) {
            case StationHandler.REQUEST_SAVE:
                return this.stationHandler.serverSave(session);
            case StationHandler.REQUEST_DELETE:
                return this.stationHandler.serverDelete(session);
            case RadioHandler.REQUEST_VOLUME:
                return this.radioHandler.serverVolume(session);
            case RadioHandler.REQUEST_PLAY_STATION:
                return this.radioHandler.ser(session);
            case RadioHandler.REQUEST_PLAY:
                return this.radioHandler.serverPlay(session);
            case RadioHandler.REQUEST_PAUSE:
                return this.radioHandler.serverPause(session);
            case RadioHandler.REQUEST_STATE:
                return this.radioHandler.serverState(session);
            default:
                return this.serveDefault(session);
        }
//
//
//        // Play selected station.
//        if (compare(session, "/station/play")) {
//            StationUUIDRequest request = this.parseRequest(session, StationUUIDRequest.class);
//            apiRadioPlayStationByUUID(request);
//            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
//        }
//
//        // Export the list of stations.
//        if (compare(session, "/list/export")) {
//            return newFixedLengthResponse(new Gson().toJson(this.Stations));
//        }
//
//        // Import a new list of stations.
//        if (compare(session, "/list/import")) {
//            return serverImportStations(session);
//        }
//
//        return this.webAppResponse.serve(session);
    }

    private Response serveDefault(IHTTPSession session) {
        for (int i = 0; i < files.getFiles().size(); i++) {
            if (session.getUri().contains(files.getFiles().get(i).getName())) {
                return newFixedLengthResponse(files.getFiles().get(i).getContent());
            }
        }

        return newFixedLengthResponse(this.files.getFiles().get(0).getContent());
    }

    @Override
    public void start() throws IOException {
        super.start();

        this.providers = new Providers(context);
        this.providers.station = new StationProvider(this.providers);
        this.providers.radio = new RadioProvider(this.providers);

        this.radioHandler = new RadioHandler(this.providers);
        this.stationHandler = new StationHandler(this.providers);
    }

    @Override
    public void stop() {
        this.providers.radio.stop();
        super.stop();
    }

//    private Response serverSaveStation(IHTTPSession session) {
//        StationRequest request = this.parseRequest(session, StationRequest.class);
//        this.Stations.add(request.toDomain());
//        return newFixedLengthResponse(new Gson().toJson(this.Stations));
//    }
//
//    private Response serverImportStations(IHTTPSession session) {
////        ArrayList<StationRequest> request = this.parseRequest(session, ArrayList.class);
//        List<StationRequest> request = this.parseArrayRequest(session, StationRequest[].class);
//
//        ArrayList<StationInfo> newStations = new ArrayList<>();
//
//        for (int i = 0; i < request.size(); i++) {
//            newStations.add(request.get(i).toDomain());
//        }
//
//        this.Stations = newStations;
//
//        return newFixedLengthResponse(new Gson().toJson(this.Stations));
//    }


//    private StatusResponse prepareRadioStatus() {
//        return new StatusResponse(
//            this.getVolume(),
//            this.currentStation.toResponse(),
//            this.Stations,
//            this.getPlayingStatus()
//        );
//    }

//    private boolean getPlayingStatus() {
//        if (this.player == null) {
//            return false;
//        }
//
//        return this.player.isPlaying();
//    }

//    private void apiRadioPlayStationByUUID(StationUUIDRequest request) {
//        for (StationInfo station : this.Stations) {
//            if (station.UUID.equals(request.UUID)) {
//                this.currentStation = station;
//
//                playAudio();
//            }
//        }
//    }

//    private void deleteSelectedStation(StationUUIDRequest request) {
//        int index = IntStream.range(0, Stations.size())
//                .filter(i -> Stations.get(i).UUID.equals(request.UUID))
//                .findFirst()
//                .orElse(-1);
//
//        Stations.remove(index);
//    }
}

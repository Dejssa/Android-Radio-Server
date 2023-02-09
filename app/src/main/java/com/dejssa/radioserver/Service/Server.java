package com.dejssa.radioserver.Service;

import android.content.Context;
import android.media.AudioManager;

import com.dejssa.radioserver.handlers.RadioHandler;
import com.dejssa.radioserver.handlers.StationHandler;
import com.dejssa.radioserver.provider.Providers;
import com.dejssa.radioserver.provider.RadioProvider;
import com.dejssa.radioserver.provider.StationProvider;
import com.dejssa.radioserver.storage.model.WebProjectFiles;

import java.io.ByteArrayInputStream;
import java.io.IOException;

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
                return this.stationHandler.serveSave(session);
            case StationHandler.REQUEST_DELETE:
                return this.stationHandler.serveDelete(session);
            case StationHandler.REQUEST_EXPORT_MASS:
                return this.stationHandler.serveExportMass(session);
            case StationHandler.REQUEST_IMPORT:
                return this.stationHandler.serveImport(session);
            case RadioHandler.REQUEST_VOLUME:
                return this.radioHandler.serveVolume(session);
            case RadioHandler.REQUEST_PLAY_STATION:
                return this.radioHandler.servePlayStation(session);
            case RadioHandler.REQUEST_PLAY:
                return this.radioHandler.servePlay(session);
            case RadioHandler.REQUEST_PAUSE:
                return this.radioHandler.servePause(session);
            case RadioHandler.REQUEST_STATE:
                return this.radioHandler.serveState(session);
            default:
                return this.serveDefault(session);
        }
    }

    private Response serveDefault(IHTTPSession session) {
        for (int i = 0; i < files.getFiles().size(); i++) {
            if (session.getUri().contains(files.getFiles().get(i).getName())) {
                byte[] content = files.getFiles().get(i).getBytes();
                return newFixedLengthResponse(Response.Status.OK, "application/json", new ByteArrayInputStream(content), content.length);
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
}

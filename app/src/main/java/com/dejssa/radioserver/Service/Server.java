package com.dejssa.radioserver.Service;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;

import com.dejssa.radioserver.storage.domain.StationInfo;
import com.dejssa.radioserver.storage.model.WebProjectFiles;
import com.dejssa.radioserver.storage.requests.StationUUIDRequest;
import com.dejssa.radioserver.storage.requests.StationRequest;
import com.dejssa.radioserver.storage.requests.VolumeLevelRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;
import java.util.stream.IntStream;

import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD{
    public WebProjectFiles files;
    public AudioManager audioManager;

    private WebAppResponse webAppResponse;
    private StationInfo currentStation = new StationInfo();
    private ArrayList<StationInfo> Stations = new ArrayList<>();
    private MediaPlayer player;


    public Server() {
        super(8080);
    }

    @Override
    public Response serve(IHTTPSession session) {
        // Play current station.
        if (compare(session, "/current/play")) {
            this.playAudio();
            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
        }

        // Stop playing current station.
        if (compare(session, "/current/stop")) {
            this.stopAudio();
            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
        }

        // Change volume of the device.
        if (compare(session, "/volume/level")) {
            VolumeLevelRequest request = this.parseRequest(session, VolumeLevelRequest.class);
            this.setVolumeTo(request.Percentage);
            return newFixedLengthResponse("");
        }

        // Current station info was requested.
        if (compare(session, "/station/current")) {
            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
        }

        // Save a new station.
        if (compare(session, "/station/save")) {
            StationRequest request = this.parseRequest(session, StationRequest.class);
            this.Stations.add(request.toDomain());
            return newFixedLengthResponse(new Gson().toJson(this.Stations));
        }

        // Remove selected station.
        if (compare(session, "/station/delete")) {
            StationUUIDRequest request = this.parseRequest(session, StationUUIDRequest.class);
            deleteSelectedStation(request);
            return newFixedLengthResponse(new Gson().toJson(this.Stations));
        }

        // Play selected station.
        if (compare(session, "/station/play")) {
            StationUUIDRequest request = this.parseRequest(session, StationUUIDRequest.class);
            playStationByUUID(request);
            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
        }

        // Export the list of stations.
        if (compare(session, "/list/export")) {
            return newFixedLengthResponse(new Gson().toJson(this.Stations));
        }

        // Import a new list of stations.
        if (compare(session, "/list/import")) {
            return serverImportStations(session);
        }

        return this.webAppResponse.serve(session);
    }

    private boolean compare(IHTTPSession session, String path) {
        return session.getUri().compareToIgnoreCase(path) == 0;
    }

    @Override
    public void start() throws IOException {
        super.start();
        this.webAppResponse = new WebAppResponse(this.files);
    }

    @Override
    public void stop() {
        stopAudio();
        super.stop();
    }

    private Response serverImportStations(IHTTPSession session) {
//        ArrayList<StationRequest> request = this.parseRequest(session, ArrayList.class);
        List<StationRequest> request = this.parseArrayRequest(session, StationRequest[].class);

        ArrayList<StationInfo> newStations = new ArrayList<>();

        for (int i = 0; i < request.size(); i++) {
            newStations.add(request.get(i).toDomain());
        }

        this.Stations = newStations;

        return newFixedLengthResponse(new Gson().toJson(this.Stations));
    }

    private void playAudio() {
        String url = currentStation.URL;

        this.stopAudio();

        this.player = new MediaPlayer();

        player.setAudioStreamType(AudioManager.STREAM_MUSIC);
        try {
            player.setDataSource(url);
            player.prepare();
            player.start();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void stopAudio() {
        if (this.player != null) {
            this.player.stop();
            this.player.release();
            this.player = null;
        }
    }

    private void setVolumeTo(int percentage) {
        int maxVolume = this.audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);

        int newVolume = (maxVolume * percentage) / 100;

        this.audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, newVolume, AudioManager.FLAG_SHOW_UI);
    }

    private int getVolume() {
        int volume = this.audioManager.getStreamVolume(AudioManager.STREAM_MUSIC);
        int maxVolume = this.audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);

        return (volume * 100) / maxVolume;
    }

    private StatusResponse prepareRadioStatus() {
        return new StatusResponse(
            this.getVolume(),
            this.currentStation.toResponse(),
            this.Stations,
            this.getPlayingStatus()
        );
    }

    private boolean getPlayingStatus() {
        if (this.player == null) {
            return false;
        }

        return this.player.isPlaying();
    }

    private void playStationByUUID(StationUUIDRequest request) {
        for (StationInfo station : this.Stations) {
            if (station.UUID.equals(request.UUID)) {
                this.currentStation = station;

                playAudio();
            }
        }
    }

    private void deleteSelectedStation(StationUUIDRequest request) {
        int index = IntStream.range(0, Stations.size())
                .filter(i -> Stations.get(i).UUID.equals(request.UUID))
                .findFirst()
                .orElse(-1);

        Stations.remove(index);
    }

    private <T> T parseRequest(NanoHTTPD.IHTTPSession session, Class<T> classOfT) {
        HashMap<String, String> request = new HashMap<>();
        try {
            session.parseBody(request);
        } catch (Exception e) {
            e.printStackTrace();
        }


       return new Gson().fromJson(request.get("postData"), (Type) classOfT);
    }

    private <T> List<T> parseArrayRequest(NanoHTTPD.IHTTPSession session, Class<T[]> classOfT) {
        HashMap<String, String> request = new HashMap<>();
        try {
            session.parseBody(request);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Arrays.asList(new Gson().fromJson(request.get("postData"), classOfT));
    }
}

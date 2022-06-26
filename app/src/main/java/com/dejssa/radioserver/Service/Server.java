package com.dejssa.radioserver.Service;

import android.media.AudioManager;
import android.media.MediaPlayer;

import com.dejssa.radioserver.model.domain.StationInfo;
import com.dejssa.radioserver.model.requests.StationUUIDRequest;
import com.dejssa.radioserver.model.requests.StationRequest;
import com.dejssa.radioserver.model.requests.VolumeLevelRequest;
import com.dejssa.radioserver.model.responses.StatusResponse;
import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.stream.IntStream;

import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD{
    public String pageFile;
    public AudioManager audioManager;

    private StationInfo currentStation = new StationInfo();
    private ArrayList<StationInfo> Stations = new ArrayList<>();
    private MediaPlayer player;


    public Server() {
        super(8080);
    }

    @Override
    public Response serve(IHTTPSession session) {
        if (session.getUri().contains("current/play")) {
            this.playAudio();

            return newFixedLengthResponse("");
        }

        if (session.getUri().contains("current/stop")) {
            this.stopAudio();

            return newFixedLengthResponse("");
        }

        if (session.getUri().contains("volume/level")) {
            VolumeLevelRequest request = this.parseRequest(session, VolumeLevelRequest.class);

            this.setVolumeTo(request.Percentage);

            return newFixedLengthResponse("");
        }

        if (session.getUri().contains("station/current"))  {
            return newFixedLengthResponse(new Gson().toJson(this.prepareRadioStatus()));
        }

        if (session.getUri().contains("station/save")) {
            StationRequest request = this.parseRequest(session, StationRequest.class);

            this.Stations.add(request.toDomain());

            return newFixedLengthResponse(new Gson().toJson(this.Stations));
        }

        if (session.getUri().contains("station/delete")) {
            StationUUIDRequest request = this.parseRequest(session, StationUUIDRequest.class);

            deleteSelectedStation(request);

            return newFixedLengthResponse(new Gson().toJson(this.Stations));
        }

        if (session.getUri().contains("station/play")) {
            StationUUIDRequest request = this.parseRequest(session, StationUUIDRequest.class);

            playSelectedStation(request);

            return newFixedLengthResponse("");
        }

        return newFixedLengthResponse(this.pageFile);
    }

    @Override
    public void stop() {
        stopAudio();
        super.stop();
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

    private StatusResponse prepareRadioStatus() {
        return new StatusResponse(
            this.audioManager.getStreamVolume(AudioManager.STREAM_MUSIC),
            this.currentStation.toResponse(),
            this.Stations
        );
    }

    private void playSelectedStation(StationUUIDRequest request) {
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
}

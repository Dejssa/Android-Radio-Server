package com.dejssa.radioserver.Service;

import android.media.AudioManager;
import android.media.MediaPlayer;

import com.dejssa.radioserver.model.domain.StationInfo;
import com.dejssa.radioserver.model.requests.PlayRequest;
import com.dejssa.radioserver.model.requests.StationPlayRequest;
import com.dejssa.radioserver.model.requests.StationRequest;
import com.dejssa.radioserver.model.requests.VolumeLevelRequest;
import com.dejssa.radioserver.model.responses.StationInfoResponse;
import com.dejssa.radioserver.model.responses.StatusResponse;
import com.google.gson.Gson;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

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

        if (session.getUri().contains("station/play")) {
            StationPlayRequest request = this.parseRequest(session, StationPlayRequest.class);

            playSelectedStation(request);
        }

        return newFixedLengthResponse(this.pageFile);
    }

//    @Override
//    public void start() throws IOException {
//        super.start();
//
//        this.playAudio("https://nashe1.hostingradio.ru:80/ultra-128.mp3?wcid=fe5dada9-6a8b-4348-8087-aaaf0d7ac1fb&stationId=ultra-main");
//    }

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

    private void playSelectedStation(StationPlayRequest request) {
        for (StationInfo station : this.Stations) {
            if (station.UUID.equals(request.UUID)) {
                this.currentStation = station;

                playAudio();
            }
        }
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

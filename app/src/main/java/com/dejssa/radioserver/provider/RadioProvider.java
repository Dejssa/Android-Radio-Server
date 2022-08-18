package com.dejssa.radioserver.provider;

import android.content.Context;
import android.media.AudioManager;
import android.media.MediaPlayer;

import com.dejssa.radioserver.handlers.RequestParser;
import com.dejssa.radioserver.storage.domain.StationInfo;
import com.dejssa.radioserver.storage.requests.VolumeLevelRequest;
import com.dejssa.radioserver.storage.responses.StatusResponse;

import java.util.ArrayList;


public class RadioProvider {
    private AudioManager audioManager;
    private StationInfo currentStation = new StationInfo();
    private MediaPlayer player;
    private StationProvider stationProvider;

    public RadioProvider(Providers providers) {
        this.audioManager = (AudioManager) providers.getContext().getSystemService(Context.AUDIO_SERVICE);
        this.stationProvider = providers.station;
    }

    public void setVolume(VolumeLevelRequest request) {
        this.setVolumeTo(request.Percentage);
    }

    public void play() {
        String url = currentStation.URL;

        this.stop();

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

    public StatusResponse state() {
        ArrayList<StationInfo> stations = this.stationProvider.find();

        return new StatusResponse(
            this.getVolume(),
            this.currentStation.toResponse(),
                stations,
            this.getPlayingStatus()
        );
    }

    public void stop() {
        if (this.player != null) {
            this.player.stop();
            this.player.release();
            this.player = null;
        }
    }

    //============================================================
    //===================== PRIVATE METHODS ======================
    //============================================================

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

    private boolean getPlayingStatus() {
        if (this.player == null) {
            return false;
        }

        return this.player.isPlaying();
    }
}

package com.dejssa.radioserver.Service;

import android.media.AudioManager;
import android.media.MediaPlayer;
import android.util.Log;

import com.dejssa.radioserver.model.PlayRequest;
import com.google.gson.Gson;

import java.util.HashMap;

import fi.iki.elonen.NanoHTTPD;

public class Server extends NanoHTTPD{
    public String pageFile;

    private String radioURL;
    private MediaPlayer player;

    public Server() {
        super(8080);
    }

    @Override
    public Response serve(IHTTPSession session) {
        if (session.getUri().contains("play")) {
            HashMap<String, String> request = new HashMap<>();
            try {
                session.parseBody(request);
            } catch (Exception e) {
                e.printStackTrace();
            }

            PlayRequest playRequest = new Gson().fromJson(request.get("postData"), PlayRequest.class);

            this.playAudio(playRequest.radioURL);

            return newFixedLengthResponse("");
        }

        if (session.getUri().contains("stop")) {
            this.stopAudio();

            return newFixedLengthResponse("");
        }

        return newFixedLengthResponse(this.pageFile);
    }

    @Override
    public void stop() {
        stopAudio();
        super.stop();
    }

    private void playAudio(String url) {
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
}

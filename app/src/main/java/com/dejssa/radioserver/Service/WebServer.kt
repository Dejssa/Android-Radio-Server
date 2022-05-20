package com.dejssa.radioserver.Service

import android.media.AudioManager
import android.media.MediaPlayer
import android.util.Log
import fi.iki.elonen.NanoHTTPD
import java.io.IOException

class WebServer : NanoHTTPD(8080) {
    var mediaPlayer: MediaPlayer? = null
    var pageFile = ""

    override fun serve(session: IHTTPSession): Response? {
        val requestPath = session.uri
        Log.i("web", session.uri)
        if (session.uri.contains("play")) {
            playAudio()

            return newFixedLengthResponse("")
        }

        if (session.uri.contains("play")) {
            stop()
        }

        if (session.uri.contains("stop")) {
            if (mediaPlayer != null) {
                mediaPlayer!!.stop()
            }
        }

        return newFixedLengthResponse(this.pageFile)
    }



    private fun playAudio() {
        val audioUrl = "https://zt02.cdn.eurozet.pl/ZETALT.mp3"

        // initializing media player
        this.mediaPlayer = MediaPlayer()

        // below line is use to set the audio
        // stream type for our media player.
        mediaPlayer!!.setAudioStreamType(AudioManager.STREAM_MUSIC)

        // below line is use to set our
        // url to our media player.
        try {
            mediaPlayer!!.setDataSource(audioUrl)
            // below line is use to prepare
            // and start our media player.
            mediaPlayer!!.prepare()
            mediaPlayer!!.start()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}
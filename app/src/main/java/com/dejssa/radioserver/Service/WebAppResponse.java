package com.dejssa.radioserver.Service;

import android.util.Log;

import com.dejssa.radioserver.storage.model.WebProjectFiles;

import fi.iki.elonen.NanoHTTPD;

import static fi.iki.elonen.NanoHTTPD.newFixedLengthResponse;

public class WebAppResponse {
    private WebProjectFiles files;

    public WebAppResponse(WebProjectFiles files) {
        this.files = files;
    }

    public NanoHTTPD.Response serve(NanoHTTPD.IHTTPSession session) {
        Log.d("Styles", "serve: here we are");

        for (int i = 0; i < files.getFiles().size(); i++) {
            if (session.getUri().contains(files.getFiles().get(i).getName())) {
                Log.d("Styles", "serve: css");
                return newFixedLengthResponse(files.getFiles().get(i).getContent());
            }
        }

        return newFixedLengthResponse(this.files.getFiles().get(0).getContent());
    }

}

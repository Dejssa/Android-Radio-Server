package com.dejssa.radioserver.handlers;

import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import fi.iki.elonen.NanoHTTPD;

public class RequestParser {
    public static <T> T parseObject(NanoHTTPD.IHTTPSession session, Class<T> classOfT) {
        HashMap<String, String> request = new HashMap<>();
        try {
            session.parseBody(request);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return new Gson().fromJson(request.get("postData"), (Type) classOfT);
    }

    public static <T> List<T> parseArray(NanoHTTPD.IHTTPSession session, Class<T[]> classOfT) {
        HashMap<String, String> request = new HashMap<>();
        try {
            session.parseBody(request);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return Arrays.asList(new Gson().fromJson(request.get("postData"), classOfT));
    }
}

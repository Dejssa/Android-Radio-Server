package com.dejssa.radioserver.provider;

import android.content.Context;

public class Providers {
    private Context context;

    public StationProvider station;
    public RadioProvider radio;

    public Providers(Context context) {
        this.context = context;
    }

    public Context getContext() {
        return context;
    }
}

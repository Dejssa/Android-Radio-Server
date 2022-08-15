package com.dejssa.radioserver.storage.model;

import java.util.List;

public class WebProjectFiles {
    private List<File> files;

    public WebProjectFiles(List<File> files) {
        this.files = files;
    }

    public List<File> getFiles() {
        return files;
    }
}
